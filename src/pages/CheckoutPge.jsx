import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { hostelsdata } from "../components/data";
import PaymentInterface from "../components/ui/Paymentpanel";
import { useGlobalContext } from "../components/context";

const CheckoutPage = () => {
  const { bookingDetails, setBookingDetails } = useGlobalContext();
  const { id } = useParams();
  const [hostel, setHostel] = useState([]);

  useEffect(() => {
    // Decode the URL parameter to handle any encoding
    const decodedId = decodeURIComponent(id);

    const selectedHostel = hostelsdata.find((item) => {
      // Case-insensitive comparison and trim any whitespace
      return item.name.trim().toLowerCase() === decodedId.trim().toLowerCase();
    });
    setHostel(selectedHostel || null);
  }, [id]);

  const calculatePrice = () => {
    if (!hostel?.prices) {
      return 0;
    }
    const priceKey = bookingDetails.roomType;
    const basePrice = hostel.prices[priceKey];
    return basePrice * bookingDetails.duration;
  };

  const tax = 10;
  const subtotal = calculatePrice();
  const total = subtotal + tax;

  return (
    <div className="checkout-page">
      <div className="model">
        <div className="room">
          <div className="text-cover">
            <h1>{hostel.name} Hostel</h1>
            <p className="price">
              <span>GHC</span>
              {calculatePrice().toLocaleString()} / {bookingDetails.duration}{" "}
              Year
              {bookingDetails.duration > 1 ? "s" : ""}
            </p>
            <hr />
            <p>
              {bookingDetails.roomType} for {bookingDetails.duration} year
              {bookingDetails.duration > 1 ? "s" : ""}
            </p>
            <p>
              {new Date().toLocaleDateString()} to{" "}
              {new Date(
                new Date().setFullYear(
                  new Date().getFullYear() + bookingDetails.duration
                )
              ).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="payment">
          <div className="receipt-box">
            <h3>Receipt Summary</h3>
            <table className="table">
              <tbody>
                <tr>
                  <td>
                    {bookingDetails.roomType} for {bookingDetails.duration} year
                    {bookingDetails.duration > 1 ? "s" : ""}
                  </td>
                  <td>GHC {subtotal.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Discount</td>
                  <td>GHC 0</td>
                </tr>
                <tr>
                  <td>Subtotal</td>
                  <td>GHC {subtotal.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Tax</td>
                  <td>{tax} GHC</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>Total</td>
                  <td>GHC {total.toLocaleString()} </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <PaymentInterface />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
