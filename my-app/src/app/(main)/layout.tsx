import React from 'react'
import Header from './Components/Header'

export default function layout({children} : {children : React.ReactNode}) {
  return (
    <div className='min-h-screen  bg-slate-900 flex flex-col gap-6 overflow-hidden'>
        <Header />
        {children}
    </div>
  )
}
