import React, { useState, useEffect } from "react";
import "./item.css";
import {
  AiFillStar,
  AiOutlineWifi,
  AiFillSwitcher,
  AiFillCloud,
  AiFillClockCircle,
} from "react-icons/ai";
import Img from "../assets/pexels-ketut-subiyanto-4907181.jpg";
import { room, hostelsdata } from "../components/data";
import { useParams, Link } from "react-router-dom";
import BookingPanel from "../components/ui/bookingpanel";
import { useGlobalContext } from "../components/context";

const ItemPage = () => {
  const { id } = useParams();
  const [selectedHostel, setSelectedHostel] = useState({});
  const { setBookingDetails } = useGlobalContext();

  useEffect(() => {
    const newHostel = hostelsdata.find((item) => item.name == id);
    setSelectedHostel(newHostel);
  }, [id]);

  const handleBookingChange = (details) => {
    setBookingDetails(details);
  };
  return (
    <main className="items-page">
      <div className="hostel-details">
        <div className="details">
          <div className="left">
            <h1>{selectedHostel?.name} Hostel</h1>
            <div className="ratings">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
            </div>
            <div className="hostel-desc">
              A place where you'll feel the most comfortable
            </div>
            <h3>Hostel Accomodation comes with:</h3>
            {/* <div className="offers">
              <div className="each-offer">
                <AiOutlineWifi />
                Free WiFi
              </div>
              <div className="each-offer">
                <AiFillSwitcher />
                Pool
              </div>
              <div className="each-offer">
                <AiFillCloud />
                Free WiFi
              </div>
              <div className="each-offer">
                <AiFillClockCircle />
                Free WiFi
              </div>
            </div> */}
            <div className="amenities-list">
              {/* {Object.keys(selectedHostel.amenities)} */}
              {/* {selectedHostel.amenities} */}
              {selectedHostel.amenities?.map((amenity, index) => (
                <span key={index} className="amenity-tag">
                  {amenity}
                </span>
              ))}
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
        <div className="rooms">
          {room.map((item, index) => {
            return <img key={index} src={item} alt="" />;
          })}
        </div>
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
    </main>
  );
};

export default ItemPage;
