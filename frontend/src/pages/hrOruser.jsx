import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './hrOruser.css';

const JobSeekerPortal = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Trigger loading animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  const handleGetStarted = () => {
    navigate('/user');
  };

  const contentData = {
    user: {
      title: "🎯 Job Seeker Portal",
      description: "Prepare for your dream job with AI-powered mock interviews. Get personalized feedback and boost your confidence.",
      features: [
        "AI Mock Interviews",
        "Real-time Feedback",  
        "Performance Analytics",
        "Industry Questions",
        "Skill Assessment",
        "Interview Recording"
      ],
      buttonText: "Start Practicing"
    }
  };
  
  return (
    <div className={`login-container ${isLoaded ? 'loaded' : ''}`}>
      {/* Animated Background Elements */}
      <div className="background-animation">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
      </div>

      <div className="main-container">
        {/* Left Section - Branding */}
        <div className="left-section">
          <div className="logo">
            <div className="logo-icon">🧠</div>
            <div className="logo-text">HIREVERSE</div>
          </div>
          
          <h1 className="main-title">
            AI-Powered Mock Interviews at Your Service
          </h1>
          
          <p className="main-subtitle">
            Our advanced AI technology provides realistic interview experiences 
            with personalized feedback to help you excel in your career journey.
          </p>
          
          <div className="features">
            <div className="feature">
              <div className="feature-number">1000+</div>
              <div className="feature-title">Interview Questions</div>
              <div className="feature-desc">Comprehensive question database</div>
            </div>
            
            <div className="feature">
              <div className="feature-number">24/7</div>
              <div className="feature-title">AI Availability</div>
              <div className="feature-desc">Practice anytime, anywhere</div>
            </div>
          </div>
        </div>

        {/* Right Section - Job Seeker Content */}
        <div className="right-section">
          <div className="login-form-container">
            <h2 className="login-title">Welcome<div style={{ whiteSpace: 'pre-line' }}></div> Job Seeker</h2>
            
            <div className="interactive-content">
              <div className="dynamic-content">
                <div className="content-card">
                  <div className="content-title">
                    {contentData.user.title}
                  </div>
                  
                  <div className="content-description">
                    {contentData.user.description}
                  </div>
                  
                  <div className="content-features">
                    {contentData.user.features.map((feature, index) => (
                      <div key={index} className="feature-item">
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <button className="cta-button" onClick={handleGetStarted}>
                    {contentData.user.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerPortal;
