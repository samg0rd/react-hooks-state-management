import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';

import configureStore from './hooks-store/products-store';

configureStore(); // and then we dont need to wrap anything we can just go where we need it and use it

ReactDOM.render(  
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
