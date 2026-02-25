import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Table, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function booklist() {

    const [books, setBooks] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/books')
        .then(response => {
            setBooks(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the books!', error);
        });
    })

    const deleteBook = (id) => {
        axios.delete(`http://localhost:5000/api/books/${id}`)
        .then(response => {
            setBooks(books.filter(book => book._id !== id));
        })
        .catch(error => {
            console.error('There was an error deleting the book!', error);
        });
    }

  return (
    <div>
      <h2>Book List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Published Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.publishedYear}</td>
              <td><Link to={`/edit/${book._id}`} className="btn btn-sm btn-outline-primary">Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default booklist