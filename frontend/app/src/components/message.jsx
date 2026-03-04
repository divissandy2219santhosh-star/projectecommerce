import React,{useEffect} from 'react';
import {Alert} from 'react-bootstrap';

function Message({variant,children}) {
    useEffect(()=>{
        const timer = setTimeout(()=>{
            // Clear the message after 3 seconds
            setMessage('');
        },3000);
        return () => clearTimeout(timer);
    },[onclose]);
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    );
}

export default Message;