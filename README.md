# 🧠 HireVerse

*Your AI-powered mock interview platform for role-based dynamic preparation with real-time feedback, intelligent assessment, and personalized dashboard.*

---

## 📌 Project Description

*HireVerse* is an AI-powered mock interview platform that provides tailored interview experiences based on a candidate’s selected role, tech stack, and experience level. It integrates speech-to-text, text-to-speech, and AI-driven dynamic question generation to simulate real interviews.

Users can sign in using *Clerk authentication, practice **DSA, **Aptitude, and **Verbal Reasoning* questions, and receive *question-wise* and *overall feedback* along with *score tracking* in a personalized dashboard. The platform supports *company-specific behavioral questions, offers **practice assessments, and includes **premium subscription tiers* with a *7-day free trial* and *test-mode payment gateway*.

---

## 🧠 Why HireVerse?

Preparing for interviews can be overwhelming and unstructured. HireVerse streamlines this by offering:

- A structured, AI-driven mock interview experience  
- Real-time feedback and improvement tracking  
- Centralized resources for DSA, Aptitude, and Company-specific preparation  
- Seamless onboarding and accessible UI for all user levels  

---

## 🚀 Features

### 🔐 Authentication & User Management
- Secure Sign-in/Sign-up with *Clerk Authentication*
- Personalized user data and session tracking

### 🧑‍💻 AI Mock Interviews
- Role and experience-based question generation using AI
- Dynamic and intelligent interviews covering:
  - DSA (Leetcode-level)
  - Aptitude
  - Verbal Reasoning
  - Company-specific behavioral rounds

### 🔊 Real-Time Communication
- *Text-to-Speech*: AI reads questions aloud
- *Speech-to-Text*: Converts user’s spoken answers to text

### 📊 Dashboard
- View *Best, **Average, and **Recent Scores*
- Track *Question-wise feedback* and *Overall performance*
- Highlighted areas of improvement and strengths

### 📚 Practice & Assessment
- Access syllabus-wise content for:
  - DSA
  - Aptitude
  - Verbal
- Attempt time-bound *Practice Assessments*
- Review *Company-wise Behavioral Questions*

### 💰 Pricing & Subscription
- Dedicated *Pricing Page*
- *Premium access* with additional features
- Integrated *Payment Gateway (test mode)*
- *7-Day Free Trial* for new users

### 🧾 About & Footer
- *About Us* section:
  - Purpose of HireVerse
  - How it works
  - Features breakdown
- *Footer*:
  - Subscription form
  - Quick links to important pages

---

## 📁 Project Structure



```

AI-MOCK-INTERVIEW-BUILDVERSE/
├── backend/
│ ├── config/ # DB connection and Clerk middleware config
│ ├── controllers/ # Route handlers (feedback, mock interviews, etc.)
│ ├── models/ # MongoDB schema definitions (e.g., Feedback, User)
│ ├── routes/ # API endpoint route definitions
│ ├── .env # Backend environment configuration
│ ├── server.js # Entry point for backend server
│
├── frontend/
│ ├── public/
│ │ └── models/ # face-api.js model files for facial detection
│ ├── src/
│ │ ├── api/ # Axios functions for backend API interaction
│ │ ├── assets/ # Images, icons, and other assets
│ │ ├── components/ # Reusable components (Navbar, Footer, Cards, etc.)
│ │ ├── pages/ # Application pages (Home, Dashboard, Interview, etc.)
│ │ ├── utils/ # Utility functions (formatters, helpers, etc.)
│ │ ├── App.jsx # Root component with route definitions
│ │ └── main.jsx # React DOM entry point
│
├── .gitignore # Files and folders to ignore in Git
├── LICENSE # (Optional) License information
├── package.json # Project metadata and dependencies
└── README.md # Project documentation

```


---

## 📁 Pages Directory Structure



```
pages/
├── aboutUs.css # Styles for About Us page
├── aboutUs.jsx # About Us page layout and content
├── aptitudeAndVerbal.css # Styles for Aptitude and Verbal page
├── aptitudeAndVerbal.jsx # Aptitude and Verbal content with syllabus
├── behaviourPage.css # Styles for behavioral questions
├── behaviourPage.jsx # Company-wise behavioral question UI
├── dashboard.css # Styles for dashboard
├── dashboard.jsx # Scores, feedback, and progress tracking
├── howItWorks.css # Styles for How It Works page
├── howItWorks.jsx # Explanation of workflow
├── hrOruser.css # Styles for user type selection
├── hrOruser.jsx # HR/User selection page
├── interview.css # Styles for interview session page
├── interview.jsx # AI-based Interview Q&A component
├── interviewQuestions.css # Styles for interview questions
├── interviewQuestions.jsx # Display of interview questions
├── joinInterview.css # Styles for joining interviews
├── joinInterview.jsx # Join interview session component
├── profile.css # Styles for user profile
├── profile.jsx # Profile component
├── Questions.css # General question styles
├── Questions.jsx # DSA, Aptitude, Verbal practice page
├── Upgrade.css # Pricing/upgrade page styles
├── Upgrade.jsx # Premium upgrade and subscription component

```

---



## 💻 Tech Stack

### 🔙 Backend
- *Node.js* & *Express.js* – API and server-side logic
- *MongoDB* – NoSQL database for user data, interview results, and feedback
- *Clerk* – Authentication and user session management
- *OpenAI API / Gemini API* – AI-powered dynamic question generation
  
### 🌐 Frontend
- *React.js* – Component-based UI
- *Tailwind CSS* – Responsive styling
- *face-api.js* – Facial tracking for mock interviews (public/models)
- *React Router* – Client-side routing

### 🧠 AI & Communication
- *Speech-to-Text API* – Voice input conversion
- *Text-to-Speech API* – Question narration
- *OpenAI/Gemini* – Context-aware intelligent Q&A generation

### 💳 Payments
- *RazorPay (Test Mode)* – Secure payment integration for subscription

### Deployment 
- *render* - deployment of both frontend and backend 

---

## 🔧 Improvements That Can Be Made

- Expand support to include *HR integrated tools* with session recording  
- Provide *resume analysis and feedback*  
- Add a *Gamified Leaderboard* for DSA and Aptitude practice  
- Enable *mobile app* integration  
- Support *multi-language interviews*  

---

## 👨‍💻 Contributors

*Team - HelloWorld*

- *Abhiram Bikkina*
- *Tharun Kumar Reddy*
- *Dhinesh Veera Bhargav*
- *Pavan Vignesh*

---
