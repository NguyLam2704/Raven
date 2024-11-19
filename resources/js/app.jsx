
import React from 'react';
import ReactDom from 'react-dom/client';
import '../css/app.css'
import User from './user/User';
import App from './admin/components/App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDom.createRoot(document.getElementById('app')).render(
  <BrowserRouter>
    <App/>
    <User/>
  </BrowserRouter>

)

