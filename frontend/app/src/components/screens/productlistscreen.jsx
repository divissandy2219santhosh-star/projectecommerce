import React,{useState,useEffect} from 'react'
import {LinkContainer} from 'react-router-dom'
import {Table, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../Loader'
import Message from '../Message'
import {listProducts,createProduct,deleteProduct} from '../../action/productAction'
import {PRODUCT_CREATE_RESET}  from '../../constants/ProductConstants'
import {useNavigate} from "react-router-dom"

function productlistscreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const productList=useSelector((state)=>state.productList)
    const {loading,error,products}=productList

    const productDelete=useSelector(state => state.productDelete)
    const {loading: loadingDelete, error :errorDelete,success: successDelete}=productDelete

    const productcreate=useSelector(state => state.productCreate)
    const {loading:loadingCreate,error:errorCreate,success:successCreatee,Product:createdProduct}=productCreate

    

    useEffect(()=>{
        dispatch({type: PRODUCT_CREATE_RESET})
        if (!userInfo.isAdmin){
            navigate('/login')
        }
    
    },[dispatch,userInfo])



  return (
    <>
    <Row className='align-items-center'>
        <Col>
            <h1>Products</h1>
        </Col>
        <Col className='text-right'>
        <Button className='my-3' onclick={createProductHandler}>
            <i className='fas fa-plus'></i>create products
        </Button>
        </Col>
    </Row>
    </>
  )
}

export default productlistscreen