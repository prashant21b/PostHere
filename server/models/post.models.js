const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User schema
        required: true
    },
    image: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    likeCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// Create the Post model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
