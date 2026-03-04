import React, { useState, useEffect }from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Message from '../components/message'
import Loader from '../components/loader'
import Post from '../components/posts/post'
import PostForm from '../components/posts/postform'

function home() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [posts, setPosts] = useState([])
    const handleClose = () => setError('')
    const [message, setMessage] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const fetchPosts = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('/api/posts')
            setPosts(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error.response.data.message)
        }
    }
    useEffect(() => {
        try {
            fetchPosts()
        } catch (error) {
            setLoading(false)
            setError(error.response.data.message)
        }
        
    }, [])
        
        

  return (
    <Container>
        <Row>
            <Col md={8}>
            <h3 className ="text-center mb-3">Posts</h3>
                <PostForm />
                {posts.map((post) => (
                    <Post key={post._id} post={post} />
                ))}
            </Col>  
            <postform />

            <Col md={4}>
                {loading && <Loader />}
                {error && <Message variant='danger' onClose={handleClose}>{error}</Message>}
                {showMessage && <Message variant='success' onClose={() => setShowMessage(false)}>{message}</Message>}
            </Col>
        </Row>
    </Container>
  )
}

export default home