"use client"
import { signIn } from '@/app/api/auth';
import { LoginUser } from '@/app/types/types';
import { Button, Input } from '@nextui-org/react';
import React, { useState } from 'react'

export default function LoginForm() {
    const initialValue : LoginUser = {
        email : "",
        password : "",
    };
    const [inputs , setInputs] = useState<LoginUser>(initialValue);

    function handleInputsChange(e : React.ChangeEvent<HTMLInputElement>) {
        setInputs({...inputs , [e.target.name] : e.target.value});
    };

    function handleFormSubmit(e : React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        signIn(inputs);
    };
  return (
    <div className='w-1/3 mx-auto '>
        <form className='flex flex-col items-center gap-4'>
            <Input className='text-white' color='primary' variant='bordered' type='email' label="Email" name='email' value={inputs.email} onChange={(e) => handleInputsChange(e)} />
            <Input className='text-white' color='primary' variant='bordered' type='password' label="Password" name='password' value={inputs.password} onChange={(e) => handleInputsChange(e)} />
            <Button color='primary' className='w-24 text-white' onClick={(e) => handleFormSubmit(e)}>Login</Button>
        </form>
    </div>
  )
}
