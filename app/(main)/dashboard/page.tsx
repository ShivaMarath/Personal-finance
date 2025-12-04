import React, { ReactNode } from 'react'
import {CreateAccountDrawer} from '@/components/create-account-drawer'
import { CardContent, Card } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { getUserAccounts } from '@/actions/dashboard'
import {AccountCard} from './_components/account-card'
type Account = Awaited<ReturnType<typeof getUserAccounts>>[number]
async function  DashboardPage() {
  const accounts = await getUserAccounts()
 

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      <CreateAccountDrawer>
        <Card className=' hover:shadow-md transition-shadow cursor-pointer border-dashed'>
          <CardContent className='flex flex-col justify-center items-center  text-muted-foreground h-full pt-5'>
            <Plus  className='h-10 w-10 mb-2'/>
            <p className='text-sm font-medium'>Add new account</p>
          </CardContent>
        </Card>
      </CreateAccountDrawer>

      {accounts.length >0 && accounts?.map((account: Account)=>{
        return <AccountCard key={account.id} account={account}/>
      })}
    </div>
  )
}

export default DashboardPage