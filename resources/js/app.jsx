
import React from 'react';
import ReactDom from 'react-dom/client';
import '../css/app.css'
import App_User from './user/App_User';
import App from './admin/components/App';
import { BrowserRouter } from 'react-router-dom';

ReactDom.createRoot(document.getElementById('app')).render(
  <BrowserRouter>
    <App/>
    <App_User/>
  </BrowserRouter>

)

