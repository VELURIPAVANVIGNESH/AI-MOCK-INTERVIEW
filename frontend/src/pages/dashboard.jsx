import React, { useState, useEffect } from 'react';
import './dashboard.css';
import Footer from '../Footer';
import Header from '../Header';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser(); // Added isSignedIn for more reliable checking

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [bestScore, setBestScore] = useState(null);
  const [averageScore, setAverageScore] = useState(null);

  useEffect(() => {
    if (user) {
      setUsername(user.firstName || 'User');
      setEmail(user.primaryEmailAddress?.emailAddress || '');
    }
  }, [user]);

  useEffect(() => {
    const fetchAllFeedback = async () => {
      if (!email) return;

      const authenticate = email;
      const fetchedFeedbacks = [];
      let feedbackId = 1;
      let continueFetching = true;

      while (continueFetching) {
        try {
          const response = await fetch('http://localhost:5000/interview/feedback/list', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              authenticate,
              feedbackId,
            }),
          });

          if (response.status === 400) {
            continueFetching = false;
            break;
          }

          if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            continueFetching = false;
            break;
          }

          const data = await response.json();

          if (data.success) {
            fetchedFeedbacks.push({
              feedbackId,
              questionAnswers: data.data.questionAnswers,
              overallFeedback: data.data.overallFeedback,
              score: data.data.score,
            });
          } else {
            continueFetching = false;
            break;
          }

          feedbackId++;
        } catch (error) {
          console.error('Network or parsing error:', error);
          continueFetching = false;
          break;
        }
      }

      setFeedbacks(fetchedFeedbacks);

      if (fetchedFeedbacks.length > 0) {
        const maxScore = Math.max(...fetchedFeedbacks.map(fb => fb.score || 0));
        setBestScore(maxScore);

        const avgScore = fetchedFeedbacks.reduce((sum, fb) => sum + (fb.score || 0), 0) / fetchedFeedbacks.length;
        setAverageScore(Math.round(avgScore * 10) / 10);
      } else {
        setBestScore(null);
        setAverageScore(null);
      }

      console.log('Fetched Feedbacks:', fetchedFeedbacks);
    };

    fetchAllFeedback();
  }, [email]);

  // Handle Add New Interview Click with Alert
  const handleAddNewInterview = () => {
    if (!isSignedIn || !user) {
      alert('Please sign in to create an AI Mock Interview.');
      return;
    }
    navigate('/user/dash/Interview');
  };

  return (
    <div className="app">
      <Header />

      <main className="dashboard">
        <div className="dashboard-header">
          <h1 className="welcome-text">
            Dashboard <span className="welcome-name">Welcome, {username}</span>
          </h1>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-title">
              <i className="fas fa-file-alt"></i> Total Interviews
            </div>
            <div className="stat-value">{feedbacks.length}</div>
          </div>

          <div className="stat-card">
            <div className="stat-title">
              <i className="fas fa-trophy"></i> Best Score
            </div>
            <div className="stat-value">{bestScore !== null ? bestScore : 'N/A'}</div>
          </div>

          <div className="stat-card">
            <div className="stat-title">
              <i className="fas fa-star"></i> Average Score
            </div>
            <div className="stat-value">{averageScore !== null ? averageScore : 'N/A'}</div>
          </div>
        </div>

        <div className="action-card">
          <div className="action-header">
            <div className="action-title">
              <i className="fas fa-bolt action-icon"></i> Create AI Mock Interview
            </div>
          </div>

          {/* Modified Button with Enhanced Alert for Unauthenticated Users */}
          <div
            className="add-new-container"
            onClick={handleAddNewInterview}
          >
            <div className="add-new-btn">
              <i className="fas fa-plus"></i> +Add New
            </div>
          </div>
        </div>
        {/* Feedback Boxes Section */}
        <div className="feedback-box-container">
          <h2 className="feedback-box-title">Your Feedbacks</h2>
          <div className="feedback-boxes">
            {feedbacks.length > 0 ? (
              feedbacks.map((feedback) => (
                <div
                  key={feedback.feedbackId}
                  className="feedback-box"
                  onClick={() => setSelectedFeedback(feedback)}
                >
                  FEEDBACK {feedback.feedbackId}
                </div>
              ))
            ) : (
              <div>No feedback available</div>
            )}
          </div>
        </div>

        {selectedFeedback && (
          <div className="feedback-details">
            <h3>Feedback ID: {selectedFeedback.feedbackId}</h3>
            <p><strong>Overall Feedback:</strong> {selectedFeedback.overallFeedback}</p>
            <p><strong>Score:</strong> {selectedFeedback.score}/10</p>
            {selectedFeedback.questionAnswers && selectedFeedback.questionAnswers.length > 0 && (
              <div style={{ marginTop: '0.5rem' }}>
                <strong>Questions & Answers:</strong>
                <ul>
                  {selectedFeedback.questionAnswers.map((qa, index) => (
                    <li key={index}>
                      <strong>Q:</strong> {qa.question} <br />
                      <strong>A:</strong> {qa.answerbyAI}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button onClick={() => setSelectedFeedback(null)}>Close</button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;