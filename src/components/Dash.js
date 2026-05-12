// src/components/Home.js
// import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './gen.css';
import Ebooks from '../books/Ebooks'; 

export default function Dash() {
  const { loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="home" className="page active">
         <div>
            <Ebooks />
        </div>
    </div>
  );
}