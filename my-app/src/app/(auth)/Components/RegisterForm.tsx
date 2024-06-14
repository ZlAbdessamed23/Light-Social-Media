"use client"
import { register } from '@/app/api/auth';
import { RegisterUser } from '@/app/types/types';
import { Button, Input } from '@nextui-org/react';
import React, { useState } from 'react'

export default function RegisterForm() {
    const initialValue : RegisterUser = {
        name : "",
        email : "",
        password : "",
    };
    const [inputs , setInputs] = useState<RegisterUser>(initialValue);

    function handleInputsChange(e : React.ChangeEvent<HTMLInputElement>) {
        setInputs({...inputs , [e.target.name] : e.target.value});
    };

    function handleFormSubmit(e : React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        register(inputs);
    };
  return (
    <div className='w-1/3 mx-auto '>
        <form className='flex flex-col items-center gap-4'>
            <Input className='text-white' color='primary' variant='bordered' type='text' label="Name" name='name' value={inputs.name} onChange={(e) => handleInputsChange(e)} />
            <Input className='text-white' color='primary' variant='bordered' type='email' label="Email" name='email' value={inputs.email} onChange={(e) => handleInputsChange(e)} />
            <Input className='text-white' color='primary' variant='bordered' type='password' label="Password" name='password' value={inputs.password} onChange={(e) => handleInputsChange(e)} />
            <Button color='primary' className='w-24 text-white' onClick={(e) => handleFormSubmit(e)}>Register</Button>
        </form>
    </div>
  )
}
