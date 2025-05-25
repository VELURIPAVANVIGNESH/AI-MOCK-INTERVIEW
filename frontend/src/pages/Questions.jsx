import React from 'react';
import Header from '../Header'; 
import Footer from '../Footer';
import './Questions.css';
import { Link } from 'react-router-dom';

const Questions = () => {
  return (
    <div className="questions-page">
      <Header />
      <div className="page-heading">
        <h1>Ace Your Interview with Confidence!</h1>
        <p className="quote">"Success is where preparation and opportunity meet." – Bobby Unser</p>
      </div>
      <div className="questions-container">
        <div className="card-container">
          <div className="question-card">
            <div className="card-content">
              <div className="card-header">
                <h2>Behavioral Qn's</h2>
              </div>
              <div className="card-body">
                <p>Master behavioral questions</p>
                <p>Use STAR method tips</p>
                <p>Real-world examples</p>
                <p>Prepare with confidence!</p>
              </div>
              <div className="card-footer">
                <Link to="/user/questions/behaviourPage">
                  <button className="lets-go-btn">Let's Go!</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card-container">
          <div className="question-card">
            <div className="card-content">
              <div className="card-header">
                <h2>Verbal Aptitude</h2>
              </div>
              <div className="card-body">
                <p>Ace verbal & aptitude tests</p>
                <p>Practice reasoning & logic</p>
                <p>Track your progress</p>
                <p>Boost your skills today!</p>
              </div>
              <div className="card-footer">
                <Link to="/user/questions/verbalAptitude">
                  <button className="lets-go-btn">Let's Go!</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card-container">
          <div className="question-card">
            <div className="card-content">
              <div className="card-header">
                <h2>Interview Questions</h2>
              </div>
              <div className="card-body">
                <p>Practice top interview questions</p>
                <p>Get expert feedback</p>
                <p>Improve your responses</p>
                <p>Start preparing now!</p>
              </div>
              <div className="card-footer">
                <Link to="/user/questions/interviewQuestions">
                  <button className="lets-go-btn">Let's Go!</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Questions;