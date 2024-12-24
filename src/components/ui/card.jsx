import React, { useEffect, useState } from "react";
import CardImg from "../../assets/pexels-ketut-subiyanto-4907208 (FILEminimizer).jpg";
import { AiOutlineArrowUp } from "react-icons/ai";
import "./card.css";
import RevealOnScroll from "./RevealOnScroll";
const Card = () => {
  return (
    <>
      <div className="card-ui ">
        <RevealOnScroll>
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
        </RevealOnScroll>
        <div className="card-image">
          <img src={CardImg} alt="" />
        </div>
      </div>
    </>
  );
};
<style>
  {`
  .hidden {
    opacity: 0;
    filter: blur(5px);
    transform: translateX(-100%);
    transition: all 1s;
  }

  .show {
    opacity: 1;
    filter: blur(0);
    transform: translateX(0);
  }

  @media (prefers-reduced-motion) {
    .hidden {
      transition: none;
    }
  }

  @media (max-width: 768px) {
    .services-grid {
      grid-template-columns: 1fr;
    }
  }
`}
</style>;
export default Card;
