import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
import './CourseSelection.css';
import BASE_URL from '../Config';

const CourseSelection = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const fetchCourses = async () => {
    try {
      setLoading(true);
  
      const doRequest = async () => {
        return await fetch(`${BASE_URL}/api/courses/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json',
          },
        });
      };
  
      let response = await doRequest();
  
      // If token expired, try refreshing
      if (response.status === 401) {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const refreshResponse = await fetch(`${BASE_URL}/api/token/refresh/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: refreshToken }),
          });
  
          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            localStorage.setItem('access_token', refreshData.access);
  
            // Retry with new access token
            response = await doRequest();
          } else {
            // Refresh failed → logout user
            localStorage.clear();
            navigate('/login');
            return;
          }
        }
      }
  
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
  
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  //end fetch courses

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  // const handleNext = async () => {
  //   if (!selectedCourse) {
  //     alert('Please select a course first');
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`${BASE_URL}/api/my-courses/`, {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
  //         //'Authorization': `JWT ${localStorage.getItem('access_token')}`,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         course: selectedCourse.id
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to save course selection');
  //     }

  //     // Navigate to subject selection with course data
  //     navigate('/subject-selection', { 
  //       state: { 
  //         selectedCourse: selectedCourse 
  //       } 
  //     });
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };


  const handleNext = async () => {
    if (!selectedCourse) {
      alert('Please select a course first');
      return;
    }
  
    try {
      const doRequest = async () => {
        return await fetch(`${BASE_URL}/api/my-courses/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            course: selectedCourse.id,
          }),
        });
      };
  
      let response = await doRequest();
  
      // If unauthorized, try refreshing token
      if (response.status === 401) {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const refreshResponse = await fetch(`${BASE_URL}/api/token/refresh/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: refreshToken }),
          });
  
          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            localStorage.setItem('access_token', refreshData.access);
  
            // Retry with new token
            response = await doRequest();
          } else {
            // Refresh failed → clear storage & redirect to login
            localStorage.clear();
            navigate('/login');
            return;
          }
        }
      }
  
      if (!response.ok) {
        throw new Error('Failed to save course selection');
      }
  
      // Navigate to subject selection with course data
      navigate('/subject-selection', {
        state: { selectedCourse: selectedCourse },
      });
  
    } catch (err) {
      setError(err.message);
    }
  };


     //end handle next
  if (loading) {
    return (
      <div className="course-selection-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="course-selection-container">
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={fetchCourses}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="course-selection-container">
      <div className="course-selection-content">
        <div className="course-selection-header">
          <h1>Choose Your Course</h1>
          <p>Select the course you want to study</p>
        </div>

        <div className="courses-grid">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`course-card ${selectedCourse?.id === course.id ? 'selected' : ''}`}
              onClick={() => handleCourseSelect(course)}
            >
              <div className="course-icon">
                {course.code === 'kcse' && '🎓'}
                {course.code === 'cpa' && '📊'}
                {course.code === 'kmtc' && '🏥'}
                {course.code === 'acca' && '💼'}
              </div>
              <h3>{course.name}</h3>
              <p>Click to select this course</p>
            </div>
          ))}
        </div>

        <div className="course-selection-actions">
          <button
            className="next-button"
            onClick={handleNext}
            disabled={!selectedCourse}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseSelection;
