import React from "react";
import "./Spinner.css";

function Spinner() {
  return (
    <div className="load-wrapp">
      <div className="load">
        <div className="square-holder">
          <div className="square"></div>
        </div>
      </div>
    </div>
  );
}

export default Spinner;
