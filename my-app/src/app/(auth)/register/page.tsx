import React from 'react'
import Link from 'next/link'
import RegisterForm from '../Components/RegisterForm'

export default function Register() {
  return (
    <div className='flex flex-col gap-8 items-center justify-center h-screen w-screen bg-slate-900'>
        <h1 className='text-4xl text-center text-sky-500'>Register</h1>
        <RegisterForm />
        <p className='text-white'>you already have an account?<Link className='text-sky-500' href="/login"> Login</Link></p>
    </div>
  )
}
