import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import '../questions/Questions.css';
import BASE_URL from "../../Config";

const CpaQuestions = () => {
  const { paperId } = useParams();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedPane, setExpandedPane] = useState(null); // 'questions' | 'answers' | null

  const togglePane = (pane) => {
    setExpandedPane((prev) => (prev === pane ? null : pane));
  };

  // ✅ Load MathJax script ONCE
  useEffect(() => {
    if (!window.MathJax) {
      window.MathJax = {
        tex: {
          inlineMath: [['$', '$'], ['\\(', '\\)']],
          displayMath: [['$$', '$$'], ['\\[', '\\]']]
        },
        svg: { fontCache: 'global' }
      };

      const script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
      script.async = true;
      script.id = "mathjax-script";

      document.body.appendChild(script);
    }
  }, []);

  // ✅ Memoized fetch function (fixes dependency warning)
  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${BASE_URL}/cpa/questions/${paperId}/`);

      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const data = await response.json();
      setQuestions(data);
    } catch (err) {
      setError('Failed to fetch questions. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [paperId]);

  // ✅ Fetch when paperId changes
  useEffect(() => {
    if (paperId) {
      fetchQuestions();
    }
  }, [paperId, fetchQuestions]);

  // ✅ Re-render MathJax AFTER questions load
  useEffect(() => {
    if (questions.length > 0 && window.MathJax) {
      setTimeout(() => {
        window.MathJax.typesetPromise();
      }, 0);
    }
  }, [questions]);

  const renderHTML = (htmlString) => {
    return { __html: htmlString };
  };

  return (
    <div className="questions-container">
      <div className="questions-header">
        <h2 className="units-heading">
          {questions[0]?.subject_title
            ? `${questions[0].subject_title} - ${questions[0].year}/${questions[0].month}`
            : ""}
        </h2>
      </div>

      <div className="questions-grid-cpa">

        {/* LEFT: QUESTIONS */}
        {expandedPane !== 'answers' && (
        <div className="question-section-cpa">
          <div className="questions-card">
            <div className="questions-header-inner">
              <h3 style={{ color: 'white', margin: 0 }}>Questions</h3>
              <button
                id="max-min-questions"
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  cursor: 'pointer'
                }}
                onClick={() => togglePane('questions')}
              >
                {expandedPane === 'questions' ? 'Minimize' : 'Maximize'}
              </button>
            </div>

            {!loading && !error && questions.length > 0 && (
              <div className="questions-list">
                {questions.map((q, index) => (
                  <div key={q.id} className="question-item">
                    <div className="question-header">
                      <span className="question-number">Q{index + 1}</span>
                    </div>

                    <div
                      className="question-text"
                      dangerouslySetInnerHTML={renderHTML(q.question)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        )}

        {/* RIGHT: ANSWERS */}
        {expandedPane !== 'questions' && (
        <div className="answer-section-cpa">
          <div className="questions-card">
            <div className="questions-header-inner">
              <h3 style={{ color: 'white' }}>Answers</h3>

              <button
              id="max-min-answers"
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  cursor: 'pointer'
                }}
                onClick={() => togglePane('answers')}
              >
                {expandedPane === 'answers' ? 'Minimize' : 'Maximize'}
              </button>


            </div>

            {error && <div className="error-message">{error}</div>}

            {loading && (
              <div className="loading-message">
                <div className="spinner"></div>
                <p>Loading answers...</p>
              </div>
            )}

            {!loading && !error && questions.length === 0 && (
              <div className="no-questions">
                <p>No questions found.</p>
              </div>
            )}

            {!loading && !error && questions.length > 0 && (
              <div className="questions-list">
                {questions.map((q, index) => (
                  <div key={q.id} className="question-item">
                    <div className="question-header">
                      <span className="question-number">A{index + 1}</span>
                    </div>

                    <div
                      className="question-text"
                      dangerouslySetInnerHTML={renderHTML(
                        q.answer || "<p>No answer provided.</p>"
                      )}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        )}

      </div>
    </div>
  );
};

export default CpaQuestions;