// src/components/Home.js
import { Link } from 'react-router-dom';



export default function Study() {

  

  return (
    <div id="home" className="page active">
        <div className="container">
            <div className="content-wrapper">

                 {/* <h2>{level.toUpperCase()} Units</h2>                */}

                <section className="features1">
                    {/* <Link to="/kcse" style={{ textDecoration: 'none', color: 'inherit' }} >
                    <div className="feature-card glass">
                        <div className="feature-icon">✨</div>
                        <h3>Foundational</h3>
                        <p>Download past papers with marking schemes on all examinable subjects. Take auto marked quizzes to boost your revision.</p>
                    </div>
                    </Link> */}

        
                    <Link
                
                    to={`/cpa/home`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    >
                    <div className="feature-card glass">
                        <div className="feature-icon">📘</div>
                        <h3>CPA</h3>
                        <p>
                        Access past papers with marking schemes on all examinable subjects. Take auto marked quizzes to boost your revision.
                        </p>
                    </div>
                    </Link>

                    
          


                </section>
            </div>
        </div>
    </div>
  );
}
