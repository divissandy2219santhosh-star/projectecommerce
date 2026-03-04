import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import loader from './loader';
import message from './message';

function postform() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const handleclose = () => setError('');
    const [image, setImage] = useState('');
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', image);
        try {
            setLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            const { data } = await axios.post('/api/posts', formData, config);
            setLoading(false);
            setTitle('');
            setContent('');
            setImage('');
            setMessage('Post created successfully');
            setShowMessage(true);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
    };

    return (
        <>
        {error && <message variant='danger' onClose={handleclose}>{error}</message>}
        <Form>
            <Form.Group controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId='content'>
                <Form.Label>Content</Form.Label>
                <Form.Control
                    as='textarea'
                    rows={3}
                    placeholder='Enter content'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                
                <Form.Control
                    type='file'
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </Form.Group>
            <Button variant='primary' type='submit'>
                Submit
            </Button>
            {loading && <loader />}
            {showMessage && <message variant='success' onClose={() => setShowMessage(false)}>{message}</message>}
        </Form>
        
        
        
        
        
        
        
        </>
    )


}