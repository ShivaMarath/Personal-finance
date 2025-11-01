import React from 'react'
import Image from "next/image" 
import Link from 'next/link'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,} from '@clerk/nextjs'
import { Button } from './ui/button'
import { LayoutDashboard, PenBox } from 'lucide-react'

const header = () => {
  return (
    <div className='fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b '>
      <nav className='container mx-auto px-4 py-4 flex items-center justify-between '>
        <Link href='/' className='text-gray-600 hover:text-blue-600 flex items-center gap-2'>
        <Image 
        src={"/logo-newer.png"} alt="logo" height={60} width={200} 
        className='h-12 w-auto object-contain'/>
        </Link>
      <div className='flex items-center space-x-4'>
        <SignedIn>
          <Link href={"/"} className='text-gray-600 hover:text-blue-600 flex items-center gap-2'>
          <Button variant={"outline"} className='flex items-center gap-2'>
            <LayoutDashboard size={18}/>
                <span className='hidden md:inline'>Dashboard</span>
          </Button>
          </Link>
          <Link href={"/transaction/create"} className='text-gray-600 hover:text-blue-600 flex items-center gap-2'>
          <Button className='flex items-center gap-2'>
            <PenBox size={18}/>
                <span className='hidden md:inline'>Add Transaction</span>
          </Button>
          </Link>
        </SignedIn>
        <SignedOut>
            <SignInButton forceRedirectUrl={"/"}>
              <Button variant={'outline'} className='flex items-center gap-2'>Login</Button>
            </SignInButton>
        </SignedOut>
        <SignedIn>
            <UserButton appearance={{
              elements:{
                avatarBox:"w-10 h-10 !w-10 !h-10",
              },
            }}/>
        </SignedIn>
        
      </div>
      </nav>
    </div>
  )
}

export default header