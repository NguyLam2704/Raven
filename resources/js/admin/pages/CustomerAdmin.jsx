import React, { useState, useEffect } from "react";
import NavigationAdmin from "../components/NavigationAdmin";
import { Helmet } from "react-helmet";
import axios from "axios";
import UserList from "../components/customer/UserList";
import loading from "../asset/loading.svg"


const fetchUser = async () => {
    const response = await axios.get('/api/v1/user');
    return response.data;
}

const Customer = () => {
    const [UsersData, setUsersData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const LoadData = async () => {
          const userData = await fetchUser();
          setUsersData(userData.data)
          console.log(userData.data);
          setIsLoading(false);
        }
        LoadData();
    } ,[]) 

    if (isLoading) {
        return ( null
            // <div className="w-full h-[700px] flex justify-center items-center">
            //     <img src={loading}/>
            // </div>
        )
    } 
    return (
        <NavigationAdmin>
            <Helmet>
                <title>Quản lý khách hàng</title>
            </Helmet>
            <h1 className='text-[32px] font-bold mt-4'>
                Khách hàng
            </h1>

            <div className="w-full">
                <UserList data={UsersData}/>
            </div>

        </NavigationAdmin>
    );
}

export default Customer;