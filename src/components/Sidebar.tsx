// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}



const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    // Function to conditionally close sidebar on mobile
    const handleLinkClick = () => {
        if (window.innerWidth <= 768) { // Mobile screen size check (adjust based on your needs)
            toggleSidebar();
        }
    };

    return (
        isAuthenticated ? (
        <div className={`d-flex flex-column vh-100 bg-light ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <div className="p-3 bg-primary text-white text-center">
                <h4>Company Logo</h4>
            </div>
            <ul className="nav flex-column mt-2">
                <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={handleLinkClick}>Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/about" onClick={handleLinkClick}>About</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/services" onClick={handleLinkClick}>Services</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/contact" onClick={handleLinkClick}>Contact</Link>
                </li>
            </ul>
        </div> ) : null
    );
};

export default Sidebar;
