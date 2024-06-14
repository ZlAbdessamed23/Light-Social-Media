"use client"

import { addPost } from '@/app/api/main';
import { CreatePost } from '@/app/types/types';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import React, { useState } from 'react'
import { MdOutlineAddCircle } from 'react-icons/md'


interface PromiseProps {
  handleGetPosts : () => Promise<void>;
};

export default function AddPost({handleGetPosts} : PromiseProps) {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const initialState : CreatePost = {
    title : "",
    description : "",
  };

  const [inputs , setInputs] = useState<CreatePost>(initialState);

  function handleInputsChange(e : React.ChangeEvent<HTMLInputElement>) {
    setInputs({...inputs , [e.target.name] : e.target.value});
  };

  async function handleFormSubmit(e : React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    await addPost(inputs);
    await handleGetPosts();
  };

  return (
    <div className='flex flex-col gap-6'>
      <Button onPress={onOpen} color='primary' className='w-36 self-end' endContent={<MdOutlineAddCircle className='size-6 text-white'/>}>Add Post</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='bg-slate-950 text-white'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <form className='flex flex-col gap-4'>
                  <Input label="Title" type='text' name='title' variant='bordered' color='primary' value={inputs.title} onChange={(e) => handleInputsChange(e)} />
                  <Input label="Description" type='text' name='description' variant='bordered' color='primary' value={inputs.description} onChange={(e) => handleInputsChange(e)} />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={handleFormSubmit}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>

  )
}
