import {USER_SIGNUP_REQUEST,USER_SIGNUP_SUCCESS,USER_SIGNUP_FAIL}
from '../constants/userconstants';

export const USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST';

export const usersignupreducers=(state={},action)=>{
    switch(action.type){
        case USER_SIGNUP_REQUEST:
            return {loading:true}
        case USER_SIGNUP_SUCCESS:
            return {loading:false,userInfo:action.payload}  
        case USER_SIGNUP_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}
export default usersignupreducers;


export const userlistReducers=(state={users:[]},action)=>{
    switch(action.type){
        case USER_LIST_REQUEST:
            return {loading:true}
        case USER_LIST_SUCCESS:
            return {loading:false,users:action.payload}
        case USER_LIST_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const userDeleteReducers=(state={},action)=>{
    switch(action.type){
        case USER_DELETE_REQUEST:
            return {loading:true}
        case USER_DELETE_SUCCESS:
            return {loading:false,success:true}     
        case USER_DELETE_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}