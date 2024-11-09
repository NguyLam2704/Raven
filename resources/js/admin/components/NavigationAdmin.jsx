import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const NavigationAdmin = ({ children }) => {
  return (
    <div className="flex h-screen font-adminFont">
      <div className='flex w-full'>
        <Sidebar />

        <Header />
        
        <main className="main-content w-full mt-20 ml-60 p-5 overflow-y-auto h-[calc(100%-80px)] bg-[#F5F6FA]">{children}</main>

      </div>
    </div>
  );
};

export default NavigationAdmin;
