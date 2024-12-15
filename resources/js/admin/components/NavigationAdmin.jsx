import React, {useState} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const NavigationAdmin = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className="flex w-full max-w-[1557px] mx-auto bg-[#F5F6FA]">
      <div className='flex w-full'>  
        {/* Overlay */}
        <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out
          ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"} z-20`}
          onClick={toggleSidebar}>
        </div>

        <div className={`
                mobile:z-30 ipad:z-30 desktop:z-0 desktop:relative
                mobile:absolute ipad:absolute desktop:block
                transition-transform duration-300 ease-in-out
                
                `}
                >
          <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>
        </div>

        <div className='z-0'>
          <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>
        </div>



        
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