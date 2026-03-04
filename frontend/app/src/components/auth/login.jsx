import React,{useState} from "react"
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Message from "../message";
import Loader from "../loader";
import axios from "axios";

function login() {
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '/';
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formvalues, setFormValues] = useState({
        email: '',
        password: ''
    });
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: ''
    });
    const [isSubmit, setIsSubmit] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };  
    const handleClose = () => {
        setMessage('');
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formvalues, [name]: value });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        if(!FormValid()){
            setMessage("please fill our the form correctly");
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.post('/api/auth/login', {
                email: formvalues.email,
                password: formvalues.password,
            }, config);
            setLoading(false);
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect);
        } catch (error) {
            setLoading(false);
            setMessage(error.response.data.message);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        if (!formvalues.email) {
            errors.email = 'Email is required';
        }
        if (!formvalues.password) {
            errors.password = 'Password is required';
        }
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            setIsSubmit(true);
        }
    }
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>    
                    <h1>Login</h1>
                    {message && <Message variant='danger'>{message}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={formvalues.email}
                                onChange={handleChange}
                                name="email"
                                isInvalid={!!formErrors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={formvalues.password}
                                onChange={handleChange}
                                name="password"
                                isInvalid={!!formErrors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default login;