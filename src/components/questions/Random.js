import React, { useState } from 'react';
import './Questions.css';

const Random = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    subject: '',
    count: 10,
    paper_type: ''
  });

  // Available options for the form
  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 
    'English', 'Kiswahili', 'History', 'Geography',
    'Computer Studies', 'Business Studies', 'Agriculture'
  ];
  const questionCounts = [5, 10, 15, 20];
  const paperTypes = [
    { value: 1, label: 'Paper 1' },
    { value: 2, label: 'Paper 2' },
    { value: 3, label: 'Paper 3' }
  ];

  const fetchRandomQuestions = async (searchFilters) => {
    setLoading(true);
    setError('');
    
    try {
      const params = new URLSearchParams();
      if (searchFilters.subject) params.append('subject', searchFilters.subject);
      if (searchFilters.count) params.append('count', searchFilters.count);
      if (searchFilters.paper_type) params.append('paper_type', searchFilters.paper_type);

      const response = await fetch(`http://127.0.0.1:8000/questions/random/?${params.toString()}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch random questions');
      }
      
      const data = await response.json();
      setQuestions(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch random questions. Please try again.');
      console.error('Error fetching random questions:', err);
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
    if (!filters.subject) {
      setError('Please select a subject');
      return;
    }
    fetchRandomQuestions(filters);
  };

  const handleReset = () => {
    setFilters({ subject: '', count: 10, paper_type: '' });
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
        <h1>Random Questions</h1>
        <p>Get random questions for practice and revision</p>
      </div>

      <div className="questions-grid">
        {/* Left Column - Filter Form */}
        <div className="filter-section">
          <div className="filter-card">
            <h3>Random Question Settings</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="subject">Subject: *</label>
                <select
                  id="subject"
                  value={filters.subject}
                  onChange={(e) => handleFilterChange('subject', e.target.value)}
                  required
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="count">Number of Questions: *</label>
                <select
                  id="count"
                  value={filters.count}
                  onChange={(e) => handleFilterChange('count', parseInt(e.target.value))}
                  required
                >
                  {questionCounts.map(count => (
                    <option key={count} value={count}>{count} questions</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="paper_type">Paper Type: (Optional)</label>
                <select
                  id="paper_type"
                  value={filters.paper_type}
                  onChange={(e) => handleFilterChange('paper_type', e.target.value)}
                >
                  <option value="">All Papers</option>
                  {paperTypes.map(paper => (
                    <option key={paper.value} value={paper.value}>{paper.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Generating...' : 'Get Random Questions'}
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
              <h3>Random Questions</h3>
              {questions.length > 0 && (
                <span className="question-count">{questions.length} question(s) generated</span>
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
                <p>Generating random questions...</p>
              </div>
            )}

            {!loading && !error && questions.length === 0 && (
              <div className="no-questions">
                <p>No questions generated yet. Select a subject and click "Get Random Questions".</p>
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

export default Random;
