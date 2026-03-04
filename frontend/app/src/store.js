
import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import productListReducer from './reducers/productReducer';

import {productListReducers} from './reducers/Productreducers';

const productReducer=combineReducers({
    productList:productListReducers,
    productDetails:productDetailsReducers,
    usersignup:usersignupreducers,
    userlogin:userloginreducers,
    userlogout:userlogoutreducers,
    userlogin:userloginreducers,
    userprofile:userprofilereducers,
    cart:cartreducers,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListMyReducer,
    orderList:orderListReducer,
    orderDeliver:orderDeliverReducer,
    productCreate:productCreateReducers,
    productUpdate:productUpdateReducers,
    productDelete:productDeleteReducers,
    userRegister:userRegisterReducers,
    userDetails:userDetailsReducers,
    userUpdateProfile:userUpdateProfileReducers,
    userList:userlistReducers,
    userDelete:userDeleteReducers,
    userUpdate:userUpdateReducers,
    
})

const userinfofromstorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
JSON.parse(localStorage.getItem('userInfo'))
const initialState={
    cart:{
        cartItems:cartitemfromstorage
    },
    userlogin:{
        userInfo:userinfofromstorage
    }
}
const middleware=[thunk]
const store=createStore(
    combineReducers({
        products:productReducer
    }),
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

const shippingAddressfromstorage=localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')):{}
JSON.parse(localStorage.getItem('shippingAddress'))
const paymentMethodfromstorage=localStorage.getItem('paymentMethod')?JSON.parse(localStorage.getItem('paymentMethod')):{}
JSON.parse(localStorage.getItem('paymentMethod'))

const cartitemfromstorage=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
JSON.parse(localStorage.getItem('cartItems'))


export default store;
console.log(store)