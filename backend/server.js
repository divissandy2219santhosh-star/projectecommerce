const express = require('express');
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

