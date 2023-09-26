import React from "react";
import {
  AiFillFacebook,
  AiFillMail,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";
import { NavLink } from "react-router-dom";

import ScrollToTopButton from "../utilities/ScrollToTopButton";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
<div className="bg-base-300">
<footer className="mx-auto w-[90%] footer justify-between py-10 bg-base-300 text-base-content">
  <nav>
    <header className="footer-title">Categories</header> 
    <a className="link link-hover">All Categories</a> 
    <a className="link link-hover">Sneakers</a> 
    <a className="link link-hover">Hoodies</a> 
    <a className="link link-hover">Toys</a>
    <a className="link link-hover">Shirts</a>
  </nav> 
  <nav>
    <header className="footer-title">Navigation</header> 
    <a className="link link-hover">Home</a> 
    <a className="link link-hover">Shop</a> 
    <a className="link link-hover">Cart</a> 
    <a className="link link-hover">Register</a>
    <a className="link link-hover">Login</a>
  </nav> 
  <nav>
    <header className="footer-title">Social</header> 
    <div className="grid grid-flow-col gap-4">
      <a className="cursor-pointer"><FaFacebook size="30"/></a>
      <a className="cursor-pointer"><FaTwitter size="30"/></a>
      <a className="cursor-pointer"><FaInstagram size="30"/></a>
    </div>
  </nav>
</footer>

<footer className="footer footer-center p-4 bg-gray-800 text-white">
  <aside>
    <p>Copyright © 2023 - All right reserved by John Store</p>
  </aside>
</footer>

<ScrollToTopButton />
     
</div>
  );
}

export default Footer;