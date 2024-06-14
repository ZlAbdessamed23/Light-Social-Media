import { MessageProps } from '@/app/types/types'
import React from 'react'

export default function MessageCard({props} : MessageProps) {
  return (
    <span className='flex flex-col gap-2 p-4'>
      <p className='tetx-white self-start'>{props.text}</p>
      <p className='text-gray-400 opacity-70 self-end'>{props.createdAt}</p>
    </span>
  )
}
