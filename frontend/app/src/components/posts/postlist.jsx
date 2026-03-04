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
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
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
            setMessage('Post created successfully');
            setShowMessage(true);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
    };
    const [posts, setPosts] = useState([]);
    const fetchPosts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/posts'); 
            setPosts(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
    };
    useEffect(() => {
        fetchPosts();
    }, []);
    const handleclose = () => setError('');
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.post('/api/posts', {
                title,
                content,
            },
            config);
            setLoading(false);
            setTitle('');
            setContent('');
            setMessage('Post created successfully');
            setShowMessage(true);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
    };
    const deleteposthandler = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`/api/posts/${id}`);
            setLoading(false);
            setMessage('Post deleted successfully');
            setShowMessage(true);
            fetchPosts();
        } 
        catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
        
    };
    return (
        <>  
        {error && <message variant='danger' onClose={handleclose}>{error}</message>}
        <Form onSubmit={handlesubmit}>
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
            <Button type='submit' variant='primary' className='mt-3'>
                Create Post
            </Button>
            {posts?.map((post) => (
                <Post key={post._id} post={post} />
            ))}
        </Form>
{post.user.id===userInfo._id && (
    <Button variant='danger' className='mt-2' onClick={() => deleteposthandler(post._id)}>
        Delete Post
    </Button>
)}

        <div className="accordion mt-3" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Accordion Item #1
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                          </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        COMMENTS <i className= "fa-solid fa-comment"></i>
                    </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                         </div>
                </div>
                {post?.comments?.map((comment) => (
                    <div key={comment._id} className="mb-2">
                        <strong>{comment.author.username}</strong>: {comment.content}
                    </div>
                ))}
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">     
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        LIKES <i className= "fa-solid fa-thumbs-up"></i>
                    </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                         </div>
                </div>
                {post?.likes?.map((like) => (
                    <div key={like._id} className="mb-2">
                        <strong>{like.user.username}</strong>
                    </div>
                ))}
            </div>      
        </div>

        </>
    );
}
export default postform;
