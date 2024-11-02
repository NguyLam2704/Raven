import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const NavigationAdmin = ({ children }) => {
  return (
    <div className="flex h-screen font-adminFont">
      <div className='flex w-full'>
        <Sidebar />

        <Header />
        
        <main className="main-content w-full mt-20 ml-60 p-5 overflow-y-auto h-full bg-gray-100">{children}</main>

      </div>
    </div>
  );
};

export default NavigationAdmin;
