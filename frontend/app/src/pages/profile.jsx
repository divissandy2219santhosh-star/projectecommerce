import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Message from '../components/message';
import Loader from '../components/loader';
import axios from 'axios';
import QRCode from 'qrcode'

function profile() {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [qrcodeurl, setQrcodeurl] = useState('');
    const [Secret, setSecret] = useState('');
    const [keyword, setKeyword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const handleClose = () => {
        setMessage('');
    };
    const searchHandler = (e) => {
        e.preventDefault();
        setKeyword(e.target.value);


    }

    useEffect(() => {
        const fetchuserprofile = async () => {
            try {
                setLoading(true);
                const pasreduser=JSON.parse(localStorage.getItem('userInfo'));
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                const { data } = await axios.get(`/api/auth/profile/${pasreduser._id}`, config);
                setUserInfo(data);
                setName(data.name);
                setEmail(data.email);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setMessage(error.response.data.message);
            }
        };
        fetchuserprofile();
    }, []);
    useEffect(() => {
        if (isSubmit) {
            submitHandler();
        }
    }, [isSubmit]);
    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }
        try {
            setLoading(true);
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                const { data } = await axios.post('/api/auth/updateprofile', {
                    name,
                    email,
                    password,
                }, config);
                const otppathurl = Secret;
                QRCode.toDataURL(otppathurl, (err, url) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
                
                const profileConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                const { data: profileData } = await axios.get('/api/auth/profile', profileConfig);
                setUserInfo(data);
                setName(data.name);
                setEmail(data.email);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setMessage(error.response?.data?.message || error.message);
            }
        };
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.post('/api/auth/updateprofile', {
                name,
                email,
                password,
            }, config);
            const otppathurl = Secret;
            QRCode.toDataURL(otppathurl, (err, url) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
            setLoading(false);
            localStorage.setItem('userInfo', JSON.stringify(data));
            setMessage('Profile updated successfully');
        } catch (error) {
            setLoading(false);
            setMessage(error.response.data.message);
        }
    }
    const FormValid = () => {
        switch (true) {
            case !name:
                setMessage('Name is required');
                return false;   
            case !email:
                setMessage('Email is required');
                return false;
            case !password:
                setMessage('Password is required');
                return false;
            case !confirmPassword:
                setMessage('Confirm Password is required');
                return false;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            case !emailRegex.test(email):
                setMessage('Invalid email format');
                return false;
            const otpRegex = /^\d{6}$/;
            case !otpRegex.test(password):
                setMessage('Password must be a 6-digit OTP');
                return false;    
            default:
                return true;
        }
    }
    const enable2fa = async () => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.post('/api/auth/enable2fa', {}, config);
            setLoading(false);
            setMessage('2FA enabled successfully');
        } catch (error) {
            setLoading(false);
            setMessage(error.response.data.message);
        }
    };
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const verify2fa = async (token) => {
        try {
            setLoading(true);
            const { data } = await axios.post('/api/auth/verify2fa', { token }, config);
            setLoading(false);
            setMessage('2FA verified successfully');
        } catch (error) {
            setLoading(false);
            setMessage(error.response.data.message);
        }
    };
    return (  
        <Container>
            <Row>
                <Col md="5">
                <Card className="my-3 p-3 rounded">
                    <Card.Body>
                        <h2>User Profile</h2>
                        {message && <Message variant="danger" onClose={handleClose}>{message}</Message>}
                        {loading && <Loader />}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text" 
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button variant="secondary" onClick={handleShowPassword} className="mt-2">
                                    {showPassword ? 'Hide Password' : 'Show Password'}
                                </Button>
                            </Form.Group>
                            <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                {users.followers?.map((following) => (
                                    <Row className='g-2'>
                                        <Col key={following._id}>
                                        <Card.Body className="d-flex align-items-center">
                                            <Link to={`/profile/${following._id}`}>
                                                <Card.Img variant="top" src={following.profilePicture} alt={following.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                            </Link>
                                            <div className="ms-3">
                                                <Card.Title>{following.name}</Card.Title>
                                                <Card.Text>{following.email}</Card.Text>
                                            </div>
                                            alt={following.name}
                                            className="ms-3"
                                            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                        </Card.Body>
                                        </Col>
                                        <div key={following._id}>
                                            <div>{following.name}</div>
                                            <Link to={`/profile/${following._id}`}>View Profile</Link>
                                        </div>
                                    </Row>
                                ))}



                                <Button variant="secondary" onClick={handleShowConfirmPassword} className="mt-2">
                                    {showConfirmPassword ? 'Hide Confirm Password' : 'Show Confirm Password'}
                                </Button>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Update
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                </Col>
                <Col md="7">
                <Card className="my-3 p-3 rounded">
                    <Card.Body>
                        <h2>2FA Settings</h2>
                        <p>2FA is currently {twoFactorEnabled ? 'enabled' : 'disabled'}.</p>
                        <Button variant="primary" onClick={toggle2fa}>
                            {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                        </Button>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
           
        </Container>
    );

export default profile;