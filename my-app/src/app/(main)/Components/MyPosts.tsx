"use client"
import { getAllMyPosts, getAllPosts } from '@/app/api/main';
import { Post } from '@/app/types/types';
import React, { useEffect, useState } from 'react'
import MyPostCard from './MyPostCard';
import AddPost from './AddPost';

export default function MyPosts() {
    const [posts , setPosts] = useState<Post[]>([]);

    async function handleGetPosts(){
        const data = await getAllMyPosts();
        setPosts(data);
    };

    function handleDeletePost(postId : string) {
        setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    }

    useEffect(() => {
        handleGetPosts();
    },[]);

    useEffect(() => {
        console.log(posts);
    },[posts]);
    
  return (
    <div>
        <AddPost handleGetPosts={handleGetPosts}/>
        <div className='flex flex-col gap-4 items-center p-4 w-1/3 mx-auto'>
            {
                posts.map((post) => (
                    <MyPostCard props={post} onDelete={handleDeletePost} handleGetPosts={handleGetPosts}/>
                ))
            }
        </div>
    </div>
  )
}
