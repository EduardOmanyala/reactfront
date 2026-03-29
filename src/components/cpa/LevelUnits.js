// src/components/Home.js
import { useParams } from "react-router-dom";
import { Link, Navigate } from 'react-router-dom';
import { cpaLevels } from "./cpaData";
import "./Cpa.css";


export default function LevelUnits() {

  const { level } = useParams();

  const units = cpaLevels[level];

  if (!units) {
    return <h3>Level not found</h3>;
  }   

  return (
    <div id="home" className="page active">
        <div className="container">
            <div className="content-wrapper">

                        

                <section className="features">
                    {/* <Link to="/kcse" style={{ textDecoration: 'none', color: 'inherit' }} >
                    <div className="feature-card glass">
                        <div className="feature-icon">✨</div>
                        <h3>Foundational</h3>
                        <p>Download past papers with marking schemes on all examinable subjects. Take auto marked quizzes to boost your revision.</p>
                    </div>
                    </Link> */}

                    {units.map((unit, index) => (
                    <Link
                    key={index}
                    to={`/level/${level}/${unit.slug}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    >
                    <div className="feature-card glass">
                        <div className="feature-icon">📘</div>
                        <h3>{unit.name}</h3>
                        <p>
                        Access notes, past papers, and quizzes for {unit.name}.
                        </p>
                    </div>
                    </Link>
                     ))}





            
                </section>
            </div>
        </div>
    </div>
  );
}
