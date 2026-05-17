// src/components/Home.js
import { Link } from 'react-router-dom';


export default function Markets() {

  return (
    <div id="home" className="page active">
        <div className="container">
            <div className="content-wrapper">
               

                <section className="features1">
                    <Link to="/finance/mmf/kenya" style={{ textDecoration: 'none', color: 'inherit' }} >
                    <div className="feature-card glass">
                        <div className="feature-icon">✨</div>
                        <h3>MMF</h3>
                        <p>The latest news. Rate changes. Estimate returns and compare different providers to find what best for you.</p>
                    </div>
                    </Link>

                    <Link to="/finance/special/funds/" style={{ textDecoration: 'none', color: 'inherit' }} >
                    <div className="feature-card glass">
                        <div className="feature-icon">✨</div>
                        <h3>Special Funds</h3>
                        <p>The latest news. Rate changes. Estimate returns and compare different providers to find what best for you.</p>
                    </div>
                    </Link>
                 
                  
                    
                                   
                </section>
            </div>
        </div>
    </div>
  );
}
