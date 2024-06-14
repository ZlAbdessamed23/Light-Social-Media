// routes/messages.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Message = require('../models/Message');
const { Server } = require('socket.io'); // Ensure to import Server from socket.io
const jwt = require('jsonwebtoken');

// Middleware to check authentication
router.use(authMiddleware);

// Create a new instance of Socket.IO server
const io = new Server();

// Socket.IO middleware to authenticate connections
io.use((socket, next) => {
  const token = socket.handshake.headers.cookie.split('=')[1]; // Adjust based on your cookie parsing method
  if (!token) {
    return next(new Error('Unauthorized'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    next(new Error('Unauthorized'));
  }
});

// Socket.IO connection event
io.on('connection', (socket) => {
  console.log('A user connected');

  // Join the user to a room identified by their user ID
  socket.join(socket.user.userId);

  // Emit event when a user sends a message
  socket.on('sendMessage', async (message) => {
    try {
      // Create a new message in the database
      const newMessage = new Message({
        receiverId: message.receiverId,
        senderId: socket.user.userId,
        text: message.text,
      });
      await newMessage.save();

      // Emit the new message to the receiver's room
      io.to(message.receiverId).emit('newMessage', newMessage);
    } catch (error) {
      console.error(error);
    }
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

module.exports = router;
