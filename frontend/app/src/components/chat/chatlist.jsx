import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import loader from './loader';
import message from './message';
import {Link,useNavigate} from 'react-router-dom'


function chatlist(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [chats, setChats] = useState([]);
    const handleclose = () => setError('');
    const navigate = useNavigate(); 
    const fetchChats = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/chats'); 
            setChats(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
    };
    useEffect(() => {
        fetchChats();
    }, []);
    const createChatHandler = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post('/api/chats');
            setLoading(false);
            navigate(`/chats/${data._id}`);
        } catch (error) {
        }
    };
    return (
        <>
        {loading && <loader />}
        {error}

        {error && <message variant='danger' onClose={handleclose}>{error}</message>}
        <div>
            {loading && <loader />}
            <Button onClick={createChatHandler} className='mb-3'>Create New Chat</Button>
            {chats.map((chat) => (
                <div key={chat._id} className='p-2 border-bottom'>
                    <Link to={`/chats/${chat._id}`}>
                        Chat with {chat.users.map(u => u.name).join(', ')}
                    </Link>
                    {chat.users.map((user) => (
                        <div key={user._id} className='p-2 border-bottom'>
                            <Link to={`/profile/${user._id}`}>
                                {user.name}
                            </Link>
                        </div>
                    ))}
                </div>
            ))}
        </div>
        </>
    );
}

export default chatlist;