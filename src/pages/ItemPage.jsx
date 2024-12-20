import React, { useState, useEffect } from "react";
import "./item.css";
import { FaMapPin, FaStar } from "react-icons/fa";
import Img from "../assets/pexels-ketut-subiyanto-4907181.jpg";
import { room, hostelsdata } from "../components/data";
import { useParams, Link } from "react-router-dom";
import BookingPanel from "../components/ui/bookingpanel";
import { useGlobalContext } from "../components/context";
import HostelDetails from "./hostel-details";

const ItemPage = () => {
  const { id } = useParams();
  const [selectedHostel, setSelectedHostel] = useState({});
  const { bookingDetails, setBookingDetails } = useGlobalContext();
  // http://localhost:5173/item/East%20End what i see in the conslode producing the error
  useEffect(() => {
    const newHostel = hostelsdata.find((item) => item.name == id);
    setSelectedHostel(newHostel);
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
      <div className="others">
        <div className="card">
          <div className="card-header">
            <img src={Img} alt="ballons" />
          </div>
          <div className="card-body">
            <span className={`tag`}>New</span>
            <h3>Spacious room with a serene atmosphere</h3>
            <p>Enjoy your stay</p>
            <div className="user">
              <img src={Img} alt="user" />
              <div className="user-info">
                <h5>Hostel</h5>
                <small>Posted 2days ago</small>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <img src={Img} alt="ballons" />
          </div>
          <div className="card-body">
            <span className={`tag`}>New</span>
            <h3>Spacious room with a serene atmosphere</h3>
            <p>Enjoy your stay</p>
            <div className="user">
              <img src={Img} alt="user" />
              <div className="user-info">
                <h5>Hostel</h5>
                <small>Posted 2days ago</small>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <img src={Img} alt="ballons" />
          </div>
          <div className="card-body">
            <span className={`tag`}>New</span>
            <h3>Spacious room with a serene atmosphere</h3>
            <p>Enjoy your stay</p>
            <div className="user">
              <img src={Img} alt="user" />
              <div className="user-info">
                <h5>Hostel</h5>
                <small>Posted 2days ago</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <AnimatedWebsite /> */}
    </main>
  );
};

export default ItemPage;
