"use client"
import { getUserInfos } from '@/app/api/main';
import { RegisterUser } from '@/app/types/types';
import { Avatar } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

export default function ProfileInfos() {
    const [user , setUser] = useState<RegisterUser>();

    async function getUser() {
        const data = await getUserInfos();
        setUser(data);
    }; 
    useEffect(() => {
        getUser();
    },[]);

  return (
    <div className='h-full w-full bg-slate-950 flex flex-col gap-8 p-4 text-white'>
        <section className='flex flex-col items-center gap-4'> 
            <Avatar isBordered name='' color='primary' showFallback/>
            <h2 className='text-white text-xl font-medium'>{user?.name}</h2>
        </section>
        <fieldset className='border border-white p-4 rounded-md'>
            <legend className='text-lg font-semibold'>Personal Infos</legend>
            <section className='mb-2 flex flex-row flex-nowrap items-center'>
                <span className='text-lg font-semibold'>Email :</span>
                <span className='text-base font-medium w-9/12 overflow-hidden text-ellipsis'>{user?.email}</span>
            </section>
            <section>
                <span className='text-lg font-semibold'>Name :</span>
                <span className='text-base font-medium'>{user?.name}</span>
            </section>
        </fieldset>
    </div>
  )
}
