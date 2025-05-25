import React, { useState } from 'react';
import './behaviourPage.css';
import Header from '../Header';
import Footer from '../Footer';

const BehaviorPage = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const companies = [
    { name: 'Google', logo: '../../public/google.png' },
    { name: 'Amazon', logo: '../../public/amazon.png' },
    { name: 'Microsoft', logo: '../../public/microsoft.png' },
    { name: 'Apple', logo: '../../public/apple.png' },
    { name: 'General', logo: '../../public/google.png' }

  ];

  const questions = [
    {
      question: "Tell me about a time when you faced a challenging situation at work.",
      answer: "When answering this question, focus on describing the situation briefly, the actions you took, and the positive results you achieved. Show how you use problem-solving skills and remain calm under pressure.",
      company: 'Google'
    },
    {
      question: "Describe a time when you had to work with a difficult team member.",
      answer: "Highlight your interpersonal skills, conflict resolution abilities, and focus on how you maintained professionalism while working toward a common goal despite personal differences.",
      company: 'Microsoft'
    },
    {
      question: "Give an example of when you showed leadership qualities.",
      answer: "Discuss a specific situation where you took initiative, guided others, made important decisions, and achieved positive outcomes through your leadership approach.",
      company: 'Amazon'
    },
    {
      question: "Tell me about a time when you failed at something.",
      answer: "Be honest about a past failure, but focus on what you learned from the experience and how it helped you grow professionally. Show self-awareness and your ability to adapt.",
      company: 'Google'
    },
    {
      question: "Describe a situation where you had to meet a tight deadline.",
      answer: "Explain your approach to prioritization, time management, and how you maintained quality work under pressure. Include specific actions you took to ensure success.",
      company: 'Apple'
    },
    {
      question: "How have you handled a situation with an unhappy client or customer?",
      answer: "Detail your customer service approach, empathy, problem-solving skills, and how you turned a negative situation into a positive outcome.",
      company: 'General'
    },
    {
      question: "Tell me about a time when you had to adapt to a significant change.",
      answer: "Showcase your flexibility, resilience, and positive attitude toward change. Describe specific actions you took to embrace and succeed in the new circumstances.",
      company: 'Amazon'
    },
    {
      question: "Give an example of how you've contributed to a team achievement.",
      answer: "Highlight your collaborative skills, specific contributions, and how you supported team members while working toward a shared goal.",
      company: 'Microsoft'
    },
    {
      question: "Describe a situation where you had to persuade others to your point of view.",
      answer: "Focus on your communication style, ability to understand others' perspectives, and how you effectively convinced them through logical reasoning and relationship building.",
      company: 'General'
    },
    {
      question: "Tell me about a time when you had to learn something new quickly.",
      answer: "Emphasize your learning agility, resourcefulness, and the strategies you used to rapidly acquire new knowledge or skills when required.",
      company: 'Amazon'
    },
    {
      question: "How have you handled receiving critical feedback?",
      answer: "Demonstrate your professionalism in receiving feedback, self-awareness, and willingness to improve. Include a specific example of how you used feedback constructively.",
      company: 'General'
    },
    {
      question: "Describe a situation where you had to make an important decision with limited information.",
      answer: "Highlight your decision-making process, risk assessment abilities, and how you balance thoroughness with the need to act decisively when information is incomplete.",
      company: 'Apple'
    },
    {
      question: "Tell me about a time when you exceeded expectations.",
      answer: "Share a specific example that demonstrates your initiative, high standards, and willingness to go beyond what's required to deliver exceptional results.",
      company: 'General'
    },
    {
      question: "How have you handled multiple competing priorities?",
      answer: "Detail your approach to prioritization, time management, and how you maintain organization and quality while juggling multiple responsibilities.",
      company: 'Microsoft'
    },
    {
      question: "Describe a situation where you identified and solved a problem before it became urgent.",
      answer: "Showcase your proactive mindset, attention to detail, and problem-solving abilities. Explain how you anticipated issues and took preventative action.",
      company: 'General'
    },
    {
      question: "Tell me about a time when you had to work with limited resources.",
      answer: "Emphasize your resourcefulness, creativity in finding solutions, and ability to achieve goals despite constraints or limitations.",
      company: 'Amazon'
    },
    {
      question: "How have you handled a situation where you disagreed with your manager?",
      answer: "Focus on your respectful communication, ability to understand different perspectives, and professional approach to resolving disagreements while maintaining positive working relationships.",
      company: 'General'
    },
    {
      question: "Describe a situation where you had to motivate others.",
      answer: "Highlight your leadership qualities, emotional intelligence, and specific strategies you used to inspire and energize team members to achieve goals.",
      company: 'Apple'
    },
    {
      question: "Tell me about a time when you improved a process.",
      answer: "Detail your analytical thinking, innovation, and how you identified and implemented improvements that increased efficiency, quality, or other important metrics.",
      company: 'General'
    },
    {
      question: "How have you demonstrated resilience during challenging times?",
      answer: "Share your ability to persevere through difficulties, maintain a positive attitude, and continue performing well despite obstacles or setbacks.",
      company: 'Microsoft'
    },
  ];

  return (
    <div>
      <Header />
      <div className="behavior-page">
        <div className="behavior-container">
          <div className="header-section">
            <h1>Behavioral Interview Questions</h1>
            <p className="quote">"Abilities may get you to the top, but only behavior keeps you there"</p>
            <p className="subtext">
              Prepare for your interview by practicing these common behavioral questions. 
              Click the + icon to expand and view guidance and company info.
            </p>
          </div>
          
          <div className="questions-container">
            {questions.map((item, index) => {
              const company = companies.find(c => c.name === item.company);
              return (
                <div key={index} className="question-box">
                  <div 
                    className="question-header" 
                    onClick={() => toggleQuestion(index)}
                  >
                    <div className="question-content">
                      <h3>{item.question}</h3>
                      <img 
                        src={company.logo} 
                        alt={`${company.name} logo`}
                        className="company-logo"
                      />
                    </div>
                    <div className={`toggle-btn ${openQuestion === index ? 'active' : ''}`}>
                      <span className="toggle-icon">+</span>
                    </div>
                  </div>
                  
                  {openQuestion === index && (
                    <div className="answer">
                      <p>{item.answer}</p>
                      <span className="company-name">{company.name}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />    
    </div>
  );
};

export default BehaviorPage;