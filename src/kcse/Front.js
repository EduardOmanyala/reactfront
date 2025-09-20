// src/components/Home.js
import { Link, Navigate } from 'react-router-dom';
export default function Front() {
  return (
    
    
    <div id="home" className="page active">
        <div className="container">
            <div className="content-wrapper">

                <section className="features">
                    <Link to="/questions-bank" style={{ textDecoration: 'none', color: 'inherit' }} >
                    <div className="feature-card glass">
                        <div className="feature-icon">✨</div>
                        <h3>Past Papers</h3>
                        <p>Browse through thousands of questions from past examinations. Detailed answers included for each question. </p>
                    </div>
                    </Link>
                    <Link to="/random-questions" style={{ textDecoration: 'none', color: 'inherit' }} >
                    <div className="feature-card glass">
                        <div className="feature-icon">⚡</div>
                        <h3>Get Questions</h3>
                        <p>Choose random questions with answers in your desired subject. </p>
                    </div>
                    </Link>
                    <Link to="/kcse" style={{ textDecoration: 'none', color: 'inherit' }} >
                    <div className="feature-card glass">
                        <div className="feature-icon">📱</div>
                        <h3>Quiz Me</h3>
                        <p>Jet set your revision using our quizzes. Find weaknesses and address them on time.  </p>
                    </div>
                    </Link>

                    
                </section>
            </div>
        </div>
    </div>
  );
}
