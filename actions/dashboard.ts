"use server"
import { auth } from "@clerk/nextjs/server"
import {db} from "../lib/prisma"
import { AccountType } from "../lib/generated/prisma"
import { revalidatePath } from "next/cache"



type DecimalLike = {
  toNumber: () => number
}
type CreateAccountData = {
  name: string
  type: string
  balance: string | number
  isDefault?: boolean
}


function serializeTransaction<
  T extends { balance: any; amount?: any }
>(obj: T): Omit<T, "balance" | "amount"> & {
  balance: number
  amount?: number
} {
  return {
    ...obj,
    balance:
      typeof obj.balance === "object" && "toNumber" in obj.balance
        ? obj.balance.toNumber()
        : obj.balance,
    amount:
      obj.amount && typeof obj.amount === "object" && "toNumber" in obj.amount
        ? obj.amount.toNumber()
        : obj.amount
  }
}





export async function createAccount(data : CreateAccountData){

        try {
            const {userId} = await auth()
            if(!userId){
                throw new Error ("Unauthorized")
            }

            const user = await db.user.findUnique({
                where:{
                    clerkUserId:userId
                }
            })
            if(!user){
                throw new Error("User not found")
            }
            const floatBalance = parseFloat( typeof data.balance === "number" ? data.balance.toString() : data.balance)
            if(isNaN(floatBalance)){
                throw new Error ("Invalid balance amount")
            }

            const existingAccount = db.account.findMany({
                where:{
                    userId: user.id
                }
            })
            const shouldBeDefault = (await existingAccount).length === 0 ? true : data.isDefault

            if(shouldBeDefault){
                await db.account.updateMany({
                    where:{
                        userId:user.id , isDefault:true
                    },
                    data:{
                        isDefault:false
                    }
                })
            }

            const account = await db.account.create({
                data:{
                    ...data,
                    balance: floatBalance,
                    userId:user.id,
                    isDefault: shouldBeDefault,
                     type: data.type as AccountType
                }
                
            })
 
            const serializedAccount = serializeTransaction(account)
            revalidatePath("/dashboard") 
            return {success:true, data: serializedAccount}

            
        } catch (error) {
            //@ts-ignore
            throw new Error(error.message)
        }
}

export async function getUserAccounts(){
                const {userId} = await auth()
            if(!userId){
                throw new Error ("Unauthorized")
            }

            const user = await db.user.findUnique({
                where:{
                    clerkUserId:userId
                }
            })
            if(!user){
                throw new Error("User not found")
            }
            
            const accounts = await db.account.findMany({
                where:{
                  userId: user.id},
                orderBy:{
                    createdAt: 'desc'
                },
                include:{
                    
                    _count:{
                        select:{
                            transactions:true
                            
                        }
                    }
                }
        })
        const serializedAccount = accounts.map(acc => serializeTransaction(acc))
return serializedAccount

            }