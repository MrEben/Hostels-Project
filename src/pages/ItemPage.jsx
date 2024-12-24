import React, { useState, useEffect } from "react";
import "./item.css";
import { FaMapPin, FaStar } from "react-icons/fa";
import Img from "../assets/pexels-ketut-subiyanto-4907181.jpg";
import { room, hostelsdata } from "../components/data";
import { useParams, Link } from "react-router-dom";
import BookingPanel from "../components/ui/bookingpanel";
import { useGlobalContext } from "../components/context";
import HostelDetails from "./hostel-details";
import RevealOnScroll from "../components/ui/RevealOnScroll";

const ItemPage = () => {
  const { id } = useParams();
  const [selectedHostel, setSelectedHostel] = useState({});
  const { bookingDetails, setBookingDetails } = useGlobalContext();

  // Store the encoded id into local storage
  useEffect(() => {
    if (id) {
      const encodedId = encodeURIComponent(id);
      localStorage.setItem("storedHostelId", encodedId);
    }
  }, [id]);

  useEffect(() => {
    const encodedId = localStorage.getItem("storedHostelId");
    if (encodedId) {
      const decodedId = decodeURIComponent(encodedId);
      const newHostel = hostelsdata.find((item) => item.name === decodedId);
      setSelectedHostel(newHostel);
    }
  }, [id]);

  const handleBookingChange = (details) => {
    setBookingDetails(details);
  };
  const calculatePrice = () => {
    if (!selectedHostel?.prices) {
      return 0;
    }
    const priceKey = bookingDetails.roomType;
    const basePrice = selectedHostel.prices[priceKey];
    return basePrice * bookingDetails.duration;
  };

  const subtotal = calculatePrice();
  return (
    <main className="items-page">
      <div className="hostel-details">
        <div className="details">
          <RevealOnScroll>
            <div className="left">
              <h1>{selectedHostel?.name} Hostel</h1>
              <div className="location">
                <FaMapPin className="location-icon" />
                <span>{selectedHostel?.location}</span>
              </div>
              {/* work on this to display proper ratings */}
              <div className="ratings">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <div className="hostel-desc">
                A place where you'll feel the most comfortable
              </div>
              <h3>Hostel Accomodation comes with:</h3>

              <div className="amenities-list">
                {selectedHostel.amenities?.map((amenity, index) => (
                  <span key={index} className="amenity-tag">
                    {amenity}
                  </span>
                ))}
              </div>
              <div>
                <span className="price">GHC{subtotal.toLocaleString()} </span>
                <span className="price-period">
                  for{" "}
                  {bookingDetails.duration == 2
                    ? "2 years"
                    : bookingDetails.duration == 0.5
                    ? "6 months"
                    : "1 year"}
                </span>
              </div>
              <BookingPanel
                hostelData={hostelsdata.find((item) => item.name === id)}
                onBookingChange={handleBookingChange}
              />

              <Link to={`/checkout/${selectedHostel?.name}`}>
                <button className="btn">Book Room</button>
              </Link>
            </div>
          </RevealOnScroll>
          <div className="right">
            <img src={selectedHostel?.image} alt="" />
          </div>
        </div>
        <HostelDetails singlehostel={selectedHostel} />
        {/* <div className="rooms">
          {room.map((item, index) => {
            return <img key={index} src={item} alt="" />;
          })}
        </div> */}
      </div>
      <RevealOnScroll>
        <div className="packages">
          <div className="packages-head">
            <h2>Offers</h2>
            <h3>We have special offers that suit your needs</h3>
          </div>
          <section>
            <div className="left-packages">
              <div className="text">
                <h3>Explore our unique hostels</h3>
                <h4>Browse hostels which allows part/full payment options</h4>
              </div>
              <div className="img">
                <img src={Img} alt="img here" />
              </div>
            </div>
            <div className="right-packages">
              <div className="text">
                <h3>Explore our unique hostels</h3>
                <h4>Browse hostels which allows part/full payment options</h4>
              </div>
              <div className="img">
                <img src={Img} alt="img here" />
              </div>
            </div>
          </section>
        </div>
      </RevealOnScroll>
      <div className="others">
        <div className="others">
          {[
            {
              id: 1,
              title: "Spacious room with a serene atmosphere",
              description: "Enjoy your stay",
              tag: "New",
              posted: "Posted 2 days ago",
              img: Img,
            },
            {
              id: 2,
              title: "Comfortable living spaces with modern amenities",
              description: "Perfect for students",
              tag: "New",
              posted: "Posted 3 days ago",
              img: Img,
            },
            {
              id: 3,
              title: "Affordable rooms with excellent service",
              description: "Book now and save",
              tag: "New",
              posted: "Posted 4 days ago",
              img: Img,
            },
          ].map((card) => (
            <div className="card" key={card.id}>
              <div className="card-header">
                <img src={card.img} alt="Ballons" />
              </div>
              <div className="card-body">
                <span className="tag">{card.tag}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <div className="user">
                  <img src={card.img} alt="User" />
                  <div className="user-info">
                    <h5>Hostel</h5>
                    <small>{card.posted}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <AnimatedWebsite /> */}
    </main>
  );
};

export default ItemPage;
