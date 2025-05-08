import React from 'react';
import {FaLinkedin, FaInstagram, FaFacebookF, FaPinterestP, FaTwitter} from 'react-icons/fa';

import './index.css';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column logo-column">
            <h1 className="footer-heading">OrderSwift</h1>
          <p></p>
        </div>
 
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Team</li>
            <li>OrderSwift One</li>
            <li>OrderSwift Instamart</li>
            <li>OrderSwift Dineout</li>
            <li>OrderSwift Genie</li>
            <li>Minis</li>
            <li>Pyng</li>
          </ul>
        </div>
 
        <div className="footer-column">
          <h4>Contact us</h4>
          <ul>
            <li>Help & Support</li>
            <li>Partner With Us</li>
            <li>Ride With Us</li>
          </ul>
          <h4>Legal</h4>
          <ul>
            <li>Terms & Conditions</li>
            <li>Cookie Policy</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
 
        <div className="footer-column">
          <h4>Available in:</h4>
          <ul>
            <li>Bangalore</li>
            <li>Gurgaon</li>
            <li>Hyderabad</li>
            <li>Delhi</li>
            <li>Mumbai</li>
            <li>Pune</li>
          </ul>
          <select className="city-selector">
            <option>680 cities</option>
          </select>
        </div>
 
        <div className="footer-column">
          <h4>Life at OrderSwift</h4>
          <ul>
            <li>Explore With Swiggy</li>
            {/* <li>Swiggy News</li> */}
            <li>Snackables</li>
          </ul>
          <h4>Social Links</h4>
          <div className="social-icons">
            <FaLinkedin />
            <FaInstagram />
            <FaFacebookF />
            <FaPinterestP />
            <FaTwitter />
          </div>
        </div>
      </div>
      <hr className="footer-divider" />
      <p className="footer-copyrights"><strong>© 2025 OrderSwift Limited</strong></p>
    </footer>  
  );
};

export default Footer;