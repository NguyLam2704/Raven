
import React from 'react';
import ReactDom from 'react-dom/client';
import '../css/app.css'
import App from './components/App';
import App_User from './user/App_User';
import { BrowserRouter } from 'react-router-dom';

ReactDom.createRoot(document.getElementById('app')).render(
  <BrowserRouter>
    <App_User/>
  </BrowserRouter>

)

