import React, {useState, useEffect } from 'react'
import {Button,Row,Col,ListGroup,Image,Card} from 'react-bootstrap'
import {Link,useNavigate,useParams,useLocation} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import Message from '../Message'
import Loader from '../Loader'
import {getOrderDetails,deliverOrder} from '../actions/orderactions'
import {ORDER_DELIVER_RESET} from '../constants/orderconstants'
import {listorders} from '../../action/orderaction'

function OrderListScreen(){
    const dispatch=useDispatch()

    const orderList=useSelector(state=>state.orderList)
    const{loading,error,orders} = orderList

    const userrLogin = useSelector(state=>state.userLogin)
    const{userInfo} = userLogin
    const orderDeliver = useSelector(state=>state.orderDeliver)
    const{loading:loadingDeliver,error:errorDeliver,success:successDeliver} = orderDeliver
    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listorders())
        }else{
            navigate('/login')
        }
        if(successDeliver){
            dispatch({type:ORDER_DELIVER_RESET})
            dispatch(listorders())
        }
    },[dispatch,navigate,userInfo,successDeliver])
return (
    <>
    <h1>orders</h1>
    {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order=>(
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user && order.user.name}</td>
                        <td>{order.createdAt.substring(0,10)}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.isPaid ? order.paidAt.substring(0,10) : (<i className='fas fa-times' style={{color:'red'}}></i>)}</td>
                        <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : (<i className='fas fa-times' style={{color:'red'}}></i>)}</td>
                        <td>
                            <LinkContainer to={`/order/${order._id}`}>
                                <Button variant='light' className='btn-sm'>details</Button>
                            </LinkContainer>
                            {order.isPaid && !order.isDelivered && (
                                <Button variant='success' className='btn-sm' onClick={()=>dispatch(deliverOrder(order._id))}>
                                    mark as delivered
                                </Button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )}
    
    
    
    
    
    
    
    
    
    </>
    


  )}

