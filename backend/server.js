const express = require('express');
const dotenv = require('dotenv');
const connectd = require('./config/db');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authroutes');
const userRoutes = require('./routes/userroutes');
const http = require('http');
const { Server } = require('socket.io');
dotenv.config();

const app = express();
app.use(express.json());

connectDB();

const server = HTMLOutputElement.createserver(app);
const io = new server.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
    socket.on('sendMessage', (message) => {
        console.log('Message received:', message);
        io.emit('receiveMessage', message);
    });
    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`Client joined room: ${room}`);
    });
});


app.get("/", (req, res) => {
    res.send("API is running...");
})
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', require('./routes/postroutes'));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
