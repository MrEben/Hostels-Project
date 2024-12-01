import React, { useEffect, useState } from "react";
import "./footer.css";
import Img from "../../assets/Pexels.png";
import Img2 from "../../assets/icons8-menu-78.png";
const Appa = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="new">
      <div id="search-section">
        <div className="search">
          <h1 className="search-header">
            Become the best in your field. Master any Subject Today!
          </h1>
          <form id="search-form" onSubmit={handleSearch}>
            <input
              className="search-bar"
              placeholder="Search for free photos"
              type="text"
            />
            <button className="search-button" type="submit">
              <img src="images/search-icon-png-9966.png" alt="Search" />
            </button>
          </form>
          <p class="trending">
            <span>Trending:</span> <span>ocean</span>, <span>animal</span>,
            <span>dark</span>, <span>nature</span>
          </p>
        </div>
      </div>

      <div id="tabs">
        <a>Home</a>
        <a>Videos</a>
        <a>Leaderboard</a>
        <a>Challenges</a>
        <a>Challenges</a>
        <a>Challenges</a>
      </div>
    </div>
  );
};

export default Appa;
