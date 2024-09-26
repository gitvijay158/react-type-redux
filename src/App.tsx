// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from '../src/components/Sidebar';
import Navbar from '../src/components/Navbar';
import MainContent from '../src/components/MainContent';
import Home from '../src/pages/Home';
import About from '../src/pages/About';
import Services from '../src/pages/Services';
import Contact from '../src/pages/Contact';

// Redux
import store from './store/store'; 
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store/store'

import { restoreAuthState, logoutUser } from './store/actions/authActions'; // Import necessary actions
import Login from '../src/pages/Login';
import ProtectedRoute from '../src/components/ProtectedRoute';

import './App.css';

const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <Provider store={store}>
      <Router>
        <AppContent isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      </Router>
    </Provider>
  );
};
    
const AppContent: React.FC<{ isSidebarOpen: boolean; setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>> }> = ({ isSidebarOpen, setSidebarOpen }) => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    // Dispatch restoreAuthState to load authentication state from localStorage
    dispatch(restoreAuthState());
  }, [dispatch]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser()); // Use the logout action to handle logout
  };

  return (
    <div className="d-flex">
      {auth.isAuthenticated && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
      <div className="d-flex flex-column flex-grow-1">
        {auth.isAuthenticated && <Navbar toggleSidebar={toggleSidebar} onLogout={handleLogout} />}
        <MainContent
          content={
            <Routes>
              <Route path="/login" element={auth.isAuthenticated ? <Navigate to="/" /> : <Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
              </Route>
              {/* Redirect to login if not authenticated */}
              <Route path="*" element={<Navigate to={auth.isAuthenticated ? "/" : "/login"} />} />
            </Routes>
          }
        />
      </div>
    </div>
  );
};

export default App;
