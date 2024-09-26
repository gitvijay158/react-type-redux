// src/components/Navbar.tsx
import React from 'react';
 
import { RootState } from '../store/store';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { logoutUser } from '../store/actions/authActions'; 

interface NavbarProps {
  toggleSidebar: () => void;
  onLogout: () => void; // Add onLogout as a prop
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar , onLogout}) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const dispatch = useDispatch<AppDispatch>(); // Typed dispatch for async actions

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dispatch login action, Redux will handle auth state
    dispatch(logoutUser());
  };


  return (
    isAuthenticated ? (
    <nav className="navbar navbar-light bg-light">
      <button className="navbar-toggler" type="button" onClick={toggleSidebar}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <span className="navbar-brand mb-0 h1">My App</span>
      <button className="btn btn-danger" onClick={handleSubmit}>Logout</button> {/* Logout button */}
    </nav>): null
  );
};

export default Navbar;
