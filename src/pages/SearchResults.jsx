import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { hostelsdata } from "../components/data";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../components/context";
import RevealOnScroll from "../components/ui/RevealOnScroll";

const HostelSearchResults = () => {
  const { bookingDetails, setBookingDetails } = useGlobalContext();
  const [hostels, setHostels] = useState(hostelsdata);
  const [searchWord, setSearchWord] = useState("");
  const [moreFiltersVisible, setMoreFiltersVisible] = useState(false);
  const [location, setLocation] = useState("");

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
  const minPrice = Math.min(...hostelsdata.map(calculatePrice));
  const maxPrice = Math.max(...hostelsdata.map(calculatePrice));
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  const handleSearch = () => {
    let filteredData = hostelsdata;

    if (location && location !== "all") {
      filteredData = filteredData.filter(
        (hostel) => hostel.location === location
      );
    }

    if (searchWord) {
      filteredData = filteredData.filter(
        (hostel) =>
          hostel.name.toLowerCase().startsWith(searchWord.toLowerCase()) ||
          hostel.name.includes(searchWord.toLowerCase())
      );
    }

    if (priceRange) {
      filteredData = filteredData.filter(
        (hostel) =>
          calculatePrice(hostel) >= priceRange[0] &&
          calculatePrice(hostel) <= priceRange[1]
      );
    }

    setHostels(filteredData);
    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
      setNoResults(filteredData.length === 0); // If no results, show the no-results message
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
  useEffect(() => {
    const timeout = setTimeout(() => {
      const filteredData = hostelsdata.filter(
        (hostel) =>
          hostel.name.toLowerCase().startsWith(searchWord.toLowerCase()) ||
          hostel.name.includes(searchWord.toLowerCase())
      );
      setHostels(filteredData);
    }, 300); // Debounce for 300ms

    return () => clearTimeout(timeout);
  }, [searchWord]);

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
    setLocation(""); // Clear location filter if needed
    setSearchWord(""); // Clear search input
    setHostels(hostelsdata); // Reset hostels to the original dataset
  };

  return (
    <div className="search-results-container">
      {/* Filters Section */}
      <div className="filters-section">
        <div className="filters-content">
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
          {/* "More Filters" Button */}
          <button
            className="more-filters-button"
            onClick={() => setMoreFiltersVisible(!moreFiltersVisible)}
          >
            {moreFiltersVisible ? "Less Filters" : "More Filters"}
          </button>
          {/* utilize the seach button for a loader to appear when filetersare applied */}
          <button
            className={`search-button ${isSearching ? "searching" : ""}`}
            onClick={handleSearch}
            disabled={isSearching}
          >
            {/* add aloader  to the search aftr filtering*/}
            <FaSearch className="search-icon" />
            {isSearching ? "Searching..." : "Search"}
          </button>
          <button
            className={`search-button`}
            onClick={clearFilters}
            disabled={isSearching}
          >
            Clear filters
          </button>
        </div>

        {/* More Filters Submenu */}
        {moreFiltersVisible && (
          <div className="more-filters">
            {/* Location Filter */}
            <select
              className="more-filter-select"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="all">Select Location</option>
              <option value="Kotei">Kotei</option>
              <option value="Ayeduase">Ayeduase</option>
              <option value="Emina">Emina</option>
              <option value="Boadi">Boadi</option>
              <option value="Campus">Campus</option>
            </select>

            {/* Price Range Filter */}
            <div className="price-range-filter">
              <label>Price Range:</label>
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[0]}
                disabled={isSearching}
                onChange={(e) =>
                  setPriceRange([parseInt(e.target.value), priceRange[1]])
                }
              />
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[1]}
                disabled={isSearching}
                onChange={(e) =>
                  setPriceRange([priceRange[0], parseInt(e.target.value)])
                }
              />
              <span>{`GHC${priceRange[0].toLocaleString()} - GHC${priceRange[1].toLocaleString()}`}</span>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      {!noResults && (
        <div className="results-count">
          <p>{filteredHostels.length} properties found</p>
        </div>
      )}

      {/* Results Grid */}
      {!noResults ? (
        <div className="hostel-grid">
          {filteredHostels.map((hostel, index) => (
            <div key={index} className="hostel-card">
              <RevealOnScroll>
                <div className="hostel-card-image">
                  <img src={hostel.image} alt={hostel.name} srcSet="" />
                </div>
                <div className="hostel-header">
                  <Link to={`/item/${hostel.name}`}>
                    <h2 className="hostel-name">{hostel.name} Hostel</h2>
                    {/* location has to be set based on the filter */}
                    <p className="hostel-location">{hostel.location}</p>
                  </Link>
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
              </RevealOnScroll>
            </div>
          ))}
        </div>
      ) : (
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
    </div>
  );
};

export default HostelSearchResults;
