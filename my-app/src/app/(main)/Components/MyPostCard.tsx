import React from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { Post, PostProps } from '@/app/types/types'
import { HiDotsVertical } from 'react-icons/hi'
import { deletePost } from '@/app/api/main'
import { useRouter } from 'next/navigation'

interface MyPostCardProps {
  props: Post;
  onDelete: (postId: string) => void; // Define onDelete as a function that accepts a string (postId) and returns void
  handleGetPosts :() => Promise<void>;
};

export default function MyPostCard({props , onDelete , handleGetPosts} : MyPostCardProps) {

  async function deleteThisPost(){
    console.log(props);
    if(props._id){
      await deletePost(props._id);
      await handleGetPosts();
    };
  };

  return (
    <Card fullWidth className='bg-foreground '>
    <CardHeader className='justify-between'>
        {/* to change */}
        <span className='text-white'>{props.title}</span> 
        <Dropdown>
          <DropdownTrigger>
          <Button isIconOnly variant='light'><HiDotsVertical className='size-6 text-[#006FEE]'/></Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="delete" className="text-danger" color="danger" onClick={deleteThisPost}>Delete file</DropdownItem>
          </DropdownMenu>
        </Dropdown>
    </CardHeader>
    <CardBody>
        <p className='text-center text-xl font-semibold text-white mb-4'>{props.title}</p>
        <p className='text-start text-lg font-medium text-white'>{props.description}</p>
    </CardBody>
    <CardFooter className='justify-between'>
        <p className='text-gray-400 opacity-80'>{props.createdAt.toString()}</p>
    </CardFooter>
</Card>
  )
}
