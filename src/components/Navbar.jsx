import React from "react";
import "../styles/navbarStyle.css";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <a href="">Awesome Products</a>
          <div className="navigations">
           <a href="/">Home</a>
           <a href="/about">About</a>
           <a href="/services">Services</a>
           <a href="/contact">Contact</a>
           <a href="/support">Support</a>
          </div>
      </div>
    </>
  );
};

export default Navbar;
