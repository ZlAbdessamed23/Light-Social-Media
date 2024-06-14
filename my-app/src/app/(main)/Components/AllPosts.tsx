"use client"

import { Post } from '@/app/types/types';
import React, { useEffect, useState } from 'react'
import PostCard from './PostCard';
import { getAllPosts } from '@/app/api/main';

export default function AllPosts() {
    const [posts , setPosts] = useState<Post[]>([]);

    async function handleGetPosts(){
        const data = await getAllPosts();
        setPosts(data);
    };

    useEffect(() => {
        handleGetPosts();
    },[]);

  return (
    <div className='flex flex-col gap-4 items-center p-4 w-1/3 mx-auto'>
        {
            posts.map((post) => (
                <PostCard props={post}/>
            ))
        }
    </div>
  )
}
