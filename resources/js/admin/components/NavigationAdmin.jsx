import React, {useState} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const NavigationAdmin = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className="fle w-full max-w-[1557px] mx-auto">
      <div className='flex w-full'>  
        {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-500 ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleSidebar} // Đóng sidebar khi bấm vào overlay
      ></div>

        <div className={`
                mobile:z-20 ipad:z-20 desktop:z-0 
                mobile:absolute ipad:absolute desktop:fixed ${isSidebarOpen ? "block" : "hidden"}
                desktop:block
              `}>
          <Sidebar toggleSidebar={toggleSidebar}/>
        </div>

        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>


        
        <main className={`w-full mobile:mt-12 ipad:mt-17 desktop:mt-20 p-5 desktop:ml-60 overflow-y-auto h-full bg-[#F5F6FA]
                        mobile:${isSidebarOpen ? null : "ml-0" }
                        ipad:${isSidebarOpen ? null : "ml-0" }
                      `}
              >
          {children}
        </main>

      </div>
    </div>
  );
};

export default NavigationAdmin;