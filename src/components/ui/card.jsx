import React, { useEffect, useState } from "react";
import CardImg from "../../assets/pexels-ketut-subiyanto-4907208 (FILEminimizer).jpg";
import { AiOutlineArrowUp } from "react-icons/ai";
import "./card.css";
const Card = () => {
  const [animatedElements, setAnimatedElements] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedElements.has(entry.target.id)) {
            entry.target.classList.add("show");
            setAnimatedElements((prev) => new Set([...prev, entry.target.id]));
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((el, index) => {
      if (!el.id) {
        el.id = `animate-${index}`;
      }
      observer.observe(el);
    });

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, [animatedElements]);
  return (
    <>
      <div className="card-ui ">
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
