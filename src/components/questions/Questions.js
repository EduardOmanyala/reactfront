import React, { useState, useEffect } from 'react';
import './Questions.css';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    year: '',
    subject: '',
    paper_type: ''
  });

  // Available options for the form
  const years = Array.from({ length: 10 }, (_, i) => 2024 - i); // Last 25 years
  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 
    'English', 'Kiswahili', 'History', 'Geography',
    'Computer Studies', 'Business Studies', 'Agriculture'
  ];
  const paperTypes = [
    { value: 1, label: 'Paper 1' },
    { value: 2, label: 'Paper 2' },
    { value: 3, label: 'Paper 3' }
  ];

  const fetchQuestions = async (searchFilters) => {
    setLoading(true);
    setError('');
    
    try {
      const params = new URLSearchParams();
      if (searchFilters.year) params.append('year', searchFilters.year);
      if (searchFilters.subject) params.append('subject', searchFilters.subject);
      if (searchFilters.paper_type) params.append('paper_type', searchFilters.paper_type);
      params.append('type', 'kcse'); // Default type

      const response = await fetch(`http://127.0.0.1:8000/questions/get/?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      
      const data = await response.json();
      setQuestions(data);
    } catch (err) {
      setError('Failed to fetch questions. Please try again.');
      console.error('Error fetching questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchQuestions(filters);
  };

  const handleReset = () => {
    setFilters({ year: '', subject: '', paper_type: '' });
    setQuestions([]);
    setError('');
  };

  // Function to safely render HTML content
  const renderHTML = (htmlString) => {
    return { __html: htmlString };
  };

  return (
    <div className="questions-container">
      <div className="questions-header">
        <h1>Question Bank</h1>
        <p>Filter and search through our collection of past exam questions</p>
      </div>

      <div className="questions-grid">
        {/* Left Column - Filter Form */}
        <div className="filter-section">
          <div className="filter-card">
            <h3>Search Filters</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="year">Year:</label>
                <select
                  id="year"
                  value={filters.year}
                  onChange={(e) => handleFilterChange('year', e.target.value)}
                >
                  <option value="">Select Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject:</label>
                <select
                  id="subject"
                  value={filters.subject}
                  onChange={(e) => handleFilterChange('subject', e.target.value)}
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="paper_type">Paper Type:</label>
                <select
                  id="paper_type"
                  value={filters.paper_type}
                  onChange={(e) => handleFilterChange('paper_type', e.target.value)}
                >
                  <option value="">Select Paper Type</option>
                  {paperTypes.map(paper => (
                    <option key={paper.value} value={paper.value}>{paper.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Searching...' : 'Search Questions'}
                </button>
                <button type="button" className="btn-secondary" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column - Questions Display */}
        <div className="questions-section">
          <div className="questions-card">
            <div className="questions-header-inner">
              <h3>Questions</h3>
              {questions.length > 0 && (
                <span className="question-count">{questions.length} question(s) found</span>
              )}
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {loading && (
              <div className="loading-message">
                <div className="spinner"></div>
                <p>Loading questions...</p>
              </div>
            )}

            {!loading && !error && questions.length === 0 && (
              <div className="no-questions">
                <p>No questions found. Try adjusting your filters.</p>
              </div>
            )}

            {!loading && !error && questions.length > 0 && (
              <div className="questions-list">
                {questions.map((question, index) => (
                  <div key={question.id} className="question-item">
                    <div className="question-header">
                      <span className="question-number">Q{index + 1}</span>
                      <span className="question-meta">
                        {question.year} • {question.subject} • Paper {question.paper_type}
                      </span>
                    </div>
                    <div 
                      className="question-text"
                      dangerouslySetInnerHTML={renderHTML(question.text)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;

