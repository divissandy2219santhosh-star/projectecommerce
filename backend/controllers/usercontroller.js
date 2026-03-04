const asyncHandler =require('express-async-handler');
const multer = require('multer');
const path = require('path');
const users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');
const { generatesecret, verifytoken } = require('../utils/generateSecretKey');
const { get } = require('http');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

exports.signup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userexistsname = await users.findOne({ name });
    if (userexistsname) {
        return res.status(400).json({ message: 'Username already exists' });
    }
    const userexistsemail = await users.findOne({ email }); 
    if (userexistsemail) {
        return res.status(400).json({ message: 'Email already exists' });
    }
    const user = await users.create({
        name,
        email,
        password,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
});
exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await users.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        if (user.isAdmin) {
            const secretKey = generatesecret();
            const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, secretKey, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
                twoFactorEnabled: user.twoFactorEnabled,
                twoFactorSecret: user.twoFactorSecret,
            });
        }
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});
exports.enabletwofactorauth = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const user = await users.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const secretKey = generatesecret();
    user.twoFactorSecret = secretKey;
    await user.save();
    res.json({ message: 'Two-factor authentication enabled', secretKey });
});
exports.verifytwofactorauth = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { token } = req.body;
    const user = await users.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (!user.twoFactorSecret) {
        return res.status(401).json({ message: '2FA not enabled' });
    }
    const isValid = verifytoken(token, user.twoFactorSecret);
    if (isValid) {
        res.json({ message: 'Two-factor authentication verified' });
    } else {
        res.status(401).json({ message: 'Invalid token' });
    }
});
exports.uploadProfilePicture = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const user = await users.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (req.file) {
        user.profilePicture = req.file.path;
        await user.save();
        res.json({ message: 'Profile picture uploaded successfully' });
    }

    res.status(400).json({ message: 'No file uploaded' });
});
exports.getProfilePicture = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const user = await users.findById(userId);
    if (!user || !user.profilePicture) {
        return res.status(404).json({ message: 'Profile picture not found' });
    }
    res.sendFile(user.profilePicture);
});
exports.updateProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { name, email, password } = req.body;
    const user = await users.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (name) {
        user.name = name;
    }
    if (email) {
        user.email = email;
    }
    if (password) {
        user.password = await bcrypt.hash(password, 10);
    }
    await user.save();
    res.json({ message: 'Profile updated successfully' });
});
exports.deleteProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const user = await users.findById(userId);  
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    await user.remove();
    res.json({ message: 'Profile deleted successfully' });
});
exports.updatePassword = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;
    const user = await users.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid current password' });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Password updated successfully' });
});
exports.getUserDetails = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const user = await users.findById(userId).select('-password');
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});
exports.getAllUsers = asyncHandler(async (req, res) => {
    const users = await users.find({});
    res.json(users);
}); 
exports.deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await users.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    await user.remove();
    res.json({ message: 'User deleted successfully' });
});
exports.updateUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const { name, email, isAdmin } = req.body;
    const user = await users.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (name) {
        user.name = name;
    }
    if (email) {
        user.email = email;
    }
    if (isAdmin !== undefined) {
        user.isAdmin = isAdmin;
    }
    await user.save();
    res.json({ message: 'User updated successfully' });
});

exports.getUserProfile = asyncHandler(async (req, res) => {
    const user = await users.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

const updatePassword = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;
    const user = await users.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }   
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid current password' });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Password updated successfully' });
}
);

const searchusers= asyncHandler(async (req, res) => {
    const { name } = req.query;
    const users = await users.find({ name: { $regex: name, $options: 'i' } }).select('-password');
    res.json(users);
});
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await users.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});
const followuser = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const user = await users.findById(req.user._id);
    const userToFollow = await users.findById(userId);
    if (!user || !userToFollow) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (user.following.includes(userId)) {
        return res.status(400).json({ message: 'Already following this user' });
    }
    user.following.push(userId);
    userToFollow.followers.push(req.user._id);
    await user.save();
    await userToFollow.save();
    res.json({ message: 'User followed successfully' });
});
const unfollowuser = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const user = await users.findById(req.user._id);
    const userToUnfollow = await users.findById(userId);
    if (!user || !userToUnfollow) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (!user.following.includes(userId)) {
        return res.status(400).json({ message: 'Not following this user' });
    }
    user.following = user.following.filter((id) => id !== userId);
    userToUnfollow.followers = userToUnfollow.followers.filter((id) => id !== req.user._id);
    await user.save();
    await userToUnfollow.save();
    res.json({ message: 'User unfollowed successfully' });
});









module.exports =
{
    signup,
    login,
    enabletwofactorauth,
    verifytwofactorauth,
    uploadProfilePicture,
    getProfilePicture,
    updateProfile,
    deleteProfile,
    updatePassword,
    getUserDetails,
    getAllUsers,
    deleteUser,
    updateUser,
    getUserProfile,
};

