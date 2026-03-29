import React from "react";
import "./Cpa.css";

const Cpa = () => {
  return (
    <div className="menudiv676">
      <div className="menuitem676">
        <label className="menulabel676">Year:</label>
        <select className="menuselect676">
          <option>2023</option>
          <option>2022</option>
        </select>
      </div>

      <div className="menuitem676">
        <label className="menulabel676">Subject:</label>
        <select className="menuselect676">
          <option>Mathematics</option>
          <option>English</option>
        </select>
      </div>

      <div className="menuitem676">
        <label className="menulabel676">Paper Type:</label>
        <select className="menuselect676">
          <option>Paper 1</option>
          <option>Paper 2</option>
        </select>
      </div>

      <div className="menubtncontainer676">
        <button className="searchbtn676">Search Questions</button>
        <button className="resetbtn676">Reset</button>
      </div>
    </div>
  );
};

export default Cpa;