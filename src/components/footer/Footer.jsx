import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>
              Location: Choco Avenue
              <br />
              Phone: +233 65 617 7263
              <br />
              Email: info@busyentertainment.com
            </p>
          </div>
          <div className="footer-section">
            <h3>Permalinks</h3>
            <ul>
              <li>Busy Access</li>
              <li>My Account</li>
              <li>Get Artifacts</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Newsletter</h3>
            <div className="newsletter-form">
              <input type="email" placeholder="Email Address" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
