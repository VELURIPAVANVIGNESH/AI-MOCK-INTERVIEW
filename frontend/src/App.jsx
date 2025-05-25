import React, { useState } from 'react';
import './App.css';  // Import the external stylesheet
import Footer from './Footer.jsx';  // Import the Footer component
import Header from './Header.jsx';  // Import the new Header component
// Using import at the top of your file
import interviewImage from '../src/images/interviewcontainer.jpg';
import seam from '../src/images/seamless.png';
import { Link } from 'react-router-dom';

const App = () => {
  const [activeTab, setActiveTab] = useState('tech');

  return (
    <div>
      {/* Use the Header component */}
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">Your Personalized AI Interview Coach</h1>
        <p className="hero-subtitle">Double your chances of landing a job with HireVerse</p>
        <div className="hero-buttons">
          
          <Link to="/user/dash" className="button primary-button"   style={{ textDecoration: 'none' }}
 ><span className='button-color'>Get Started</span></Link>
          <Link to="/user/howItWorks" className="button secondary-button"       style={{ textDecoration: 'none' }}
          >Learn More</Link>
        </div>

        {/* Interview Image Section */}
        <div className="interview-image-container">
          <img src={interviewImage} alt="AI Interview Simulation" />
        </div>
      </section>

      {/* Resources Section */}
      <section className="resources-section">
        <div className="tabs-container">
          <button 
            className={`tab-button ${activeTab === 'tech' ? 'active' : ''}`}
            onClick={() => setActiveTab('tech')}
          >
            Tech Resources
          </button>
          <button 
            className={`tab-button ${activeTab === 'aptitude' ? 'active' : ''}`}
            onClick={() => setActiveTab('aptitude')}
          >
            Aptitude Resources
          </button>
          <button 
            className={`tab-button ${activeTab === 'interview' ? 'active' : ''}`}
            onClick={() => setActiveTab('interview')}
          >
            Interview Resources
          </button>
        </div>

        <div className="resources-content">
          {activeTab === 'tech' && (
            <div className="resources-grid">
              <div className="resource-card">
                <div className="resource-icon">
                  <span className="code-icon">{'<>'}</span>
                </div>
                <h3>Coding Platforms</h3>
                <p>Practice coding and algorithmic problem-solving</p>
                <ul className="resource-links">
                  <li><a href="https://www.geeksforgeeks.org/" target="_blank" rel="noopener noreferrer"       style={{ textDecoration: 'none' }}
                  >GeeksforGeeks</a></li>
                  <li><a href="https://leetcode.com/" target="_blank" rel="noopener noreferrer"       style={{ textDecoration: 'none' }}
                  >LeetCode</a></li>
                  <li><a href="https://www.hackerrank.com/" target="_blank" rel="noopener noreferrer"       style={{ textDecoration: 'none' }}
                  >HackerRank</a></li>
                  <li><a href="https://www.codechef.com/" target="_blank" rel="noopener noreferrer"       style={{ textDecoration: 'none' }}
                  >CodeChef</a></li>
                </ul>
              </div>
              
              <div className="resource-card">
                <div className="resource-icon">
                  <span className="target-icon">⊙</span>
                </div>
                <h3>Technical Interview Preparation</h3>
                <p>Resources for system design and technical interviews</p>
                <ul className="resource-links">
                  <li><a href="https://www.interviewbit.com/" target="_blank" rel="noopener noreferrer">InterviewBit</a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer">System Design Primer</a></li>
                  <li><a href="https://www.pramp.com/" target="_blank" rel="noopener noreferrer">Pramp</a></li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'aptitude' && (
            <div className="resources-grid">
              <div className="resource-card">
                <div className="resource-icon">
                  <span className="math-icon">∑</span>
                </div>
                <h3>Quantitative Aptitude</h3>
                <p>Practice numerical and logical reasoning</p>
                <ul className="resource-links">
                  <li><a href="#" target="_blank" rel="noopener noreferrer">IndiaBIX</a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer">TestpotPro</a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer">GRE Math Review</a></li>
                </ul>
              </div>
              
              <div className="resource-card">
                <div className="resource-icon">
                  <span className="verbal-icon">Aa</span>
                </div>
                <h3>Verbal Reasoning</h3>
                <p>Improve your verbal and comprehension skills</p>
                <ul className="resource-links">
                  <li><a href="#" target="_blank" rel="noopener noreferrer">Magoosh</a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer">Vocabulary.com</a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer">Manhattan Prep</a></li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'interview' && (
            <div className="resources-grid">
              <div className="resource-card">
                <div className="resource-icon">
                  <span className="question-icon">?</span>
                </div>
                <h3>Behavioral Interviews</h3>
                <p>Prepare for common behavioral questions</p>
                <ul className="resource-links">
                  <li><a href="#" target="_blank" rel="noopener noreferrer">STAR Method Guide</a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer">Big Interview</a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer">Indeed Interview Tips</a></li>
                </ul>
              </div>
              
              <div className="resource-card">
                <div className="resource-icon">
                  <span className="company-icon">©</span>
                </div>
                <h3>Company-Specific Prep</h3>
                <p>Resources for top company interviews</p>
                <ul className="resource-links">
                  <li><a href="#" target="_blank" rel="noopener noreferrer">Glassdoor Reviews</a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer">Blind</a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer">Company Research Guide</a></li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Coaches Section */}
      {/* Note: Coaches Section was empty in your original code, so I left it commented out for now */}

      {/* More Features Section */}
      <section>
        <h2 className="section-title" style={{ textAlign: 'center', margin: '3rem 0 1rem', fontSize: '3rem' , marginLeft:'285px' }}>
          Complete suite of features
        </h2>
        <div className="features">
          <div className="feature-card">
            <div className="feature-content">
              <h3>Interview Simulation</h3>
              <p>🎙 AI-driven structured interviews.</p>
              <Link to="/user/howItWorks" className="button feature-button"       style={{ textDecoration: 'none' }}
              >Learn more</Link>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-content">
              <h3>Dynamic Questioning</h3>
              <p>🔄 Adapts based on user responses.</p>
              <Link to="/user/howItWorks" className="button feature-button"       style={{ textDecoration: 'none' }}
              >Learn more</Link>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-content">
              <h3>Personality Analysis</h3>
              <p>🧠 Technical Skills Assessment</p>
              <Link to="/user/howItWorks" className="button feature-button"       style={{ textDecoration: 'none' }}
              >Learn more</Link>
            </div>
          </div>
        </div>
        <div className="features">
          <div className="feature-card">
            <div className="feature-content">
              <h3>Technical Skills Assessment</h3>
              <p>📊 Offers coding challenges with evaluations.</p>
              <Link to="/user/howItWorks" className="button feature-button"       style={{ textDecoration: 'none' }}
              >Learn more</Link>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-content">
              <h3>Gamification</h3>
              <p>🎮 Provides engaging interview experiences.</p>
              <Link to="/user/howItWorks" className="button feature-button"       style={{ textDecoration: 'none' }}
              >Learn more</Link>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-content">
              <h3>HR Integration</h3>
              <p>📋 Seamlessly connects with hiring tools.</p>
              <Link to="/user/howItWorks" className="button feature-button"       style={{ textDecoration: 'none' }}
              >Learn more</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="integrations">
        <p className="accent-text">Integrations</p>
        <h2 className="section-heading">Seamless connections</h2>
        <h6 className="accent-text">Integrate effortlessly with your <br></br><br></br>favourite tools and Platforms</h6>
        <div className='seam'>
        <img src={seam} alt="Seamless Interactions with AI" />
        </div>
        
    
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <p className="accent-text">Testimonials</p>
        <h2 className="section-heading">They love HireVerse</h2>
        
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p className="testimonial-text">
              Never thought I'd say this as a non-techie, but thanks to HireVerse, preparing for interviews was a breeze and actually fun! Quick setup, intuitive interface, super easy to use. Totally in love with how it helped me land my dream job!
            </p>
            <div className="testimonial-author">
              <div className="author-avatar"></div>
              <span>Isabella Smith</span>
            </div>
          </div>
          
          <div className="testimonial-card">
            <p className="testimonial-text">
              HireVerse changed how we evaluate candidates. Intuitive, flexible, and provides meaningful insights. Big win for our recruitment team!
            </p>
            <div className="testimonial-author">
              <div className="author-avatar"></div>
              <span>James Wilson</span>
            </div>
          </div>
          
          <div className="testimonial-card">
            <p className="testimonial-text">
              Practicing with HireVerse = a dream. Quick, responsive feedback, no awkward moments. My confidence soared in real interviews.
            </p>
            <div className="testimonial-author">
              <div className="author-avatar"></div>
              <span>Noah Thompson</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to ace your<br/>next interview?</h2>
        <p>Get HireVerse and start practicing today!</p>
        <Link to="/user/dash"><a href="#" className="button cta-button"       style={{ textDecoration: 'none' }}
        >Get started</a></Link>
      </section>
      <Footer />
    </div>
  );
};

export default App;