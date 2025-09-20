// // src/components/Home.js
// import { useEffect, useState } from "react";
// import './QuizComponent.css';
// export default function Quiz() {
//   return (
    
    
//     <div id="home" className="page active">
//         <div className="container">
//             <div className="content-wrapper">
//                 <div className="quiz-header">
//                     <h2>Quiz</h2>
//                     <div className="progress">
//                     Question 1 of 20
//                     </div>
//                 </div>
              

//             </div>
//         </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import "./QuizComponent.css";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    fetch("http://127.0.0.1:8000/questions/")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setLoading(false);
      });
  }, []);

  // 🔑 Re-run MathJax whenever questions change
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise();
    }
  }, [questions]);
  
  return (
    <div id="home" className="page active">
      <div className="container">
        <div className="content-wrapper">
          <div className="quiz-header">
            <h2>Quiz</h2>
            <div className="progress">
              Question 1 of {questions.length}
            </div>
          </div>

          <div className="quiz-questions">
            {loading ? (
                <p>Loading questions...</p>
            ) : (
                questions.map((q) => (
                <div key={q.id} className="question-card">
                    <strong>{q.subject} ({q.year})</strong><br />
                    <span dangerouslySetInnerHTML={{ __html: q.text }} />
                </div>
                ))
            )}
            </div>
        </div>
      </div>
    </div>
  );
}

