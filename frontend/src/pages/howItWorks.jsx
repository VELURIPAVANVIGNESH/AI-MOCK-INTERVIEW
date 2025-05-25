import React from 'react';
import './howItWorks.css';
import Footer from '../Footer';
import Header from '../Header';
import { Link } from 'react-router-dom';

const App = () => {
  const steps = [
    {
      id: 1,
      title: "Create Your Profile",
      description: "Sign up and build your personalized profile. Tell us about your experience, target roles, and preferred interview format.",
      icon: "👤"
    },
    {
      id: 2,
      title: "Select Interview Type",
      description: "Choose from technical, behavioral, or mixed interviews. Customize difficulty level and focus areas based on your career goals.",
      icon: "🎯"
    },
    {
      id: 3,
      title: "Practice with AI",
      description: "Start your mock interview with our AI that generates dynamic, contextually relevant questions powered by advanced algorithms.",
      icon: "🤖"
    },
    {
      id: 4,
      title: "Submit Your Answers",
      description: "Respond via text or with our voice-to-text feature. Our interface tracks your responses and provides a seamless experience.",
      icon: "💬"
    },
    {
      id: 5,
      title: "Receive Detailed Feedback",
      description: "Get instant AI-powered analysis of your performance, with detailed insights on your strengths and areas for improvement.",
      icon: "📊"
    },
    {
      id: 6,
      title: "Track Progress & Improve",
      description: "Access your interview history, track progress, and keep refining your skills with unlimited practice sessions.",
      icon: "📈"
    }
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Software Engineer",
      text: "HireVerse helped me prepare for my dream job interview with specific technical questions I hadn't considered. Landed the job with confidence!",
      avatar: "/avatars/alex.jpg"
    },
    {
      name: "Priya Sharma",
      role: "Product Manager",
      text: "The behavioral interview practice was spot-on. The AI's feedback on my responses helped me refine my storytelling approach significantly.",
      avatar: "/avatars/priya.jpg"
    },
    {
      name: "Marcus Johnson",
      role: "Data Scientist",
      text: "Practicing with HireVerse for a week boosted my interview performance by 80%. The technical questions were challenging and relevant.",
      avatar: "/avatars/marcus.jpg"
    },
    {
      name: "Sophia Martinez",
      role: "UX Designer",
      text: "HireVerse is a lifesaver! Getting design-specific questions helped me nail my interview better than ever.",
      avatar: "/avatars/sophia.jpg"
    },
    {
      name: "James Wilson",
      role: "Marketing Lead",
      text: "The platform changed how we prepare for interviews. Intuitive, flexible, and looks great. Big win for our team!",
      avatar: "/avatars/james.jpg"
    },
    {
      name: "Noah Thompson",
      role: "Web Developer",
      text: "Using HireVerse is a dream. Quick, creative, no extra work needed. My clients are thrilled with our preparation process.",
      avatar: "/avatars/noah.jpg"
    }
  ];

  return (
    <div className="app-container">
      <Header />

      <main>
        <section className="hero">
          <h1>They love HireVerse</h1>
          <p className="subtitle">Join thousands of professionals who've mastered their interview skills with our AI</p>
        </section>

        <section className="process-section">
          <h2>How HireVerse Works</h2>
          <p className="section-description">Our six-step process will transform your interview preparation experience</p>
          
          <div className="process-steps">
            {steps.map((step) => (
              <div className="step-card" key={step.id}>
                <div className="step-icon">{step.icon}</div>
                <div className="step-number">Step {step.id}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="testimonials-section">
          <h2>Success Stories</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div className="testimonial-card" key={index}>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <div className="avatar-placeholder">{testimonial.name.charAt(0)}</div>
                  </div>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to Ace Your Next Interview?</h2>
          <p>Join thousands of job seekers who have improved their interview performance with HireVerse</p>
          <Link to="/user/dash" style = {{textdecoration : 'none'}}><button className="cta-button">Get Started Free</button></Link>
          <p className="small-text">No credit card required • Free basic plan available</p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;