import React, { useState } from "react";
import { useGlobalContext } from "../context";

const BookingPanel = ({ hostelData, onBookingChange }) => {
  const { bookingDetails, setBookingDetails } = useGlobalContext();

  return (
    <div>
      <div className="booking">
        <div>
          <select
            name="roomType"
            value={bookingDetails.roomType}
            onChange={(e) =>
              setBookingDetails({ ...bookingDetails, roomType: e.target.value })
            }
          >
            <option value="1 in a room">One in a room</option>
            <option value="2 in a room">Two in a room</option>
            <option value="3 in a room">Three in a room</option>
            <option value="4 in a room">Four in a room</option>
          </select>
        </div>
        <div>
          <select
            name="duration"
            value={bookingDetails.duration}
            onChange={(e) =>
              setBookingDetails({ ...bookingDetails, duration: e.target.value })
            }
          >
            <option value={1}>One year</option>
            <option value={2}>Two years</option>
          </select>
        </div>
        <div>
          <select
            name="gender"
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
        </div>
      </div>
    </div>
  );
};

export default BookingPanel;
