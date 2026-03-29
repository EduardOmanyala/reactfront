import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import { cpaLevels } from "./cpaData";
import "./Cpa.css";
import BASE_URL from "../../Config";

function UnitDetail() {
  const { level, unitSlug } = useParams();

  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  const units = cpaLevels[level];
  const unit = units?.find((u) => u.slug === unitSlug);

  // ✅ Hook must be here (before any return)
  useEffect(() => {
    if (!unitSlug) return;

    setLoading(true);

    fetch(`${BASE_URL}/cpa/papers/${unitSlug}/`)
      .then((res) => res.json())
      .then((data) => {
        setPapers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [unitSlug]);

  // ✅ Now safe to return conditionally
  if (!units) {
    return <h3 >Level not found</h3>;
  }

  if (!unit) {
    return <h3>Unit not found</h3>;
  }

  return (
    <div>
      <h2 className="units-heading">{unit.name}</h2>

      {loading && <p>Loading papers...</p>}

      {!loading && papers.length === 0 && (
        <p>No papers available for this unit.</p>
      )}
       <section className="features1">

 
       {papers.map((paper, index) => (
      <Link to={`/cpa/questions/${paper.id}`} key={index} style={{ textDecoration: "none" }}>
    <div className="feature-card glass">
      <div className="feature-icon">📄</div>
      <h3>{paper.year} - {paper.month}</h3>
      <p>{paper.course.toUpperCase()} Paper</p>
    </div>
      </Link>
    ))}

        </section>
  

    </div>
  );
}

export default UnitDetail;