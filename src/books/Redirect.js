import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Redirect() {
  const { id, slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/books/${id}/${slug}`);
    }, 6000);

    return () => clearTimeout(timer);
  }, [id, slug, navigate]);

  return (
    <>
      <style>
        {`
          .redirect-wrapper {
            min-height: 60vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 14px;
            text-align: center;
            margin-bottom: 20%;
          }

          .redirect-spinner {
            width: 44px;
            height: 44px;
            border: 4px solid rgba(255, 255, 255, 0.28);
            border-top-color: #ffffff;
            border-radius: 50%;
            animation: redirect-spin 0.8s linear infinite;
          }

          @keyframes redirect-spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

      <div className="redirect-wrapper">
        <h2>Redirecting...</h2>
        <div className="redirect-spinner" aria-label="Loading" />
      </div>
    </>
  );
}

export default Redirect;
