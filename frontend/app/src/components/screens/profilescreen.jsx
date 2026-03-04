import React, {useState, useEffect } from 'react'
import {Button,Row,Col,ListGroup,Image,Card} from 'react-bootstrap'
import {Link,useNavigate,useParams,useLocation} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import Message from '../Message'
import Loader from '../Loader'
import {getUserDetails,updateUserProfile} from '../../actions/useraction'
import {USER_UPDATE_PROFILE_RESET} from '../../constants/userconstants'

function ProfileScreen() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const userDetails=useSelector((state)=>state.userDetails)
    const {loading,error,user}=userDetails
    const userLogin=useSelector((state)=>state.userLogin)
    const {userInfo}=userLogin 
    const userUpdateProfile=useSelector((state)=>state.userUpdateProfile)
    const {success}=userUpdateProfile
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [message,setMessage]=useState(null)
    

    useEffect(()=>{
        if(!userInfo){
            navigate('/login')
        }else{
            if(!user || !user.name || success){
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
            }

}},[dispatch,navigate,userInfo,user,success])

    const submitHandler=(e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('passwords do not match')
        }else{
            dispatch(updateUserProfile({id:user._id,name,email,password}))
        }
    }}