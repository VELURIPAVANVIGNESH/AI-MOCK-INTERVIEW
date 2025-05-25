import React, { useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Footer = () => {
  // Email address to redirect to (recipient)
  const recipientEmail = 'contact@intellihire.com'; // Replace with your desired recipient email address

  // Ref to access the input value
  const emailInputRef = useRef(null);

  // Handle email redirection
  const handleEmailRedirect = () => {
    const userEmail = emailInputRef.current?.value.trim() || 'user@example.com'; // Default fallback if no email is entered
    if (!userEmail) {
      alert('Please enter your email address before subscribing.');
      return;
    }

    // Construct the mailto link with the user's email in the body
    const mailtoLink = `mailto:${recipientEmail}?subject=Subscription%20Request%20from%20${encodeURIComponent(userEmail)}&body=I'd%20like%20to%20subscribe%20to%20Intellihire%20newsletters.%0D%0A%0D%0AMy%20email%20address%20is%20${encodeURIComponent(userEmail)}.`;
    window.location.href = mailtoLink;
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section brand">
          <div className="footer-logo">
            <div className="logo-icon"></div>
            <span className="logo-text">HireVerse</span>
          </div>
          <p className="footer-tagline">Your path to interview success</p>
          <div className="social-icons">
            <a 
              href="https://twitter.com/IntelliHireAI" 
              className="social-icon" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <div className="icon twitter"></div>
            </a>
            <a 
              href="https://linkedin.com/company/intellihire-ai" 
              className="social-icon" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <div className="icon linkedin"></div>
            </a>
            <a 
              href="https://instagram.com/intellihire.ai" 
              className="social-icon" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <div className="icon instagram"></div>
            </a>
            <a 
              href="https://facebook.com/IntelliHireAI" 
              className="social-icon" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <div className="icon facebook"></div>
            </a>
          </div>
        </div>

        <div className="footer-section links">
          <h3 className="footer-heading">Product</h3>
          <ul className="footer-links">
            <li><Link to="/user/upgrade">Features</Link></li>
            <li><Link to="/user/upgrade">Pricing</Link></li>
            <li><Link to="/user/upgrade">Integrations</Link></li>
            <li><Link to="/user/upgrade">Enterprise</Link></li>
          </ul>
        </div>

        <div className="footer-section links">
          <h3 className="footer-heading">Resources</h3>
          <ul className="footer-links">
            <li><Link to="/user/howitworks">Blog</Link></li>
            <li><Link to="/user/howitworks">Guides</Link></li>
            <li><Link to="/user/howitworks">Interview Tips</Link></li>
            <li><Link to="/user/howitworks">Career Advice</Link></li>
          </ul>
        </div>

        <div className="footer-section links">
          <h3 className="footer-heading">Company</h3>
          <ul className="footer-links">
            <li><Link to="/user/about">About Us</Link></li>
            <li><Link to="/user/about">Careers</Link></li>
            <li><Link to="/user/about">Support</Link></li>
            <li><Link to="/user/about">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section newsletter">
          <h3 className="footer-heading">Stay updated</h3>
          <p>Subscribe to our newsletter for tips and updates</p>
          <div className="newsletter-form">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="newsletter-input" 
              ref={emailInputRef} // Add ref to access the input value
            />
            <button 
              className="newsletter-button" 
              onClick={(e) => {
                e.preventDefault(); // Prevent default button behavior
                handleEmailRedirect();
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-legal">
          <span>© {new Date().getFullYear()} Intellihire. All rights reserved.</span>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;