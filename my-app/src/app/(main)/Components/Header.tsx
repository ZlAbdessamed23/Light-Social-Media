import { Avatar, Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import React from 'react'
import LogoutBtn from './LogoutBtn'

export default function Header() {
  return (
    <Navbar shouldHideOnScroll className='bg-black text-white border-white' isBordered>
      <NavbarBrand>
        <p  className="font-bold text-lg text-primary-500">Z-App</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link className='text-white'  href="/home">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className='text-white'  href="/myposts">
            My Posts
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link className='text-white' href="/chat">
            Chat
          </Link>
        </NavbarItem>
        
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
         <LogoutBtn />
        </NavbarItem>
        <NavbarItem>
          <Avatar as={Link} color="primary" href="/profile" >
            Sign Up
          </Avatar>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
