import React, { useState, useEffect } from 'react';
import './QuizComponent.css';

// Mock data - you can replace this with your Django API call
const mockQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2 // Index of correct answer (Paris)
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1 // Index of correct answer (Mars)
  },
  {
    id: 3,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3 // Index of correct answer (Pacific Ocean)
  },
  {
    id: 4,
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: 1 // Index of correct answer (William Shakespeare)
  },
  {
    id: 5,
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Au", "Fe", "Cu"],
    correctAnswer: 1 // Index of correct answer (Au)
  }
];

const QuizComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with setTimeout
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setQuestions(mockQuestions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionSelect = (optionIndex) => {
    if (!isSubmitted) {
      setUserAnswers(prev => ({
        ...prev,
        [currentQuestionIndex]: optionIndex
      }));
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  const getCurrentQuestion = () => {
    return questions[currentQuestionIndex];
  };

  const isOptionSelected = (optionIndex) => {
    return userAnswers[currentQuestionIndex] === optionIndex;
  };

  const isOptionCorrect = (optionIndex) => {
    if (!isSubmitted) return false;
    return optionIndex === getCurrentQuestion().correctAnswer;
  };

  const isOptionIncorrect = (optionIndex) => {
    if (!isSubmitted) return false;
    return userAnswers[currentQuestionIndex] === optionIndex && 
           optionIndex !== getCurrentQuestion().correctAnswer;
  };

  if (loading) {
    return (
      <div className="quiz-container">
        <div className="loading">Loading questions...</div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="quiz-container">
        <div className="results">
          <h2>Quiz Results</h2>
          <div className="score">
            <h3>Your Score: {score}%</h3>
            <p>You got {Math.round((score / 100) * questions.length)} out of {questions.length} questions correct!</p>
          </div>
          
          <div className="question-review">
            <h3>Question Review:</h3>
            {questions.map((question, index) => (
              <div key={question.id} className="review-item">
                <h4>Question {index + 1}: {question.question}</h4>
                <div className="options-review">
                  {question.options.map((option, optionIndex) => (
                    <div 
                      key={optionIndex} 
                      className={`option-review ${
                        optionIndex === question.correctAnswer ? 'correct' : 
                        userAnswers[index] === optionIndex ? 'incorrect' : ''
                      }`}
                    >
                      {option}
                      {optionIndex === question.correctAnswer && <span className="correct-mark">✓</span>}
                      {userAnswers[index] === optionIndex && optionIndex !== question.correctAnswer && 
                        <span className="incorrect-mark">✗</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <button className="restart-btn" onClick={handleRestart}>
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>Quiz</h2>
        <div className="progress">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>

      <div className='quiz-div'>
        <div className="quiz-image1">
            <img src="images/templatemo-futuristic-girl.jpg" alt="Modern Technology Interaction" />
        </div>
        <div>
            <h3 style={{verticalAlign: 'top', marginBottom: '3%'}}>{getCurrentQuestion().question}</h3>
            <div className="options">
          {getCurrentQuestion().options.map((option, index) => (
            <label 
              key={index} 
              className={`option ${
                isOptionSelected(index) ? 'selected' : ''
              } ${
                isOptionCorrect(index) ? 'correct' : ''
              } ${
                isOptionIncorrect(index) ? 'incorrect' : ''
              }`}
            >
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value={index}
                checked={isOptionSelected(index)}
                onChange={() => handleOptionSelect(index)}
                disabled={isSubmitted}
              />
              <span className="option-text">{option}</span>
            </label>
          ))}
        </div>
        </div>
      </div>

      <div className="question-indicators">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentQuestionIndex ? 'active' : ''} ${
                userAnswers[index] !== undefined ? 'answered' : ''
              }`}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>

      <div className="navigation">
        <button 
          className="nav-btn prev-btn" 
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        

        {currentQuestionIndex === questions.length - 1 ? (
          <button 
            className="nav-btn submit-btn" 
            onClick={handleSubmit}
            disabled={Object.keys(userAnswers).length < questions.length}
          >
            Submit Quiz
          </button>
        ) : (
          <button 
            className="nav-btn next-btn" 
            onClick={handleNext}
          >
            Next
          </button>
        )}
      </div>






    </div>
  );
};

export default QuizComponent; 