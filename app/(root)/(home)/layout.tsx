import React, { Children, ReactNode } from 'react'

const Homelayout = ({children}:{children:ReactNode}) => {
  return (
    <main className='relative'>
      Navbar
 
 <div className='flex'>
    sidebar
    <section>
        
    </section>
 </div>
         {children}
        
    </main>
  )
}

export default Homelayout