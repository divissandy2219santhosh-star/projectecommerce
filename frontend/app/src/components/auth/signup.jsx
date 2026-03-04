import React from 'react'
import { container,Row,Col,Form,Button,InputGroup} from 'react-bootstrap'
import loader from './loader'
import Message from './message'
import {link,useNavigate,useLocation} from 'react-router-dom';
import {useState,useEffect} from 'react';


function signup() {
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '/';
    const [message,setMessage] = useState('');
    const [loading,setLoading] = useState(false);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [isSubmit,setIsSubmit] = useState(false);
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };  

    const handleClose =  () => {
        setMessage('');
    };
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');
    const [formValues,setFormValues] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    });
    const [formErrors,setFormErrors] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
        });
    };
    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormValues({...formValues,[name]:value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};
        if (!formValues.name) {
            errors.name = 'Name is required';
        }
        if (!formValues.email) {
            errors.email = 'Email is required';
        }
        if (!formValues.password) {
            errors.password = 'Password is required';
        }
        if (!formValues.confirmPassword) {
            errors.confirmPassword = 'Confirm Password is required';
        }
        if (formValues.password !== formValues.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            setIsSubmit(true);
        }
    }
    const validatefielsd = (name,value) => {
        switch (name) {
            case 'name':
                if (!value) {
                    return 'Name is required';
                }
                break;
            case 'email':
                if (!value) {
                    return 'Email is required';
                }
                break;
            case 'password':
                if (!value) {
                    return 'Password is required';
                }
                break;
            case 'confirmPassword':
                if (!value) {
                    return 'Confirm Password is required';
                }
                break;
            default:
                break;
        }
    }
    const showpassword = () => {
        const passwordField = document.getElementById('password');
        const confirmPasswordField = document.getElementById('confirmPassword');
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            confirmPasswordField.type = 'text';
        } else {
            passwordField.type = 'password';
            confirmPasswordField.type = 'password';
        }
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            try {
                setLoading(true);
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                const { data } = await axios.post('/api/users',
                    {
                        name,
                        email,
                        password,
                    },
                    config
                );
                setLoading(false);
                setSuccess('User registered successfully');
                localStorage.setItem('userInfo', JSON.stringify(data));
                navigate(redirect);
            } catch (error) {
                setLoading(false);
                setError(error.response.data.message);
            }
        }
    }
    useEffect(() => {
        if (isSubmit) {
            submitHandler();
        }
    }, [isSubmit]);




  return (
    <>
    <Container>
        <Row className="justify-content-md-center">
            <Col md={6}>
                <h2>join us</h2>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>   
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" />
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Container>
    
    
    
    
    
    
    
    
    
    
    
    </>
  )

export default signup