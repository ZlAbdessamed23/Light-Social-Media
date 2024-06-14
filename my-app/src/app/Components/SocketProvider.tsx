// socketProvider.tsx
"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextProps {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const useSocket = (): Socket | null => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context.socket;
};

interface SocketProviderProps {
  children: ReactNode;
  authToken: string; // JWT token
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children, authToken }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!authToken) return;

    const newSocket = io('http://localhost:5000', {
      withCredentials: true,
      auth: {
        token: authToken,
      },
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [authToken]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
