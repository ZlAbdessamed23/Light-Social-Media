import { PostProps } from '@/app/types/types'
import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import { FaHeart } from "react-icons/fa";
import React  from 'react'

export default function PostCard({props} : PostProps) {

  return (
    <Card fullWidth className='bg-foreground '>
        <CardHeader className='justify-between'>
            {/* to change */}
            <span className='text-white'>{props.title}</span> 
        </CardHeader>
        <CardBody>
            <p className='text-center text-xl font-semibold text-white mb-4'>{props.title}</p>
            <p className='text-start text-lg font-medium text-white'>{props.description}</p>
        </CardBody>
        <CardFooter className='justify-between'>
            <p className='text-gray-400 opacity-80'>{props.createdAt.toString()}</p>
            <Button isIconOnly variant='light'><FaHeart className='size-6 text-danger-500'/></Button>
        </CardFooter>
    </Card>
  )
}
