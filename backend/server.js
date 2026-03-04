const express = require('express');
<<<<<<< HEAD
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
=======
const mongoose =require("mongoose");
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});
app.listen(prompt,()=>console.log ("server running at port ",PORT))

const bookSchema = new mongoose.Schema({
    title:String,
    author:String,
    genre:String,
    publishedYear:Number,
})

const Book = mongoose.model("Book",bookSchema);

app.post('/books',async(req,res)=>{
    const newBook = new Book(req.body);
    await newBook.save();
    res.json(newBook);
})

app.get('/books',async(req,res)=>{
    const books = await Book.find();
    res.json(books);
})

app.get('/books/:id',async(req,res)=>{
    const book = await Book.findById(req.params.id);
    res.json(book);
})

app.put('/books/:id',async(req,res)=>{
    const updatedBook = await Book.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updatedBook);
})

app.delete('/books/:id',async(req,res)=>{
    await Book.findByIdAndDelete(req.params.id);
    res.json({message:"Book deleted"});
})
app.search('/search',async(req,res)=>{
    const {query} = req.query;
    const books = await Book.find({
        $or:[
            {title:{$regex:query,$options:'i'}},
            {author:{$regex:query,$options:'i'}},
            {genre:{$regex:query,$options:'i'}},
        ],
    });
    res.json(books);
})

>>>>>>> 49ed4c375b3886912249c93c4f6652e0e9b9fa27
