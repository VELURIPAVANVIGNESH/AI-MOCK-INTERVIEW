import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import './App.css'; // Import the same stylesheet as App.jsx for consistency
import { Link } from 'react-router-dom'; // Import Link for navigation

const Header = () => {
  return (
    <header>
      <nav className="nav-container">
        <div className="header-logo">
          <div className="header-logo-icon"></div>
          <div className='my-div'>HireVerse</div>
        </div>

        <div className="nav-links">
        <style>{`
        .nav-link {
          text-decoration: none;
        }
        .nav-link:hover {
          text-decoration: none;
        }
      `}</style>
          <Link to="/user" className="nav-link">Home</Link>
          <Link to="/user/dash" className="nav-link">Interview</Link>
          <Link to="/user/questions" className="nav-link">Questions</Link>
          <Link to="/user/upgrade" className="nav-link">Upgrade</Link>
          <Link to="/user/about" className="nav-link">About Us</Link>
        </div>

        {/* Clerk sign-in / sign-out buttons */}
        <div className="clerk-buttons">
          <SignedOut>
            <SignInButton className="sign-in-button" />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;