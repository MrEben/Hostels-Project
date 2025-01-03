import React from "react";
import { hostelsdata } from "../data";
import { FaInstagram, FaOpencart } from "react-icons/fa";
import "./gallery.css";
import { Link } from "react-router-dom";
import RevealOnScroll from "../ui/RevealOnScroll";

const Gallery = () => {
  return (
    <div className="hostels-display container" id="gallery">
      <div className="gallery-heading ">
        <h1>Get inspired</h1>
        <p>Discover popular hostels in and around KNUST campus</p>
      </div>

      <div className="gallery">
        {hostelsdata.map((item, index) => {
          return (
            <div className="gallery-innerbox" key={index}>
              <RevealOnScroll>
                <img src={item.image} alt="" />
                <div className="hostel-name">
                  <h4>{item.name}</h4>
                </div>
                <div className="inner-text">
                  <Link to={`/item/${item.name}`} className="single-item btn">
                    Open <FaOpencart />
                  </Link>
                </div>
                <div className="instagramlink">
                  <FaInstagram />
                  <a href="">{item.instagram ? item.instagram : ""}</a>
                </div>
              </RevealOnScroll>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
