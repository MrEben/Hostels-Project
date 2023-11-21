import React from "react";
import CardImg from "../../assets/pexels-ketut-subiyanto-4907208 (FILEminimizer).jpg";
import { AiOutlineArrowUp } from "react-icons/ai";
import "./card.css";
const Card = () => {
  return (
    <>
      <div className="card-ui">
        <div className="heading">
          <h2>
            We have <span>great</span> offers available
          </h2>
          <h1>
            Helping you <span>explore different</span> hostels. Even{" "}
            <span>before</span> you visit the places yourself
          </h1>
          <a className="explore-btn btn" href="#gallery">
            View Catalogue <AiOutlineArrowUp /> <div></div>
          </a>
        </div>
        <div className="card-image">
          <img src={CardImg} alt="" />
        </div>
      </div>
    </>
  );
};

export default Card;
