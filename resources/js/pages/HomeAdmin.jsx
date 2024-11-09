import React from 'react';
import NavigationAdmin from '../components/NavigationAdmin';

const Home = () => {
  console.log(localStorage.getItem('token'));
  
  return (
    <NavigationAdmin>
        <h1>Home Screen</h1>
    </NavigationAdmin>
  );
};

export default Home;
