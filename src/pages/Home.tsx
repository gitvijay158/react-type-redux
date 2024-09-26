// src/pages/Home.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';

const Home: React.FC = () => {

  const auth = useSelector((state: RootState) => state.auth);



  return (
    <div className="container mt-5">
      <h2>Home</h2>
      <p>Welcome to the Home Page</p>
      {auth.isAuthenticated && <p> {auth.token}</p>}
    </div>
  )
};

export default Home;

