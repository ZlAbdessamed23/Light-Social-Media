import React from 'react'
import LoginForm from '../Components/LoginForm'
import Link from 'next/link'

export default function Login() {
  return (
    <div className='flex flex-col gap-8 items-center justify-center h-screen w-screen bg-slate-900'>
        <h1 className='text-4xl text-center text-sky-500'>Login</h1>
        <LoginForm />
        <p className='text-white'>you don't have an accout? <Link className='text-sky-500' href="/register">Register</Link></p>
    </div>
  )
}
