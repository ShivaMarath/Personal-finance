"use server"
import { auth } from "@clerk/nextjs/server"
import {db} from "../lib/prisma"
export async function createAccount(data){

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
            const floatBalance = parseFloat(data.balance)
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
        } catch (error) {
            
        }
}