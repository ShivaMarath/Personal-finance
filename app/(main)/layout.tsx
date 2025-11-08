import React, { ReactNode } from 'react'

type props={
    children: React.ReactNode
}

const Mainlayout = ({children}: props) => {
  return (
    <div className='container mx-auto my-32'>{children}</div>
  )
}

export default Mainlayout