
import React from 'react';
import ReactDom from 'react-dom/client';
import '../css/app.css'
import App from './admin/components/App';
import User from './user/User';
import { BrowserRouter } from 'react-router-dom';


ReactDom.createRoot(document.getElementById('admin')).render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>

)

ReactDom.createRoot(document.getElementById('user')).render(
  <BrowserRouter>
    <User/>
  </BrowserRouter>

)
