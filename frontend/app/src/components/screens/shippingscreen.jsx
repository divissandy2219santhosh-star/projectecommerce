import React, {useState, useEffect } from 'react'
import {Form, Button} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import {useNavigate} from "react-router-dom"
import {saveShippingAddress} from '../../actions/cartaction'
import FormContainer from './Formcontainer'

function shippingscreen() {
    const navigate=useNavigate();
    const cart=useSelector((state)=>state.cart)
    const {shippingAddress}=cart
    const [address,setAddress]=useState(shippingAddress.address)
    const [city,setCity]=useState(shippingAddress.city)
    const [postalCode,setPostalCode]=useState(shippingAddress.postalCode)
    const [country,setCountry]=useState(shippingAddress.country)
    const dispatch=useDispatch()
    console.log(shipppingAddress)

const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(saveShippingAddress({address,city,postalCode,country}))
    navigate('/payment')
    
}    

  return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={(e)=>{
            e.preventDefault()
            dispatch(saveShippingAddress({address,city,postalCode,country}))
            navigate('/payment')
        }}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control required type='text' placeholder='Enter address' value={address} onChange={(e)=>setAddress(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Continue</Button>

        </Form>










    </FormContainer>
  )
}

export default shippingscreen