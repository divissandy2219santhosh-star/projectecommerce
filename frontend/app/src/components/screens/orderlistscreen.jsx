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
    

}