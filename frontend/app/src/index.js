import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
import './bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
=======
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';

>>>>>>> 49ed4c375b3886912249c93c4f6652e0e9b9fa27

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
<<<<<<< HEAD
=======
=======

const root = ReactDOM.createRoot(document.getElementById('root'));
import store from './store';
import {Provider} from 'react-redux';
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') 
>>>>>>> 9286a9866adad29763e83d60e6e4defb88d9cc37
>>>>>>> 49ed4c375b3886912249c93c4f6652e0e9b9fa27
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
