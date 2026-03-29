import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../questions/Questions.css';
import BASE_URL from "../../Config";

const CpaQuestions = () => {
  const { paperId } = useParams();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const fetchQuestions = async () => {
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
  };

  useEffect(() => {
    if (paperId) {
      fetchQuestions();
    }
  }, [paperId]);

  // ✅ Re-render MathJax AFTER questions load
  useEffect(() => {
    if (questions.length > 0 && window.MathJax) {
      // small delay ensures DOM is painted
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
         <h2 className="units-heading">{questions[0]?.subject_title
    ? `${questions[0].subject_title} - ${questions[0].year}/${questions[0].month}`
    : ""}</h2>
      </div>

      <div className="questions-grid-cpa">

        {/* LEFT: QUESTIONS */}
        <div className="question-section-cpa">
          <div className="questions-card">
            {/* <div className="questions-header-inner">
              <h3 style={{ color: 'white' }}>Questions</h3>
            </div> */}
            <div
            className="questions-header-inner"
           
          >
            <h3 style={{ color: 'white', margin: 0 }}>Questions</h3>
            <button 
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '20px',
                cursor: 'pointer'
              }}
              onClick={() => console.log('Button clicked!')}
            >
              My Button
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

        {/* RIGHT: ANSWERS */}
        <div className="answer-section-cpa">
          <div className="questions-card">
            <div className="questions-header-inner">
              <h3 style={{ color: 'white' }}>Answers</h3>
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

      </div>
    </div>
  );
};

export default CpaQuestions;