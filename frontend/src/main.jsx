import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.jsx'; // Your main App component
import './index.css';
import Interview from './pages/Interview.jsx';
import PricingSection from './pages/Upgrade.jsx';
import Dashboard from './pages/dashboard.jsx';
import HowItWorks from './pages/howItWorks.jsx';
import Aboutus from './pages/aboutUs.jsx';
import Questions from './pages/Questions.jsx';
import InterQues from './pages/interviewQuestions.jsx';
import HrOrUser from './pages/hrOruser.jsx';
import ProfileView from './pages/profile.jsx';
import BehaviorPage from './pages/behaviourPage.jsx';
import VerbalApti from './pages/aptitudeAndVerbal.jsx';

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file');
}

// Correct usage of createRoot
const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HrOrUser />} />
            <Route path="/user" element={<App />} />
            <Route path="/user/dash/Interview" element={<Interview />} />
            <Route path="/user/dash/profile" element={<ProfileView/>}/>
            <Route path="/user/upgrade" element={<PricingSection/>}/>
            <Route path="/user/dash" element={<Dashboard />} />
            <Route path="/user/howItWorks" element={<HowItWorks />} />
            <Route path="/user/about" element={<Aboutus/>}/>
            <Route path="/user/questions" element = {<Questions/>}/>
            <Route path="/user/questions/interviewQuestions" element = {<InterQues/>}/>
            <Route path="/user/questions/behaviourPage" element={<BehaviorPage/>} />
            <Route path="/user/questions/verbalAptitude" element={<VerbalApti/>}/>
          </Routes>
        </BrowserRouter>
      </ClerkProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
