import React, { ReactNode } from 'react'

const Auth_layout = ({children}:ReactNode) => {
  return (
    <div className='flex justify-center pt-20'>
        {children}
    </div>
    
  )
}

export default Auth_layout