// src/components/Home.js
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { useAuth } from '../context/AuthContext';


export default function Dash() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const fetchUserData = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch('http://127.0.0.1:8000/api/dashboard-data/', {
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch user data');
  //     }

  //     const data = await response.json();
  //     setUserData(data);

  //     // If user has no courses, redirect to course selection
  //     if (data.courses.length === 0) {
  //       navigate('/course-selection');
  //       return;
  //     }
  //   } catch (err) {
  //     console.error('Error fetching user data:', err);
  //     // If there's an error and user has no courses, redirect to course selection
  //     navigate('/course-selection');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchUserData = async () => {
    try {
      setLoading(true);
  
      const doRequest = async () => {
        return await fetch('http://127.0.0.1:8000/api/dashboard-data/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json',
          },
        });
      };
  
      let response = await doRequest();
  
      // If access token expired, try refresh
      if (response.status === 401) {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const refreshResponse = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: refreshToken }),
          });
  
          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            localStorage.setItem('access_token', refreshData.access);
  
            // Retry original request with new token
            response = await doRequest();
          } else {
            // Refresh failed → clear and redirect to login
            localStorage.clear();
            navigate('/login');
            return;
          }
        }
      }
  
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
  
      const data = await response.json();
      setUserData(data);
  
      // If user has no courses, redirect to course selection
      if (data.courses.length === 0) {
        navigate('/course-selection');
        return;
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      navigate('/course-selection');
    } finally {
      setLoading(false);
    }
  };
  






  //end of fetchuser data

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="home" className="page active">
        <div className="container">
            <div className="content-wrapper">
            
                {/* User Subjects Section */}
                {userData && userData.subjects.length > 0 && (
                  <section className="user-subjects-section">
                    <h2>My Subjects</h2>
                    <div className="subjects-grid">
                      {userData.subjects.map((subject) => (
                        <div key={subject.id} className="subject-link-card">
                          <h3>{subject.subject_name}</h3>
                          <p>Course: {subject.course_name}</p>
                          <Link to="#" className="subject-link">
                            Study {subject.subject_name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                <section className="features">
                    <Link to="/kcse" style={{ textDecoration: 'none', color: 'inherit' }} >
                    <div className="feature-card glass">
                        <div className="feature-icon">✨</div>
                        <h3>KCSE</h3>
                        <p>Beautiful glass morphism effects with backdrop blur and translucent elements that create depth and visual hierarchy.</p>
                    </div>
                    </Link>
                    
                    <div className="feature-card glass">
                        <div className="feature-icon">⚡</div>
                        <h3>CPA/CPS</h3>
                        <p>Optimized animations and effects that maintain smooth 60fps performance across all modern browsers and devices.</p>
                    </div>
                    
                    <div className="feature-card glass">
                        <div className="feature-icon">📱</div>
                        <h3>KMTC</h3>
                        <p>Fully responsive design that adapts beautifully to any screen size, from mobile phones to desktop displays.</p>
                    </div>

                    <div className="feature-card glass">
                        <div className="feature-icon">🎨</div>
                        <h3>JSC</h3>
                        <p>Engaging hover effects, smooth transitions, and micro-animations that create delightful user experiences.</p>
                    </div>

                    <div className="feature-card glass">
                        <div className="feature-icon">🔒</div>
                        <h3>ACCA</h3>
                        <p>Built with modern security standards and best practices to ensure your data and user privacy are protected.</p>
                    </div>

                    <div className="feature-card glass">
                        <div className="feature-icon">🚀</div>
                        <h3>Easy Integration</h3>
                        <p>Simple to implement and customize for any project with clean, well-documented code and flexible components.</p>
                    </div>
                </section>
            </div>
        </div>
    </div>
  );
}
