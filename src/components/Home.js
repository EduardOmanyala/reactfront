// src/components/Home.js
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isAuthenticated, loading } = useAuth();

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

  // Redirect authenticated users to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Show home content only to non-authenticated users
  return (
    <div id="home" className="page active">
        <div className="container">
            <div className="content-wrapper">
                <section className="hero glass">
                    <div className="hero-image">
                        <img src="images/templatemo-futuristic-girl.jpg" alt="Modern Technology Interaction" />
                    </div>
                    <div className="hero-content">
                        <h1>Welcome to the Future</h1>
                        <p>E-learning is the future. Almost all forms of learning now days involve some element of computing. Our platform provides an extensive array of tools that can meet the needs of all learners.</p>
                        <a href="https://www.youtube.com/" className="cta-button" onclick="showPage('about')">Learn More</a>
                    </div>
                </section>

                <section className="features">
                    <Link to="/kcse" style={{ textDecoration: 'none', color: 'inherit' }} >
                    <div className="feature-card glass">
                        <div className="feature-icon">✨</div>
                        <h3>KCSE</h3>
                        <p>Download past papers with marking schemes on all examinable subjects. Take auto marked quizzes to boost your revision.</p>
                    </div>
                    </Link>
                     <Link to="/cpa/home" style={{ textDecoration: 'none', color: 'inherit' }} >
                    <div className="feature-card glass">
                        <div className="feature-icon">⚡</div>
                        <h3>CPA</h3>
                        <p>Level up your revision by getting the latest revision kits and questions. Quiz yourself to gauge your readiness.</p>
                    </div>
                    </Link>
                    <Link to="/books" style={{ textDecoration: 'none', color: 'inherit' }} >
                    <div className="feature-card glass">
                        <div className="feature-icon">📱</div>
                        <h3>Books</h3>
                        <p>Upskill or reskill with expert authored books on a wide range of topics & areas of practice you may be interested in.</p>
                    </div>
                    </Link>
                    <Link to="/finance/mmf/kenya" style={{ textDecoration: 'none', color: 'inherit' }} >
                    <div className="feature-card glass">
                        <div className="feature-icon">🎨</div>
                        <h3>MMF</h3>
                        <p>The latest news. Rate changes. Estimate retruns and compare different providers to find what best for you.</p>
                    </div>
                    </Link>
                   <Link to="/land-prices-by-county-in-kenya" style={{ textDecoration: 'none', color: 'inherit' }} >
                    <div className="feature-card glass">
                        <div className="feature-icon">🔒</div>
                        <h3>Land</h3>
                        <p>All you need to know about land prices in kenya, purchase processes and other important information.</p>
                    </div>
                    </Link>

                    
                </section>
            </div>
        </div>
    </div>
  );
}
