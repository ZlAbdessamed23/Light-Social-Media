// routes/posts.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Post = require('../models/Post');
const mongoose = require('mongoose');

// Middleware to check authentication
router.use(authMiddleware);

// Create a new post
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.userId; // Extract user ID from the token

    const post = new Post({
      title,
      description,
      userId
    });

    await post.save();

    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/my-posts', async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.userId); // Convert userId to ObjectId
    const myPosts = await Post.find({ userId }); // Query posts by ObjectId
    res.status(200).json(myPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a specific post by ID
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a post
router.put('/:postId', async (req, res) => {
  try {
    const { title, description } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(req.params.postId, { title, description }, { new: true });

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a post
router.delete('/:postId', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/username/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate('userId');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const username = post.userId.username; // Assuming User model has a username field
    res.status(200).json({ username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
