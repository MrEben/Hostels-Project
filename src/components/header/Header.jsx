import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import arrow icons
import "swiper/css";
import "./header.css";
import { AiFillCode } from "react-icons/ai";
import Gallery from "../gallery/Gallery";
import Card from "../ui/card";
import Discover from "../discover/Discover";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useSwiper } from "swiper/react";
import { hostelsdata } from "../data";
import BookingPanel from "../ui/bookingpanel";
import { Link } from "react-router-dom";
import RevealOnScroll from "../ui/RevealOnScroll";

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
            {hostelsdata.map((item, index) => {
              const { image, name, ratings } = item;
              return (
                <SwiperSlide key={index}>
                  <div>
                    <RevealOnScroll>
                      <img src={image} alt="" />
                    </RevealOnScroll>
                    <div className="text">
                      <h3>{name} Hostel</h3>
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
          <RevealOnScroll>
            <h1>
              We provide you with <span>exclusive hostels</span>
            </h1>
          </RevealOnScroll>
          <p>
            Visit our array of unique and exclusive hoastels which provide you
            with accomodation at affordable rates. We are a proud and verified
            company entrusted by all people accross the world.
          </p>
          <a href="">Learn more</a>
          <BookingPanel />

          <Link to="search">
            <button className="btn">Check Availability</button>
          </Link>
        </div>
      </header>
      <Gallery />
      <Card />
      <Discover />
    </>
  );
};

export default Header;
