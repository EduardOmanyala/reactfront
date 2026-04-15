// src/components/Home.js
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './gen.css';

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
    <div id="home" className="page active marg-dash">
      <div className="container">
        <div className="content-wrapper">
          <section className="features">
            
            <Link to="/cpa/home" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-card glass">
                <div className="feature-icon">⚡</div>
                <h3>CPA</h3>
                <p>Level up your revision by getting the latest revision kits and questions. Quiz yourself to gauge your readiness.</p>
              </div>
            </Link>

            <Link to="/books" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-card glass">
                <div className="feature-icon">📱</div>
                <h3>Books</h3>
                <p>Upskill or reskill with expert authored books on a wide range of areas of practice you may be interested in.</p>
              </div>
            </Link>

            <Link to="/finance/mmf/kenya" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-card glass">
                <div className="feature-icon">🎨</div>
                <h3>MMF</h3>
                <p>The latest news. Rate changes. Estimate returns and compare different providers to find what’s best for you.</p>
              </div>
            </Link>

            <Link to="/land-prices-by-county-in-kenya" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-card glass">
                <div className="feature-icon">🔒</div>
                <h3>Land</h3>
                <p>All you need to know about land prices in Kenya, purchase processes and other important information.</p>
              </div>
            </Link>

          </section>
        </div>
      </div>
    </div>
  );
}