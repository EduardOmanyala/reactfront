// src/components/Home.js
import { Link, Navigate } from 'react-router-dom';


export default function CpaHome() {
  // const { isAuthenticated, loading } = useAuth();

  // // Show loading spinner while checking authentication
  // if (loading) {
  //   return (
  //     <div className="loading-container">
  //       <div className="loading-spinner">
  //         <div className="spinner"></div>
  //         <p>Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // // Redirect authenticated users to dashboard
  // if (isAuthenticated) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  // Show home content only to non-authenticated users
  return (
    <div id="home" className="page active">
        <div className="container">
            <div className="content-wrapper">
               

                <section className="features1">
                    <Link to="/level/foundational" style={{ textDecoration: 'none', color: 'inherit' }} >
                    <div className="feature-card glass">
                        <div className="feature-icon">✨</div>
                        <h3>Foundational</h3>
                        <p>Download past papers with marking schemes on all examinable subjects. Take auto marked quizzes to boost your revision.</p>
                    </div>
                    </Link>

                    <Link to="/level/intermediate" style={{ textDecoration: 'none', color: 'inherit' }} >
                    <div className="feature-card glass">
                        <div className="feature-icon">✨</div>
                        <h3>Intermediate</h3>
                        <p>Download past papers with marking schemes on all examinable subjects. Take auto marked quizzes to boost your revision.</p>
                    </div>
                    </Link>

                    <Link to="/level/advanced" style={{ textDecoration: 'none', color: 'inherit' }} >
                    <div className="feature-card glass">
                        <div className="feature-icon">✨</div>
                        <h3>Advanced</h3>
                        <p>Download past papers with marking schemes on all examinable subjects. Take auto marked quizzes to boost your revision.</p>
                    </div>
                    </Link>
                    
                                   
                </section>
            </div>
        </div>
    </div>
  );
}
