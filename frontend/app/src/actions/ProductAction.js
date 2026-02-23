import axios from 'axios'
import{
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_SUCCESS,
    PRODUCTS_DETAILS_FAIL,
} from '../constants/ProductConstants.jsx '

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get('/api/products')

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export default listProducts;
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCTS_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCTS_DETAILS_SUCCESS,
            payload: data,
        })
        } catch (error) {
        dispatch({
            type: PRODUCTS_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const createProduct=() => async (dispatch,getState)=>{
    try{
        dispatch({
            type:PRODUCT_CREATE_REQUEST
        })
        const {userlogin:{userInfo}}=getState();
        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}=await axios.post('/api/products',product,config)
        dispatch({
            type:PRODUCT_CREATE_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:PRODUCT_CREATE_FAIL,
            payload:error.response && error.response.data.message?error.response.data.message:error.message,
        })
    
}
}

export const updateProduct=(product)=>async(dispatch,getState)=>{
    try{
        dispatch({
            type:PRODUCT_UPDATE_REQUEST
        })}catch(error){
            dispatch({
                type:PRODUCT_UPDATE_FAIL
            })
    }

}