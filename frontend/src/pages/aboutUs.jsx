import React, { useState } from 'react';
import './aboutUs.css';
import Header from '../Header';
import Footer from '../Footer';

function Aboutus() {
  const [activeTab, setActiveTab] = useState('mission');

  const [testimonials] = useState([
    {
      id: 1,
      name: "Sophie Martinez",
      text: "HireVerse is a game-changing solution. Super user-friendly interface and much more polished than competitors.",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 2,
      name: "Isabella Smith",
      text: "Never thought I'd say this as a non-techie, but HireVerse made launching my app's page a breeze and actually fun! Quick setup, gorgeous design, super easy to use. Totally in love with how it turned out!",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 3,
      name: "Noah Thompson",
      text: "Designing with HireVerse is a dream. Quick, creative, no coding needed. My clients are thrilled with our new site.",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 4,
      name: "Emily Johnson",
      text: "Looking Vertex for our website was the best decision. Our page loads amazingly fast now!",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 5,
      name: "James Wilson",
      text: "Vertex changed how we present data online. Intuitive, flexible, and looks great. Big win for our team!",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 6,
      name: "Trevor Noah",
      text: "Redesigning our website with Vertex has been a game-changer! The transformation is unbelievable — not only is it user-friendly, but the visual appeal is off the charts. Absolutely wowed by the results!",
      avatar: "/api/placeholder/40/40"
    }
  ]);

  const [values] = useState([
    {
      title: "Continuous Learning",
      description: "Always striving to improve and provide better tools for growth.",
      icon: "📚"
    },
    {
      title: "Empowerment",
      description: "Supporting individuals in building confidence and achieving professional success.",
      icon: "💪"
    },
    {
      title: "Excellence",
      description: "Delivering high-quality, impactful features to simplify interview preparation.",
      icon: "🏆"
    }
  ]);

  return (
    <div className="app">
      <Header />
      <main>
        <section className="hero">
          <h1>About HireVerse AI</h1>
          <p className="subtitle">
            Empowering professionals to ace interviews through intelligent, personalized AI coaching
          </p>

          <div className="tabs">
            <button 
              className={`tab-button ${activeTab === 'mission' ? 'active' : ''}`}
              onClick={() => setActiveTab('mission')}
            >
              <span className="tab-icon">🎯</span>
              Mission
            </button>
            <button 
              className={`tab-button ${activeTab === 'story' ? 'active' : ''}`}
              onClick={() => setActiveTab('story')}
            >
              <span className="tab-icon">📖</span>
              Story
            </button>
            <button 
              className={`tab-button ${activeTab === 'approach' ? 'active' : ''}`}
              onClick={() => setActiveTab('approach')}
            >
              <span className="tab-icon">🚀</span>
              Approach
            </button>
          </div>

          <div className={`tab-content ${activeTab === 'mission' ? 'active' : ''}`}>
            <p>HireVerse AI is on a mission to revolutionize interview preparation by providing personalized, intelligent AI coaching tailored to individual career aspirations.</p>
            <p>With HireVerse AI, the goal is to bridge the gap between preparation and success, empowering users to unlock their full potential.</p>
          </div>

          <div className={`tab-content ${activeTab === 'story' ? 'active' : ''}`}>
            <p>HireVerse began when our founder struggled with interview preparation despite countless hours of practice. Recognizing a gap in the market for personalized coaching, they assembled a team of AI experts and career counselors.</p>
            <p>After months of development and testing with job seekers, IntelliHire was born – combining cutting-edge AI with human expertise to create a revolutionary interview preparation platform.</p>
          </div>

          <div className={`tab-content ${activeTab === 'approach' ? 'active' : ''}`}>
            <p>Our approach combines advanced natural language processing with behavioral analysis to create a truly personalized coaching experience. We analyze thousands of successful interviews to identify patterns and strategies that work.</p>
            <p>Our AI adapts to your specific career goals, industry, and experience level, providing tailored feedback that helps you improve with each practice session.</p>
          </div>
        </section>

        <section className="values">
          <h2>Our Core Values</h2>
          <div className="values-container">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="testimonials">
          <h2 style={{ marginRight: '100px' }}>They love HireVerse</h2>
          <div className="testimonials-grid">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="testimonial-card">
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <img src={testimonial.avatar} alt={testimonial.name} className="testimonial-avatar" />
                  <span className="testimonial-name">{testimonial.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Aboutus;
