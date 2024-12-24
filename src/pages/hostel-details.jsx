import React, { useState, useEffect, useRef } from "react";
import { FaWifi, FaUser, FaCoffee, FaClock } from "react-icons/fa";
import Img from "../assets/empty-room-without-furniture-full-seamless-spherical-hdri-panorama-360-degrees-interior-white-loft-r.png";
import "./item.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const HostelDetails = ({ singlehostel }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = L.map(mapRef.current).setView(
        singlehostel?.coordinates || [6.6929, -1.5646], // Default to London if no coordinates
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(singlehostel?.coordinates || [6.6929, -1.5646])
        .addTo(map)
        .bindPopup(`<b>${singlehostel?.name}</b><br>${singlehostel?.location}`)
        .openPopup();

      return () => map.remove(); // Cleanup map instance on component unmount
    }
  }, [singlehostel]);
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
            Virtual Tour <span className="newBadge">NEW</span>
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
            <div className="map-section">
              <h2>Locate this Hostel</h2>
              <div
                id="map"
                ref={mapRef}
                style={{ width: "100%", height: "400px", borderRadius: "8px" }}
              ></div>
            </div>
          </div>
        )}

        {activeTab === "virtual-tour" && (
          <div className="virtual-tour">
            <h2>Virtual Room Tours</h2>
            {singlehostel?.paranoma ? (
              <div className="room-tours">
                {Object.entries(singlehostel.paranoma).map(
                  ([roomType, url]) => (
                    <div key={roomType} className="room-tour">
                      <h3>{roomType.replace("-", " ").toUpperCase()}</h3>
                      <iframe
                        width="600"
                        height="400"
                        allowFullScreen
                        src={`https://cdn.pannellum.org/2.5/pannellum.htm#panorama=${encodeURIComponent(
                          url
                        )}&title=${encodeURIComponent(
                          singlehostel.name
                        )} Hostel&autoRotate=2`}
                      />
                    </div>
                  )
                )}
              </div>
            ) : (
              <p>No panorama available for this hostel.</p>
            )}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="reviews-section">
            <h2>Guest Reviews</h2>
            <div className="review">
              <p className="review-text">
                "The hostel is amazing! The staff were super friendly, and the
                rooms were clean and comfortable. The location is perfect for
                students. Highly recommended!"
              </p>
              <p className="review-author">- Akosua B.</p>
            </div>
            <div className="review">
              <p className="review-text">
                "Affordable and well-maintained. I loved the common kitchen and
                the free Wi-Fi. A great place for anyone staying in Kumasi."
              </p>
              <p className="review-author">- Kwame O.</p>
            </div>
            <div className="review">
              <p className="review-text">
                "The hostel exceeded my expectations! The amenities were
                top-notch, and the atmosphere was really welcoming."
              </p>
              <p className="review-author">- Nana A.</p>
            </div>
            <div className="review">
              <p className="review-text">
                "I stayed here for six months, and it was a great experience.
                The staff were always available to help, and the security was
                excellent."
              </p>
              <p className="review-author">- Yaa K.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostelDetails;
