"use client"
import { logout } from '@/app/api/main';
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function LogoutBtn() {
    const router = useRouter();
    async function handleLogout() {
      await logout();
      router.push("/");
    };
  return (
    <Button color='primary' onClick={handleLogout}>Logout</Button>
  )
}
