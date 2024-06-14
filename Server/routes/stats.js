const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const authMiddleware = require('../middleware/auth');

// Get posts count by user per day
router.get('/user-posts', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId; // assuming authMiddleware adds user info to req.user

    // Aggregate posts by user and day
    const data = await Post.aggregate([
      { $match: { userId: userId } },
      {
        $group: {
          _id: { 
            userId: '$userId', 
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } 
          },
          postCount: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.date': 1 } // sort by date
      },
      {
        $project: {
          _id: 0,
          date: '$_id.date',
          postCount: 1
        }
      }
    ]);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
