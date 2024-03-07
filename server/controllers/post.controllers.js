
const Post = require('../models/post.models');

// Controller to get all posts
exports.getAllPosts = async (req, res) => {
    try {
        // Fetch all posts from the database
        const posts = await Post.find().populate('user', ['username', 'profilePicture']);


        // Check if no posts are found
        if (!posts || posts.length === 0) {
            return res.status(404).json({ success: false, message: 'No posts found' });
        }
        // Return the posts
        return res.status(200).json({ success: true, posts });
    } catch (error) {
        console.error('Error getting posts:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


