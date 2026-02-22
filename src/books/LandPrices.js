import React from "react";

const LandPrices = () => {
  const data = [
    ["Nairobi", 69.08],
    ["Mombasa", 27.67],
    ["Kiambu", 11.92],
    ["Kilifi", 8.08],
    ["Kwale", 6.53],
    ["Lamu", 6.50],
    ["Kajiado", 4.51],
    ["Machakos", 4.49],
    ["Kisumu", 3.92],
    ["Uasin Gishu", 3.84],
    ["Nakuru", 3.66],
    ["Muranga", 2.66],
    ["Siaya", 2.08],
    ["Meru", 1.96],
    ["Nandi", 1.95],
    ["Nyeri", 1.91],
    ["Kirinyaga", 1.80],
    ["Nyamira", 1.70],
    ["Embu", 1.54],
    ["Bomet", 1.53],
    ["Trans Nzoia", 1.34],
    ["Kericho", 1.33],
    ["Kakamega", 1.27],
    ["Narok", 1.26],
    ["Vihiga", 1.23],
    ["Isiolo", 1.14],
    ["Nyandarua", 1.14],
    ["Laikipia", 1.13],
    ["Migori", 1.11],
    ["Tharaka Nithi", 1.04],
    ["Marsabit", 1.01],
    ["Makueni", 1.00],
    ["Homa Bay", 0.97],
    ["Taita Taveta", 0.95],
    ["Elgeyo Marakwet", 0.89],
    ["Baringo", 0.84],
    ["Bungoma", 0.82],
    ["Samburu", 0.78],
    ["Kitui", 0.73],
    ["Tana River", 0.64],
    ["Mandera", 0.51],
    ["Busia", 0.47],
    ["Garrissa", 0.45],
    ["Turkana", 0.45],
    ["West Pokot", 0.29],
    ["Wajir", 0.25]
  ];

  return (
    <div className="prices-container">
      <style>
        {`
        .prices-container {
          padding: 24px;
          font-family: Arial, sans-serif;
        }

        .prices-heading {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 20px;
          text-align: center;
          color: #fff;
        }

        .prices-grid {
          display: grid;
          grid-template-columns: 55% 45%;
          gap: 20px;
        }

        .prices-table-wrapper {
          background: linear-gradient(135deg, #5b2cff, #8f3dff);
          border-radius: 8px;
          overflow: hidden;
          color: #fff;
        }

        .prices-table {
          width: 100%;
          border-collapse: collapse;
        }

        .prices-table thead {
          background: rgba(255, 255, 255, 0.15);
        }

        .prices-table th,
        .prices-table td {
          padding: 12px 16px;
          text-align: left;
        }

        .prices-table th {
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .prices-table tbody tr {
          border-top: 1px solid rgba(255, 255, 255, 0.15);
        }

        .prices-table tbody tr:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .prices-side {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: 16px;
        }

        .prices-image {
          width: 80%;
          height: auto;
          background: #e0e0e0;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden; /* 👈 important */
        }

        .prices-image img {
          width: 100%;
          height: auto;
          /* 👈 keeps aspect ratio, fills box */
        }

        .prices-button {
          padding: 12px 20px;
          width: 80%;
          background: #5b2cff;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
        }

        .prices-button:hover {
          background: #4722cc;
        }

        /* Tablet & Mobile */
        @media (max-width: 900px) {
          .prices-grid {
            grid-template-columns: 1fr;
          }
          .prices-button {
          padding: 12px 20px;
          width: 100%;
          background: #5b2cff;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
        }
        .prices-image {
          width: 100%;
          height: auto;
          background: #e0e0e0;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden; /* 👈 important */
        }
        }
        `}
      </style>

      <h2 className="prices-heading">Land Prices by County</h2>

      <div className="prices-grid">
        {/* Table Column */}
        <div className="prices-table-wrapper">
          <table className="prices-table">
            <thead>
              <tr>
                <th>County</th>
                <th>Avg Price per Acre (M)</th>
              </tr>
            </thead>
            <tbody>
              {data.map(([county, price]) => (
                <tr key={county}>
                  <td>{county}</td>
                  <td>{price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Side Column */}
        <div className="prices-side">
          <div className="prices-image">
            <img src="images/land.png" alt="land" />
          </div>
          <button className="prices-button">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default LandPrices;
