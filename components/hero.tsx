import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button' 
import Image from 'next/image'

const Hero = () => {
  return (
    <div className='pb-20 px-4'>
        <h1>
            Manage Your Finance <br /> with Intellegence
        </h1>
        <p>
            An AI powered website that helps you track and analyse your 
            spendings effortlessly with real time insights.
        </p>
        <div>
            <Link href={'/'}>
                <Button size={"lg"} className='px-8'>Get Started</Button>
            </Link>
             <Link href={'/'}>
                <Button variant={"outline"} size={"lg"} className='px-8'>Watch Demo</Button>
            </Link>
        </div>

        <div>
            <div>
                <Image src={'/new-banner.png'} height={720} width={1280} alt='banner' className='rounded-lg shadow-2xl mx-auto' priority/>
            </div>
        </div>
    </div>
  )
}

export default Hero