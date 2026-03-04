import React from 'react'
import {Card, Button} from 'react-bootstrap'    
import {Link} from 'react-router-dom'

function userposts({ posts }) {
    return (
        <div>
            {posts.map((post) => (
                <Card className='my-3' key={post._id}>
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text>{post.content}</Card.Text>
                        <Link to={`/posts/${post._id}`}>
                            <Button variant='primary'>View Post</Button>
                        </Link>
                    </Card.Body>
                    
                </Card>
            ))}
        </div>
    )
}

export default userposts