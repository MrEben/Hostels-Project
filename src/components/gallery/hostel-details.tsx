import React, { useState } from 'react';
import { MapPin, Star, Wifi, Users, CoffeeIcon, Clock } from 'lucide-react';

const HostelDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample hostel data
  const hostel = {
    id: 1,
    name: "Sunny Side Hostel",
    location: "123 Downtown Street, City Center",
    price: 450,
    rating: 4.5,
    reviews: 128,
    description: "Experience comfort and convenience at Sunny Side Hostel. Located in the heart of downtown, we offer modern amenities and a vibrant community atmosphere perfect for long-term stays.",
    amenities: [
      { name: "Free WiFi", icon: <Wifi className="amenity-icon" /> },
      { name: "24/7 Reception", icon: <Clock className="amenity-icon" /> },
      { name: "Common Kitchen", icon: <CoffeeIcon className="amenity-icon" /> },
      { name: "Community Areas", icon: <Users className="amenity-icon" /> }
    ],
    rooms: [
      {
        id: 1,
        name: "Single Room",
        panoramaUrl: "/api/placeholder/800/400" // Replace with actual panorama image
      },
      {
        id: 2,
        name: "Double Room",
        panoramaUrl: "/api/placeholder/800/400" // Replace with actual panorama image
      }
    ]
  };

  return (
    <div className="hostel-details">
      <div className="hero-section">
        <h1>{hostel.name}</h1>
        <div className="location">
          <MapPin className="location-icon" />
          <span>{hostel.location}</span>
        </div>
      </div>

      <div className="content-wrapper">
        <nav className="tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab ${activeTab === 'virtual-tour' ? 'active' : ''}`}
            onClick={() => setActiveTab('virtual-tour')}
          >
            Virtual Tour
          </button>
          <button 
            className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </nav>

        {activeTab === 'overview' && (
          <div className="overview-content">
            <div className="info-section">
              <h2>About this Hostel</h2>
              <p>{hostel.description}</p>
              
              <div className="stats">
                <div className="stat">
                  <Star className="stat-icon" />
                  <span>{hostel.rating} ({hostel.reviews} reviews)</span>
                </div>
                <div className="stat">
                  <span className="price">${hostel.price}</span>
                  <span className="period">per month</span>
                </div>
              </div>

              <h3>Amenities</h3>
              <div className="amenities">
                {hostel.amenities.map((amenity, index) => (
                  <div key={index} className="amenity">
                    {amenity.icon}
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'virtual-tour' && (
          <div className="virtual-tour">
            <h2>Virtual Room Tours</h2>
            {hostel.rooms.map((room) => (
              <div key={room.id} className="room-tour">
                <h3>{room.name}</h3>
                <div className="pannellum-container">
                  <div 
                    id={`panorama-${room.id}`} 
                    className="pannellum-viewer"
                  >
                    <script>{`
                      pannellum.viewer('panorama-${room.id}', {
                        type: 'equirectangular',
                        panorama: '${room.panoramaUrl}',
                        autoLoad: true,
                        compass: true,
                        northOffset: 247.5,
                        preview: '${room.panoramaUrl}',
                        mouseZoom: false
                      });
                    `}</script>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="reviews-section">
            <h2>Guest Reviews</h2>
            {/* Reviews content */}
          </div>
        )}
      </div>

      <style jsx>{`
        .hostel-details {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
        }

        .hero-section {
          margin-bottom: 32px;
          text-align: center;
        }

        .hero-section h1 {
          font-size: 32px;
          margin-bottom: 8px;
        }

        .location {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #666;
        }

        .location-icon {
          width: 16px;
          height: 16px;
        }

        .content-wrapper {
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .tabs {
          display: flex;
          border-bottom: 1px solid #eee;
          padding: 0 16px;
        }

        .tab {
          padding: 16px 24px;
          border: none;
          background: none;
          cursor: pointer;
          color: #666;
          font-weight: 500;
          position: relative;
        }

        .tab.active {
          color: #2563eb;
        }

        .tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: #2563eb;
        }

        .overview-content,
        .virtual-tour,
        .reviews-section {
          padding: 24px;
        }

        .info-section h2 {
          font-size: 24px;
          margin-bottom: 16px;
        }

        .info-section p {
          color: #444;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .stats {
          display: flex;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .stat-icon {
          width: 16px;
          height: 16px;
          color: #eab308;
        }

        .price {
          font-size: 24px;
          font-weight: bold;
        }

        .period {
          color: #666;
        }

        .amenities {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
        }

        .amenity {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .amenity-icon {
          width: 16px;
          height: 16px;
          color: #2563eb;
        }

        .pannellum-container {
          margin: 16px 0;
          border-radius: 8px;
          overflow: hidden;
        }

        .pannellum-viewer {
          width: 100%;
          height: 400px;
        }

        @media (max-width: 768px) {
          .tabs {
            padding: 0;
          }

          .tab {
            padding: 12px 16px;
            font-size: 14px;
          }

          .stats {
            flex-direction: column;
            gap: 16px;
          }

          .amenities {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Add Pannellum CSS and JS */}
      <style jsx global>{`
        @import 'https://cdnjs.cloudflare.com/ajax/libs/pannellum-react/1.2.4/styles/pannellum.css';
      `}</style>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pannellum-react/1.2.4/pannellum.js"></script>
    </div>
  );
};

export default HostelDetails;
