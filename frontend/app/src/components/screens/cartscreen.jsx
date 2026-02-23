import React,{use, useEffect} from 'react'
import {Link, useNavigate, useparams, useLocation} from "react-router-dom"
import {
    Row,Col,Image,ListGroup,Button,Card,Container,Form,
    ListGroupItem
} from 'react-bootstrap'
import products from '../products'
import Loader from './loader'
import Message from './message'
import {listProductDetails} from '../actions/productActions'
import {useDispatch,useSelector} from 'react-redux'
import {addToCart,removeFromCart} from '../actions/cartActions'
import {useDispatch,useSelector} from 'react-redux'
import {listProducts} from '../actions/productActions'

function cartscreen({params}){
    const {id}=useparams()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const location=useLocation()
    
    const productId=id;
    const qty=location.search?Number(location.search.split('=')[1]):1;

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (productId) {
          dispatch(addToCart(productId, qty));
        }
      }, [dispatch, productId, qty]);


}
return (
    <>
    <Row>
        <Col md={8}>
        <Container>
            <h1>cart items</h1>
            {
                cartItems.length===0?(
                    <Message variant='info'>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map((item)=>(
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control as="select" value={item.qty} onChange={(e)=>dispatch(addToCart(item.product,Number(e.target.value)))}>
                                            {[...Array(item.countInStock).keys()].map((x)=>(
                                                <option key={x+1} value={x+1}>
                                                    {x+1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>

                                    <col md={1}>
                                    <Button type='button' variant='light' onClick={()=>dispatch(removeFromCart(item.product))}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                    </col>
                                    <h4>{item.qty}</h4>
                                            
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )
            }
            </Container>
        </Col>
    </Row>
    
    
    
    
    
    
    
    
    
    
    </>

    
)