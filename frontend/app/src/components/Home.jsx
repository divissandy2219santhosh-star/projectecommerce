import React from 'react'
import products from '../products'
import {Row,Col} from "react-bootstrap";
import ProductScreen from './screens/ProductScreen';
import axios from 'axios';
import { listProducts} from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux'


function Home() {
  const dispatch=useDispatch()
  const {error,loading,products:productsList} = productsList
  useEffect(()=>{
    dispatch(listProducts())
  },[dispatch])
  const productList=useSelector((state)=>state.productList)

  console.log("products",products)
  return (
    <div>
      <h1 className='text-center mt-2'>Latest Products</h1>
      
      {loading?(
        <Loader/>
        
      ) : error ? (
        <Message variant='danger'>{error}</Message>
        
      ) : (
        <Row>
          {productsList.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <ProductScreen product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default Home;