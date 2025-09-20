import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
import './SubjectSelection.css';

const SubjectSelection = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  // const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedCourse = location.state?.selectedCourse;

  useEffect(() => {
    if (!selectedCourse) {
      navigate('/course-selection');
      return;
    }
    fetchSubjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCourse, navigate]);

  // const fetchSubjects = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch(`http://127.0.0.1:8000/api/courses/${selectedCourse.id}/subjects/`, {
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch subjects');
  //     }

  //     const data = await response.json();
  //     setSubjects(data);
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchSubjects = async () => {
    try {
      setLoading(true);
  
      // Define the request
      const doRequest = async () => {
        return await fetch(`http://127.0.0.1:8000/api/courses/${selectedCourse.id}/subjects/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json',
          },
        });
      };
  
      let response = await doRequest();
  
      // If access token is expired, try refreshing
      if (response.status === 401) {
        const refreshResponse = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh: localStorage.getItem('refresh_token') }),
        });
  
        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          localStorage.setItem('access_token', refreshData.access);
  
          // Retry the original request with new access token
          response = await doRequest();
        } else {
          // Refresh failed → logout
          localStorage.clear();
          navigate('/login');
          return;
        }
      }
  
      if (!response.ok) {
        throw new Error('Failed to fetch subjects');
      }
  
      const data = await response.json();
      setSubjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const handleSubjectToggle = (subject) => {
    setSelectedSubjects(prev => {
      const isSelected = prev.some(s => s.id === subject.id);
      if (isSelected) {
        return prev.filter(s => s.id !== subject.id);
      } else {
        return [...prev, subject];
      }
    });
  };

  // const handleSave = async () => {
  //   if (selectedSubjects.length === 0) {
  //     alert('Please select at least one subject');
  //     return;
  //   }

  //   try {
  //     setSaving(true);
  //     const subjectsData = selectedSubjects.map(subject => ({
  //       course: selectedCourse.id,
  //       subject: subject.id
  //     }));

  //     const response = await fetch('http://127.0.0.1:8000/api/my-subjects/', {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(subjectsData),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to save subject selections');
  //     }

  //     // Navigate to dashboard
  //     navigate('/dashboard');
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setSaving(false);
  //   }
  // };

  const handleSave = async () => {
    if (selectedSubjects.length === 0) {
      alert('Please select at least one subject');
      return;
    }
  
    try {
      setSaving(true);
  
      const subjectsData = selectedSubjects.map(subject => ({
        course: selectedCourse.id,
        subject: subject.id
      }));
  
      // Define request
      const doRequest = async () => {
        return await fetch('http://127.0.0.1:8000/api/my-subjects/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(subjectsData),
        });
      };
  
      let response = await doRequest();
  
      // Handle expired access token
      if (response.status === 401) {
        const refreshResponse = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh: localStorage.getItem('refresh_token') }),
        });
  
        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          localStorage.setItem('access_token', refreshData.access);
  
          // Retry request with new token
          response = await doRequest();
        } else {
          // Refresh failed → logout
          localStorage.clear();
          navigate('/login');
          return;
        }
      }
  
      if (!response.ok) {
        throw new Error('Failed to save subject selections');
      }
  
      // Success → go to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };



  const handleBack = () => {
    navigate('/course-selection');
  };

  if (loading) {
    return (
      <div className="subject-selection-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading subjects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="subject-selection-container">
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={fetchSubjects}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="subject-selection-container">
      <div className="subject-selection-content">
        <div className="subject-selection-header">
          <h1>Choose Your Subjects</h1>
          <p>Select the subjects you want to study for {selectedCourse?.name}</p>
          <p className="selected-count">
            {selectedSubjects.length} subject{selectedSubjects.length !== 1 ? 's' : ''} selected
          </p>
        </div>

        <div className="subjects-grid">
          {subjects.map((subject) => {
            const isSelected = selectedSubjects.some(s => s.id === subject.id);
            return (
              <div
                key={subject.id}
                className={`subject-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSubjectToggle(subject)}
              >
                <div className="subject-checkbox">
                  {isSelected && <span className="checkmark">✓</span>}
                </div>
                <div className="subject-content">
                  <h3>{subject.name}</h3>
                  <p>Click to {isSelected ? 'deselect' : 'select'} this subject</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="subject-selection-actions">
          <button className="back-button" onClick={handleBack}>
            Back
          </button>
          <button
            className="save-button"
            onClick={handleSave}
            disabled={selectedSubjects.length === 0 || saving}
          >
            {saving ? 'Saving...' : 'Save & Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectSelection;
