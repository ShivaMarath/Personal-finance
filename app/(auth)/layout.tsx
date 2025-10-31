import React, { ReactNode } from 'react'

const Auth_layout = ({children}:ReactNode) => {
  return (
    <div className='flex justify-center pt-4'>
        {children}
    </div>
    
  )
}

export default Auth_layout