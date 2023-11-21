// import React, { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import arrow icons
// Import Swiper styles
import "swiper/css";
import "./header.css";
import { AiFillCode } from "react-icons/ai";
import { hostels } from "./data";
import Gallery from "../gallery/Gallery";
import Card from "../ui/card";
import Discover from "../discover/Discover";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useSwiper } from "swiper/react";

const swiperParams = {
  modules: [Autoplay, Navigation, Pagination],
  spaceBetween: 30,
  slidesPerView: 1,
  autoplay: { delay: 2500, disableOnInteraction: false },
};

const SwiperNavButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="swiper-nav-btns">
      <div className="swiper-controls">
        <FaArrowLeft onClick={() => swiper.slidePrev()} />
        <FaArrowRight onClick={() => swiper.slideNext()} />
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <>
      <header>
        <div className="header-left">
          <Swiper {...swiperParams}>
            {hostels.map((item, index) => {
              const { img, hostelName, ratings } = item;
              return (
                <SwiperSlide key={index}>
                  <div>
                    <img src={img} alt="" />
                    <div className="text">
                      <h3>{hostelName}</h3>
                      <h4>{ratings}</h4>
                    </div>
                  </div>
                  <SwiperNavButtons />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="header-right">
          <AiFillCode />
          <h1>
            We provide you with the <span>best hostels</span>
          </h1>
          <p>
            Visit our array of unique and exclusive hoastels which provides you
            with accomodation at affordable rates. We are a proud and verified
            company entrusted by all people accross the world.
          </p>
          <a href="">Learn more</a>
          <div className="booking">
            <div>
              <select name="Please select room type" id="">
                <option value="room">One in a room</option>
                <option value="room">Two in a room</option>
                <option value="room">Three in a room</option>
                <option value="room">Four in a room</option>
              </select>
            </div>
            <div>
              <select name="Duration" id="">
                <option value="room">One year</option>
                <option value="room">Two years</option>
              </select>
            </div>
            <div>
              <select name="Gender" id="">
                <option value="room">Male</option>
                <option value="room">Female</option>
              </select>
            </div>
          </div>
          <button className="btn">Book Room</button>
        </div>
      </header>
      <Gallery />
      <Card />
      <Discover />
    </>
  );
};

export default Header;
