/* eslint-disable no-unused-vars */
import React from "react";
import "./nav.css";
import {
  AiOutlineUser,
  AiFillBell,
  AiFillAccountBook,
  // AiFillBook,
} from "react-icons/ai";
import { FaCartPlus, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav>
        <div className="nav-bar">
          <ul>
            <Link to="/" className="logo">
              <FaHome />
              <h2>
                Busy<span className="danger">Dev</span>
              </h2>
            </Link>

            <div className="app-links">
              <AiOutlineUser />
              <AiFillBell />
              <FaCartPlus />
              <div>
                <a to="">
                  <h4>
                    <AiFillAccountBook />
                    <span>Get the App</span>
                  </h4>
                </a>
              </div>
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
