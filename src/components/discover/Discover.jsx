import React from "react";
import "./discover.css";
import { packages } from "../data";
import Flip from "../ui/Flip";

const Discover = () => {
  return (
    <>
      <div className="discover">
        <div className="discover-content container">
          <div className="discover-heading">
            <h1>Hostel tips and tricks</h1>
            <p>Tips from hostel managers and managresses</p>
          </div>

          <div className="discover-text">
            {packages.map((item) => {
              const { id, question, answer } = item;
              return <Flip key={id} question={question} answer={answer} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Discover;
