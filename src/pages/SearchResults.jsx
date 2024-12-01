import React, { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { hostelsdata } from "../components/data";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../components/context";

const HostelSearchResults = () => {
  const { bookingDetails, setBookingDetails } = useGlobalContext();
  const [hostels, setHostels] = useState(hostelsdata);
  const [searchWord, setSearchWord] = useState("");
  // const [filters, setFilters] = useState({
  //   occupancy: "1",
  //   duration: "1 year",
  //   gender: "all",
  // });

  // const [bookingDetails, setBookingDetails] = useState({
  //   roomType: "1 in a room",
  //   duration: 1,
  //   gender: "all",
  // });

  const calculatePrice = (hostel) => {
    if (!hostel?.prices) {
      return 0;
    }
    const priceKey = bookingDetails.roomType;
    const basePrice = hostel.prices[priceKey];
    return basePrice * bookingDetails.duration;
  };
  const [isSearching, setIsSearching] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setNoResults(bookingDetails.gender === "mixed");
    }, 1000);
  };
  const searchHostel = (e) => {
    setSearchWord(e.target.value);
    const filteredData = hostelsdata.filter(
      (hostel) =>
        hostel.name.toLowerCase().startsWith(searchWord.toLowerCase()) ||
        hostel.name.includes(searchWord.toLowerCase())
    );
    setHostels(filteredData);
  };
  const filteredHostels = hostels.filter((hostel) => {
    if (
      bookingDetails.gender !== "all" &&
      hostel.gender !== bookingDetails.gender
    ) {
      return false;
    }
    return true;
  });
  const clearFilters = () => {
    setBookingDetails({
      ...bookingDetails,
      gender: "all",
      roomType: "1 in a room",
      duration: 1,
    });
    setHostels(hostelsdata);
  };

  return (
    <div className="search-results-container">
      {/* Filters Section */}
      <div className="filters-section">
        <div className="filters-content">
          {/* search input to filter based on the searched words */}
          <div className="filter-label">
            <FaFilter className="filter-icon" />
            <span>Filters:</span>
          </div>
          <input
            type="text"
            placeholder="search hostel"
            spellCheck={false}
            onChange={searchHostel}
            value={searchWord}
          />
          <select
            className="filter-select"
            value={bookingDetails.duration}
            onChange={(e) =>
              setBookingDetails({ ...bookingDetails, duration: e.target.value })
            }
          >
            <option value="1">1 Year</option>
            <option value="2">2 Years</option>
            <option value="0.5">6 Months</option>
          </select>

          <select
            className="filter-select"
            value={bookingDetails.roomType}
            onChange={(e) =>
              setBookingDetails({ ...bookingDetails, roomType: e.target.value })
            }
          >
            <option value="1 in a room">1 in a Room</option>
            <option value="2 in a room">2 in a Room</option>
            <option value="3 in a room">3 in a Room</option>
            <option value="4 in a room">4 in a Room</option>
          </select>

          <select
            className="filter-select"
            value={bookingDetails.gender}
            onChange={(e) =>
              setBookingDetails({ ...bookingDetails, gender: e.target.value })
            }
          >
            <option value="all">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="mixed">Mixed</option>
          </select>
          {/* utilize the seach button for a loader to appear when filetersare applied */}
          <button
            className={`search-button ${isSearching ? "searching" : ""}`}
            onClick={handleSearch}
            disabled={isSearching}
          >
            <FaSearch className="search-icon" />
            {isSearching ? "Searching..." : "Search"}
          </button>
          <button
            className={`search-button ${isSearching ? "searching" : ""}`}
            onClick={clearFilters}
            disabled={isSearching}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Results Count */}
      {!noResults && (
        <div className="results-count">
          <p>{filteredHostels.length} properties found</p>
        </div>
      )}

      {/* No Results State */}
      {noResults && (
        <div className="no-results">
          <div className="no-results-content">
            <FaSearch className="no-results-icon" />
            <h3>No Results Found</h3>
            <p>
              We couldn't find any hostels matching your search criteria. Try
              adjusting your filters.
            </p>
          </div>
        </div>
      )}

      {/* Results Grid */}
      {!noResults && (
        <div className="hostel-grid">
          {filteredHostels.map((hostel, index) => (
            <div key={index} className="hostel-card">
              <div className="hostel-card-image">
                <img src={hostel.image} alt={hostel.name} srcSet="" />
              </div>
              <div className="hostel-header">
                <h2 className="hostel-name">{hostel.name} Hostel</h2>
                <p className="hostel-location">{hostel.location}</p>
              </div>
              <div className="hostel-content">
                <div className="price-container">
                  <span className="price">
                    GHC{calculatePrice(hostel).toLocaleString()}
                  </span>
                  {/* name changes to two years if selected filter durtation is 1 year */}
                  <span className="price-period">
                    {bookingDetails.duration == 2
                      ? "2 years"
                      : bookingDetails.duration == 0.5
                      ? "6 months"
                      : "1 year"}
                  </span>
                </div>
                <div className="rating">Rating: {hostel.rating}/5</div>
                <div className="amenities-list">
                  {hostel.amenities.map((amenity, index) => (
                    <span key={index} className="amenity-tag">
                      {amenity}
                    </span>
                  ))}
                </div>
                <Link to={`/checkout/${hostel.name}`}>
                  <button className="book-button">Book Now</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HostelSearchResults;
