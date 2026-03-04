const  users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');
const {generatesecret,verifytoken} = require('../utils/generateSecretKey');

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body; 
    const userexistsname = await users.findOne({ name });
    if (userexistsname) {
        return res.status(400).json({ message: 'Username already exists' });
    }
    
    const userexistsemail = await users.findOne({ email });
    if (userexistsemail) {
        return res.status(400).json({ message: 'Email already exists' });
        return false;
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
}

exports.login = async (req, res) => {
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
   {  }  {
        res.status(401).json({ message: 'Invalid email or password' });
    }
        }
    }
}
exports.enabletwofactorauth = async (req, res) => {
    const userId = req.user._id;
    const user = await users.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const secretKey = generatesecret();
    user.twoFactorSecret = secretKey;
    await user.save();
    res.json({ message: 'Two-factor authentication enabled', secretKey });
}
exports.verifytwofactorauth = async (req, res) => {
    const userId = req.user._id;
    const { token } = req.body;
    const user = await users.findById(userId);
    if (!user || !user.twoFactorSecret) {
        return res.status(404).json({ message: 'User not found or 2FA not enabled' });
    }
    const isValid = verifytoken(token, user.twoFactorSecret);
    if (isValid) {
        res.json({ message: 'Two-factor authentication verified' });
    } else {
        res.status(401).json({ message: 'Invalid token' });
    }
}