"use client"
import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from './ui/button' 
import Image from 'next/image'

const Hero = () => {
    const imageRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
      
      const handleScroll=()=>{
        const imageElement = imageRef.current
        const scrollPosition = window.scrollY
        const scrollThreshold = 100
        if (!imageElement) return;
        if(scrollPosition>scrollThreshold){
            imageElement.classList.add("scrolled")
        }else{
            imageElement.classList.remove("scrolled")
        }
      }

      window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
   

    
  return (
    <div className='pb-20 px-4'>
        <div className='container mx-auto text-center '>
             <h1 className='text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title'>
            Your Intelligent Partner  <br /> in Financial Growth
        </h1>
        <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
            An AI powered website that helps you track and analyse your 
            spendings effortlessly with real time insights.
        </p>
        
       
        <div className='flex justify-center space-x-4   '>
            <Link href={'/'}>
                <Button size={"lg"} className='px-8'>Get Started</Button>
            </Link>
             <Link href={'/'}>
                <Button variant={"outline"} size={"lg"} className='px-8'>Watch Demo</Button>
            </Link>
        </div>
        </div>

        <div className='hero-image-wrapper'>
            <div ref={imageRef} className='hero-image'>
                <Image src={'/new-new-banner1.png'} height={620} width={1080} alt='banner' className='rounded-lg shadow-2xl mx-auto' priority/>
            </div>
        </div>
    </div>
  )
}

export default Hero