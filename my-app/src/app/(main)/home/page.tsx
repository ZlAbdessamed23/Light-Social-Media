import { Post } from '@/app/types/types'
import React from 'react'
import PostCard from '../Components/PostCard';
import AllPosts from '../Components/AllPosts';

export default function page() {

  return (
    <div>
      <h1 className='text-primary-500 text-center text-3xl font-semibold mb-4'>Home</h1>
      <AllPosts />
    </div>
  )
}
