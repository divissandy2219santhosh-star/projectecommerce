import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'


function bookform() {
    const{id}=useParams();
    const [book, setBook] = useState({
        title: '',
        author: '',
        genre: '',
        publishedYear: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/api/books/${id}`)
        .then(response => {
            setBook(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the book!', error);
        });
    }, [id]);

    const handleChange = (e) => {
        setBook({...book, [e.target.name]: e.target.value});
    }
    const handleSubmit = (e) => {
        e.preventDefault(); 
        axios.put(`http://localhost:5000/api/books/${id}`, book)
        .then(response => {
            console.log('Book updated:', response.data);
        })
        .catch(error => {
            console.error('There was an error updating the book!', error);
        });
    }

  return (
    <div>
      <h2>Edit Book</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" value={book.title} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" name="author" value={book.author} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Genre</Form.Label>
          <Form.Control type="text" name="genre" value={book.genre} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Published Year</Form.Label>
          <Form.Control type="number" name="publishedYear" value={book.publishedYear} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" onClick={() => {
            axios.put(`http://localhost:5000/api/books/${id}`, book)
            .then(response => {
                console.log('Book updated:', response.data);
            })
            .catch(error => {
                console.error('There was an error updating the book!', error);
            });
        }}>Update Book</Button>
      </Form>
    </div>
  )
}

export default bookform