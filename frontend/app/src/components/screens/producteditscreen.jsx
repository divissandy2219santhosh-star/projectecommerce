import React,{useState,useEffect} from 'react'
import {LinkContainer} from 'react-router-dom'
import {Table, Button, Row, Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../screens/loader'
import Message from '../screens/message'
import {listProducts,createProduct,deleteProduct} from '../screens/ProductScreen'
import {PRODUUCT_CREATE_RESET} from '../../constants/ProductConstants'
import {useNavigate} from "react-router-dom"

function productEditScreen(){
    const {id}=useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [image,setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [description, setDescription]= useState('')
    const [uploading,setuploading] = useState(false)

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector(state=>productupdate)
    const {error:errorupdate,loading:loadingupdate,success:successUpdate}=productupdate


    useEffect(()=>{
        if (successUpdate){
            navigate('/admin/productlist')
        }
        else{
            if(!product,name ||product._id==Number(id)){
                dispatch(listProductDetails(id))
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)

            }
        }
        
    },[dispatch,product,id,successupdate])
return (
    <>
    <Link to='/admin/productlist'>go  back</Link>
    <FormContainer>
        <h1>edit product</h1>
        {loadingupdate && <Loader/>}
        {errorupdate && <Message variant='danger'>{errorupdate}</Message>}

        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
            <Form onSubmit={(e) => {
                e.preventDefault()
                dispatch(updateProduct({
                    _id: id,
                    name,
                    price,
                    image,
                    brand,
                    category,
                    countInStock,
                    description
                }))
            }}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='price' className='mt-3'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='image' className='mt-3'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter image url'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='brand' className='mt-3'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter brand'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='countInStock' className='mt-3'>
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter stock'
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='mt-3'>Update</Button>
            </Form>
        )}
    </FormContainer>
    </>
)
};