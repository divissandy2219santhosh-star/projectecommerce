const asynhandler = require('express-async-handler');
const Chat = require('../models/chat');
const User = require('../models/user');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

module.exports = {
    uploadImage: upload.single('image'),
};

const accesschat = asynhandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    let chat = await Chat.findOne({
        $or: [
            { sender: req.user._id, receiver: userId },
            { sender: userId, receiver: req.user._id },
        ],
    });
    if (!chat) {
        chat = await Chat.create({ sender: req.user._id, receiver: userId });
    }
    res.json(chat);
});

const sendmessage = asynhandler(async (req, res) => {
    const { message, chatId } = req.body;
    const chat = await Chat.findById(chatId);
    if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
    }
    const newMessage = await Chat.create({
        sender: req.user._id,
        receiver: chat.sender === req.user._id ? chat.receiver : chat.sender,
        message,
    });
    res.json(newMessage);
});

const getuserchats = asynhandler(async (req, res) => {
    const chats = await Chat.find({
        $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    }).populate('sender', 'username profilePicture').populate('receiver', 'username profilePicture');
    res.json(chats);
});

module.exports = {
    accesschat,
    sendmessage,
    getuserchats,
};
const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: '',
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userschema);
module.exports = User;

const getchatmessages = asynhandler(async (req, res) => {
    const { chatId } = req.params;
    const messages = await Chat.find({ chat: chatId }).populate('sender', 'username profilePicture');
    res.json(messages);
});

module.exports = {
    getchatmessages,
};