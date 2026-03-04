const asynhandler = require("express-async-handler");
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/post");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
const upload = multer({ storage });
module.exports = {
    createPost: asynhandler(async (req, res) => {
        const { title, content } = req.body;
        const post = new Post({
            title,
            content,
            author: req.user._id,
        });
        await post.save();
        res.status(201).json(post);
    }),
    getPosts: asynhandler(async (req, res) => {
        const posts = await Post.find().populate('author', 'username').populate('comments').populate('likes');
        res.json(posts);
    }),
    getPostById: asynhandler(async (req, res) => {
        const post = await Post.findById(req.params.id).populate('author', 'username').populate('comments').populate('likes');      
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    }),
    updatePost: asynhandler(async (req, res) => {
        const { title, content } = req.body;
        const post = await Post.findById(req.params.id);
        if (post) {
            post.title = title;
            post.content = content;
            await post.save();
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    }),
    deletePost: asynhandler(async (req, res) => {
        const post = await Post.findById(req.params.id);
        if (post) {
            await post.remove();
            res.json({ message: 'Post removed' });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    }),
    likePost: asynhandler(async (req, res) => {
        const post = await Post.findById(req.params.id);
        if (post) { 

            if (post.likes.includes(req.user._id)) {
                post.likes.pull(req.user._id);
                await post.save();
                res.json({ message: 'Post unliked' });
            } else {
                post.likes.push(req.user._id);
                await post.save();
                res.json({ message: 'Post liked' });
            }
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    }),
    addComment: asynhandler(async (req, res) => {
        const { content } = req.body;
        const post = await Post.findById(req.params.id);    
        if (post) {
            const comment = new Comment({
                content,
                author: req.user._id,
                post: req.params.id,
            });
            await comment.save();
            post.comments.push(comment._id);
            await post.save();
            res.status(201).json(comment);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    }),
};
module.exports = {
    uploadImage: upload.single('image'),
};
const likeschema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
}, {
    timestamps: true,
});

const Like = mongoose.model('Like', likeschema);
module.exports = Like;
const getpost = asynhandler(async (req, res) => {
    const post = await Post.findById(req.params.id).populate('author', 'username').populate('comments').populate('likes');
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

const getpostbyid = asynhandler(async (req, res) => {
    const post = await Post.findById(req.params.id).populate('author', 'username').populate('comments').populate('likes');
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});
const getuserposts = asynhandler(async (req, res) => {
    const posts = await Post.find({ author: req.params.userId }).populate('author', 'username').populate('comments').populate('likes');
    res.json(posts);
});
const updatepost = asynhandler(async (req, res) => {
    const { title, content } = req.body;
    const post = await Post.findById(req.params.id);
    if (post) {
        post.title = title;
        post.content = content;
        await post.save();
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});
const deletepost = asynhandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
        await post.remove();
        res.json({ message: 'Post removed' });
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});