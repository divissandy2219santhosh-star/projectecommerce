import React,{useState,useEffect} from 'react'
import {Form,Button,Col} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom"
import CheckoutSteps from '../checkoutsteps'
import FormContainer from './Formcontainer'
import { Link,useNavigate, useParams, useLocation} from 'react-router-dom'


function PaymentScreen(){
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    if(!shippingAddress.address){
        navigate('/shipping')
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
    
}



return(
    <div>
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <Form on submit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check type='radio' label='PayPal or Credit Card' checked />
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    </div>
);

export default PaymentScreen;