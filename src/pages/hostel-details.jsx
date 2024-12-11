import React, { useState, useEffect, useRef } from "react";
import { FaWifi, FaUser, FaCoffee, FaClock } from "react-icons/fa";
import Img from "../assets/empty-room-without-furniture-full-seamless-spherical-hdri-panorama-360-degrees-interior-white-loft-r.png";
import "./item.css";

// Google VR Viewer Component
const GoogleVRViewer = ({ image }) => {
  const vrViewRef = useRef(null);

  useEffect(() => {
    if (vrViewRef.current) {
      // Use the element's ID as a CSS selector string instead of passing the DOM element directly
      new VRView.Player(`#${vrViewRef.current.id}`, {
        image: image, // Path to your 360° image
        width: "100%", // Full width
        height: "500px", // Fixed height
        is_stereo: false, // Set to true if using a stereo image
      });
    }
  }, [image]);

  return (
    <div>
      <h2>360° Panorama Viewer</h2>
      <div
        id="vr-view-container"
        ref={vrViewRef}
        style={{ width: "100%", height: "500px" }}
      ></div>
    </div>
  );
};

const HostelDetails = ({ singlehostel }) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample hostel data
  const hostel = {
    id: 1,
    name: "Sunny Side Hostel",
    location: "123 Downtown Street, City Center",
    price: 450,
    rating: 4.5,
    reviews: 128,
    description:
      "Experience comfort and convenience at Sunny Side Hostel. Located in the heart of downtown, we offer modern amenities and a vibrant community atmosphere perfect for long-term stays.",
    amenities: [
      { name: "Free WiFi", icon: <FaWifi className="amenity-icon" /> },
      { name: "24/7 Reception", icon: <FaClock className="amenity-icon" /> },
      { name: "Common Kitchen", icon: <FaCoffee className="amenity-icon" /> },
      { name: "Community Areas", icon: <FaUser className="amenity-icon" /> },
    ],
    rooms: [
      {
        id: 1,
        name: "Single Room",
        panoramaUrl: Img, // Replace with actual panorama image
      },
      {
        id: 2,
        name: "Double Room",
        panoramaUrl: "/api/placeholder/800/400", // Replace with actual panorama image
      },
    ],
  };

  return (
    <div className="single-hostel-details">
      <div className="content-wrapper">
        <nav className="tabs">
          <button
            className={`tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`tab ${activeTab === "virtual-tour" ? "active" : ""}`}
            onClick={() => setActiveTab("virtual-tour")}
          >
            Virtual Tour
          </button>
          <button
            className={`tab ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
        </nav>

        {activeTab === "overview" && (
          <div className="overview-content">
            <div className="info-section">
              <h2>About this Hostel</h2>
              <p>{singlehostel?.description}</p>
            </div>
            <GoogleVRViewer image="https://storage.googleapis.com/vrview/examples/coral.jpg" />
          </div>
        )}

        {activeTab === "virtual-tour" && (
          <div className="virtual-tour">
            <h2>Virtual Room Tours</h2>
            {/* <GoogleVRViewer image="https://storage.googleapis.com/vrview/examples/coral.jpg" /> */}
            {hostel.rooms.map((room) => (
              <div key={room.id} className="room-tour">
                <h3>{room.name}</h3>
                {/* Using Google VR Viewer for each room */}
                {/* <GoogleVRViewer image="https://storage.googleapis.com/vrview/examples/coral.jpg" /> */}
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="reviews-section">
            <h2>Guest Reviews</h2>
            {/* Reviews content */}
          </div>
        )}
      </div>
    </div>
  );
};

export default HostelDetails;
