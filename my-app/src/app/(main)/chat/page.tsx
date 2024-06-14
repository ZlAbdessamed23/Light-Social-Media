"use client"

import { Button, Textarea } from '@nextui-org/react'
import { IoIosSend } from "react-icons/io";
import React, { useEffect, useState } from 'react'
import { Message, User } from '@/app/types/types';
import { useSocket } from '@/app/Components/SocketProvider';
import MessageCard from '../Components/MessageCard';
import { getAllUsers } from '@/app/api/main';
import UserCard from '../Components/UserCard';

export default function Chat() {

  const socket = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState('');
  const [receiverId, setReceiverId] = useState(''); // Add a state for receiverId

  useEffect(() => {
    if (!socket) return;

    socket.on('newMessage', (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, [socket]);

  const sendMessage = () => {
    if (message.trim() === '' || receiverId.trim() === '') return;

    if (socket) {
      socket.emit('sendMessage', { receiverId, text: message });
    }
    setMessage('');
  };

  async function getUsers() {
    const data = await getAllUsers();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  },[]);

  function selectUser(id : string) {
    setReceiverId(id);
  };

  useEffect(() => {
    console.log(receiverId);
  },[receiverId]);

  return (
    <div className='h-screen w-screen bg-slate-900'>
      <h1 className='text-primary-500 text-center text-3xl font-semibold mb-4'>Chat</h1>
      <div className='chat-container'>
        <div>
        <h2 className='self-start text-primary-500 font-semibold text-2xl mb-4'>Users</h2>
          {
            users.map((user) => (
              <UserCard props={user} onSelect={selectUser}/>
            ))
          }
        </div>
        <div className='h-full'>
          <h2 className='self-start text-primary-500 font-semibold text-2xl'>User</h2>
          <div className='messages-section'>
            <section>
              {
                messages.map((msg) => (
                  <MessageCard props={msg}/>
                ))
              }
            </section>
            <section className='flex items-center gap-4'>
              <Textarea placeholder='type something ...' className='text-white'color='danger' value={message} onChange={(e) => setMessage(e.target.value)} variant='bordered' maxRows={2} />
              <Button isIconOnly color='danger' onClick={sendMessage}><IoIosSend className='size-6'/></Button>
            </section>
          </div>
        </div>
      </div>
    </div>  )
}
