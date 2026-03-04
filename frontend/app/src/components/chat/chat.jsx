import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import loader from './loader'
import message from './message'
import {useparams} from 'react-router-dom'


function chat() {
    const {chatId} = useParams();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [messages, setMessages] = useState([]);
    const handleclose = () => setError('');
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            
            const { data } = await axios.post(`/api/chats/${chatId}/messages`, { message }, config);
            setLoading(false);
            setMessage('');
            setMessages([...messages, data]);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
    };

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/chats/${chatId}/messages`);

            setMessages(data);
            setLoading(false);
        } catch (error) {
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);


  return (
    <div>chat</div>
  )
}

export default chat