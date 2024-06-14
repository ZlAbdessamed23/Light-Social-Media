import { User } from '@/app/types/types'
import { Avatar} from '@nextui-org/react'

import React from 'react'

interface Props{
  props: User;
  onSelect: (userId: string) => void;
}
export default function UserCard({props , onSelect} : Props) {
  return (
    <div className='p-2 bg-slate-950 text-white flex flex-row gap-2 items-center rounded-md' onClick={() => onSelect(props._id)}>
      <Avatar  />
      <p className='text-white text-lg font-medium'>{props.name}</p>
    </div>
  )
}
