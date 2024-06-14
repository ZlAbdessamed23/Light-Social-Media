"use client"
import { getUserStats } from '@/app/api/main';
import React, { useEffect, useState } from 'react'
import { Area, AreaChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function Chart() {
    const [data , setData] = useState();

    async function getStats() {
        const res = await getUserStats();
        setData(res); 
    };

    useEffect(() => {
        getStats();
    },[]);

  return (
    <div className='w-full h-96'>
        <ResponsiveContainer>
            <AreaChart data={data} height={200} width={200}>
                <XAxis dataKey="date"/>
                <YAxis />
                <Tooltip/>
                <Legend />
                <Area dataKey="postCount" type="monotone" stroke='#006FEE' fill='#F31260' />
            </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}
