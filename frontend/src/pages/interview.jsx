import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useUser } from '@clerk/clerk-react';

import {
  ChevronLeft,
  Mic,
  X,
  Save,
  MessageSquare,
  Volume2,
  VolumeX,
} from 'lucide-react';
import './interview.css';

// Initialize the Generative AI client (make sure you keep your key private in production!)
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Expanded Dropdown data with more professional options
const jobPositions = [
  'Software Engineer',
  'Senior Software Engineer',
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'DevOps Engineer',
  'Data Scientist',
  'Machine Learning Engineer',
  'Cloud Architect',
  'Mobile Developer',
  'Cybersecurity Analyst',
  'Database Administrator',
  'UI/UX Designer',
  'Product Manager - Technical',
  'QA Engineer',
  'Site Reliability Engineer',
  'Blockchain Developer',
  'AI Research Scientist',
  'Embedded Systems Engineer',
  'Game Developer',
  'Network Engineer',
  'Solutions Architect',
  'Business Intelligence Analyst',
  'Systems Analyst',
  'Technical Writer',
];

// Expanded mapping of job positions to relevant tech stacks
const techStackMapping = {
  'Software Engineer': [
    'Java, Spring Boot, MySQL',
    'Python, Django, PostgreSQL',
    'C#, .NET Core, SQL Server',
    'JavaScript, Node.js, MongoDB',
    'Ruby, Rails, SQLite',
  ],
  'Senior Software Engineer': [
    'Java, Spring Boot, Kafka',
    'Python, Flask, Redis',
    'C#, .NET Core, Azure',
    'TypeScript, React, GraphQL',
    'Go, Kubernetes, PostgreSQL',
  ],
  'Full Stack Developer': [
    'React, Node.js, MongoDB',
    'Angular, Java, MySQL',
    'Vue.js, Python, PostgreSQL',
    'MERN Stack (MongoDB, Express, React, Node.js)',
    'MEAN Stack (MongoDB, Express, Angular, Node.js)',
  ],
  'Frontend Developer': [
    'React, TypeScript, Redux',
    'Angular, RxJS, SCSS',
    'Vue.js, JavaScript, Webpack',
    'HTML, CSS, JavaScript',
    'Svelte, Tailwind CSS',
  ],
  'Backend Developer': [
    'Node.js, Express, MongoDB',
    'Java, Spring Boot, Hibernate',
    'Python, Django, PostgreSQL',
    'Go, Gin, MySQL',
    'PHP, Laravel, MariaDB',
  ],
  'DevOps Engineer': [
    'AWS, Docker, Kubernetes',
    'Azure, Terraform, Jenkins',
    'GCP, Ansible, CI/CD',
    'Linux, Bash, Prometheus',
    'GitLab CI, Helm, Grafana',
  ],
  'Data Scientist': [
    'Python, Pandas, Scikit-learn',
    'R, Tableau, SQL',
    'Python, TensorFlow, Jupyter',
    'Spark, Hadoop, Hive',
    'Julia, MATLAB, Power BI',
  ],
  'Machine Learning Engineer': [
    'Python, TensorFlow, PyTorch',
    'Keras, Scikit-learn, NumPy',
    'R, MATLAB, Deep Learning',
    'AWS SageMaker, MLflow',
    'H2O.ai, XGBoost, LightGBM',
  ],
  'Cloud Architect': [
    'AWS, Lambda, EC2',
    'Azure, AKS, Blob Storage',
    'GCP, Cloud Functions, BigQuery',
    'Terraform, CloudFormation',
    'OpenStack, VMware, Serverless',
  ],
  'Mobile Developer': [
    'Swift, iOS, Xcode',
    'Kotlin, Android, Jetpack',
    'Flutter, Dart, Firebase',
    'React Native, JavaScript',
    'Ionic, TypeScript, Capacitor',
  ],
  'Cybersecurity Analyst': [
    'Wireshark, Kali Linux, SIEM',
    'Python, Splunk, Nessus',
    'PowerShell, Active Directory',
    'Burp Suite, Metasploit',
    'Palo Alto, FireEye, SOC',
  ],
  'Database Administrator': [
    'Oracle, PL/SQL, RAC',
    'MySQL, InnoDB, Replication',
    'PostgreSQL, TimescaleDB',
    'MongoDB, Cassandra',
    'SQL Server, T-SQL, Clustering',
  ],
  'UI/UX Designer': [
    'Figma, Adobe XD, Sketch',
    'InVision, Zeplin, Miro',
    'CSS, Tailwind, Material-UI',
    'Prototyping, User Research',
    'Axure, Framer, Usability Testing',
  ],
  'Product Manager - Technical': [
    'Jira, Confluence, Agile',
    'Roadmapping, Stakeholder Mgmt',
    'Data Analysis, SQL, Tableau',
    'API Design, Postman',
    'Scrum, Kanban, A/B Testing',
  ],
  'QA Engineer': [
    'Selenium, Java, TestNG',
    'Cypress, JavaScript, Mocha',
    'Postman, API Testing',
    'JMeter, LoadRunner',
    'Appium, Espresso, XCUITest',
  ],
  'Site Reliability Engineer': [
    'AWS, Kubernetes, Prometheus',
    'Azure, Terraform, Grafana',
    'GCP, Datadog, CI/CD',
    'Linux, Bash, Ansible',
    'SRE Practices, Incident Response',
  ],
  'Blockchain Developer': [
    'Solidity, Ethereum, Truffle',
    'Hyperledger, Fabric, Corda',
    'Rust, Solana, Web3.js',
    'Bitcoin, Node.js, Smart Contracts',
    'Polkadot, Substrate, Chainlink',
  ],
  'AI Research Scientist': [
    'Python, PyTorch, TensorFlow',
    'R, MATLAB, Deep Learning',
    'Julia, NLP, GANs',
    'Hugging Face, Reinforcement Learning',
    'Spark ML, AWS AI Services',
  ],
  'Embedded Systems Engineer': [
    'C, Embedded Linux, RTOS',
    'C++, ARM, Microcontrollers',
    'Python, Raspberry Pi, IoT',
    'Assembly, Firmware, Sensors',
    'Zephyr, FreeRTOS, Arduino',
  ],
  'Game Developer': [
    'Unity, C#, 3D Modeling',
    'Unreal Engine, C++, Blueprints',
    'Godot, GDScript, OpenGL',
    'Cocos2d-x, JavaScript, WebGL',
    'Blender, Maya, VR/AR',
  ],
  'Network Engineer': [
    'Cisco, CCNA, Routing Protocols',
    'Juniper, MPLS, BGP',
    'Wireshark, Network Security',
    'SDN, VMware NSX, VLANs',
    'Fortinet, Firewall, VPN',
  ],
  'Solutions Architect': [
    'AWS, Microservices, TOGAF',
    'Azure, SOA, Design Patterns',
    'GCP, Enterprise Architecture',
    'Java, REST APIs, UML',
    'SaaS, PaaS, Integration Patterns',
  ],
  'Business Intelligence Analyst': [
    'Power BI, DAX, SQL',
    'Tableau, Python, ETL',
    'Looker, Google Data Studio',
    'QlikView, Data Warehousing',
    'Excel, VBA, Snowflake',
  ],
  'Systems Analyst': [
    'SQL, UML, BPMN',
    'Java, ERP Systems, SAP',
    'Python, Systems Integration',
    'Visio, Requirements Analysis',
    'Agile, SDLC, Stakeholder Mgmt',
  ],
  'Technical Writer': [
    'MadCap Flare, XML, DITA',
    'Confluence, Markdown, API Docs',
    'FrameMaker, RoboHelp',
    'Sphinx, reStructuredText',
    'Git, Technical Editing',
  ],
};

const experiences = [
  'Less than 1 year',
  '1-2 years',
  '3-5 years',
  '5-7 years',
  '7-10 years',
  '10+ years',
  '15+ years',
  '20+ years',
];

export default function Interview() {
  const { user } = useUser();

  // Form state
  const [formData, setFormData] = useState({
    jobPosition: '',
    jobDescription: '',
    techStack: '',
    experience: '',
    name: '',
    numOfQuestions: 5,
  });

  // Add state for available tech stacks based on selected job position
  const [availableTechStacks, setAvailableTechStacks] = useState([]);

  // Interview states
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [maxQuestions, setMaxQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState(3);

  // UI states
  const [showMediaPrompt, setShowMediaPrompt] = useState(false);
  const [mediaAllowed, setMediaAllowed] = useState(false);
  const [showInterview, setShowInterview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detailedFeedback, setDetailedFeedback] = useState({
    overall: '',
    overallScore: null,
    questionFeedbacks: [],
  });
  const [isRecording, setIsRecording] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [formVisible, setFormVisible] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  // References
  const videoRef = useRef(null);
  const recognitionRef = useRef(null);
  const lastActivityRef = useRef(Date.now());

  const updateActivity = () => {
    lastActivityRef.current = Date.now();
  };

  // Start camera
  const startCamera = () => {
    if (
      showInterview &&
      mediaAllowed &&
      navigator.mediaDevices?.getUserMedia &&
      !videoRef.current?.srcObject
    ) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch((err) => {
          console.error('Error starting webcam:', err);
          alert('Unable to start webcam. Please ensure permission is granted.');
        });
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    if (showInterview && mediaAllowed && navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch((err) => {
          console.error('Error accessing media:', err);
          alert('Unable to access media. Please ensure permission is granted.');
        });
    }
    return () => {
      stopCamera();
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, [showInterview, mediaAllowed]);

  // Text-to-speech for questions
  useEffect(() => {
    if (showInterview && currentQuestion) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentQuestion);
      utterance.rate = 1;
      utterance.onstart = () => setIsReading(true);
      utterance.onend = () => setIsReading(false);
      window.speechSynthesis.speak(utterance);
    }
  }, [showInterview, currentQuestion]);

  useEffect(() => {
    if (!showInterview) {
      window.speechSynthesis.cancel();
    }
  }, [showInterview]);

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value };
      
      // If job position changes, update available tech stacks and reset tech stack selection
      if (name === 'jobPosition') {
        const newTechStacks = techStackMapping[value] || [];
        setAvailableTechStacks(newTechStacks);
        newFormData.techStack = ''; // Reset tech stack when job position changes
      }
      
      return newFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMaxQuestions(parseInt(formData.numOfQuestions, 10) || 5);

    try {
      // Reset states
      setQuestionCount(0);
      setDifficulty(3);
      setCurrentAnswer('');
      setCurrentQuestion('');
      setQuestions([]);
      setAnswers([]);
      setDetailedFeedback({ overall: '', overallScore: null, questionFeedbacks: [] });
      setIsRecording(false);

      const prompt = `
        You are an AI that generates a single interview question about:
        - Job Position: ${formData.jobPosition}
        - Job Description: ${formData.jobDescription}
        - Tech Stack: ${formData.techStack}
        - Experience: ${formData.experience}
        Use a difficulty level of ${difficulty} (1 = easiest, 10 = hardest).
        Return only the question, no extra text and question must be equal to 4 lines.
      `;
      const result = await model.generateContent(prompt);
      const firstQuestion = result.response.text().trim();
      setQuestions([firstQuestion]);
      setCurrentQuestion(firstQuestion);
      setQuestionCount(1);
      setShowMediaPrompt(true);
      setFormVisible(false);
    } catch (error) {
      console.error('Error generating first question:', error);
      alert('Could not generate the first question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMediaChoice = (choice) => {
    setShowMediaPrompt(false);
    setMediaAllowed(choice === 'allow');
    setShowInterview(true);
    if (choice === 'allow') startCamera();
  };

  // Speech recognition
  const startRecording = (callback) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(
        'Your browser does not support speech recognition. Please use a modern browser.'
      );
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        if (recognitionRef.current) recognitionRef.current.stop();

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          console.log('Speech recognition started');
          setIsRecording(true);
        };

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          console.log('Speech recognition result:', transcript);
          callback(transcript);
          updateActivity();
        };

        recognition.onnomatch = () => {
          console.log('No matching speech recognized.');
          setIsRecording(false);
        };

        recognition.onspeechend = () => {
          console.log('Speech ended, stopping recognition.');
          recognition.stop();
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          if (event.error !== 'no-speech' && event.error !== 'aborted') {
            alert(`Speech recognition error: ${event.error}`);
          }
          setIsRecording(false);
        };

        recognition.onend = () => {
          console.log('Speech recognition ended');
          setIsRecording(false);
          recognitionRef.current = null;
        };

        recognition.start();
        recognitionRef.current = recognition;
      })
      .catch((err) => {
        console.error('Error accessing microphone for speech recognition:', err);
        alert(
          'Microphone access denied. Please grant permission and try again.'
        );
        setIsRecording(false);
      });
  };

  // Interview flow handlers
  const handleNextQuestion = async () => {
    if (!currentAnswer.trim()) {
      alert('Please provide an answer before moving on.');
      return;
    }

    if (questionCount >= maxQuestions) {
      alert('You have answered all questions! Interview complete.');
      return;
    }

    setLoading(true);

    try {
      // Save current answer
      setAnswers((prev) => [...prev, currentAnswer]);

      const prompt = `
        The current difficulty is ${difficulty}.
        Question: ${currentQuestion}
        User Answer: ${currentAnswer}
        Evaluate the answer from 1 to 5 (1=very poor, 5=excellent).
        If rating < 3, reduce difficulty by 1 (min 1).
        If rating > 3, increase difficulty by 1 (max 10).
        Then generate the next interview question for:
          - Job Position: ${formData.jobPosition}
          - Job Description: ${formData.jobDescription}
          - Tech Stack: ${formData.techStack}
          - Experience: ${formData.experience}
        Return in this format:
        Rating: <score>
        NextQuestion: <question text>
      `;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text().trim();
      const lines = responseText.split('\n').map((line) => line.trim());
      const ratingLine = lines.find((line) => line.startsWith('Rating:'));
      const nextQLine = lines.find((line) => line.startsWith('NextQuestion:'));

      if (!ratingLine || !nextQLine) {
        console.error('Unexpected AI response:', responseText);
        alert('AI did not return the expected format. Please try again.');
        setLoading(false);
        return;
      }

      const rating = parseInt(ratingLine.replace('Rating:', '').trim(), 10);
      const nextQuestion = nextQLine.replace('NextQuestion:', '').trim();

      let newDifficulty = difficulty;
      if (rating < 3) newDifficulty = Math.max(1, difficulty - 1);
      else if (rating > 3) newDifficulty = Math.min(10, difficulty + 1);

      setDifficulty(newDifficulty);
      setQuestions((prev) => [...prev, nextQuestion]);
      setCurrentQuestion(nextQuestion);
      setCurrentAnswer('');
      setQuestionCount((prev) => prev + 1);
      updateActivity();
    } catch (error) {
      console.error('Error generating next question:', error);
      alert('Error generating next question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetFeedback = async () => {
    if (questions.length === 0) {
      alert('No interview questions available for feedback.');
      return;
    }

    setLoading(true);

    try {
      let prompt =
        'Please provide overall feedback and an overall score out of 10 for the following interview conversation. ' +
        'Also provide individual feedback for each question (without individual scores). ' +
        'Format your answer as follows:\n\n';
      prompt += 'Overall Feedback: <Your overall feedback here>\n';
      prompt += 'Overall Score: <Score out of 10>\n\n';

      questions.forEach((q, index) => {
        const answer =
          answers[index] ||
          (index === questionCount ? currentAnswer : 'No answer provided');
        prompt += `Q${index + 1}: ${q}\nA${index + 1}: ${answer}\nQ${index + 1} Feedback: <Your feedback for question ${index + 1} here>\n\n`;
      });

      const result = await model.generateContent(prompt);
      const feedbackText = result.response.text().trim();
      const lines = feedbackText
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line !== '');

      let overall = '';
      let overallScore = null;
      let questionFeedbacks = [];

      lines.forEach((line) => {
        if (line.startsWith('Overall Feedback:')) {
          overall = line.replace('Overall Feedback:', '').trim();
        } else if (line.startsWith('Overall Score:')) {
          const scorePart = line.replace('Overall Score:', '').trim();
          overallScore = parseInt(scorePart, 10);
        } else if (line.match(/^Q\d+\s*Feedback:/)) {
          const feedbackPart = line.replace(/Q\d+\s*Feedback:/, '').trim();
          questionFeedbacks.push(feedbackPart);
        }
      });

      // Validate that overall feedback and score are provided
      if (!overall || isNaN(overallScore)) {
        throw new Error('Incomplete overall feedback or score received from AI.');
      }

      setDetailedFeedback({ overall, overallScore, questionFeedbacks });
      setShowConfetti(true);

      // Hide confetti after 5 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    } catch (error) {
      console.error('Error generating feedback:', error);
      alert('Error generating feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
  };

  const handleSaveFeedback = async () => {
    const newAnswers = questions.map((q, index) =>
      answers[index] ||
      (index === questionCount ? currentAnswer : 'No answer provided')
    );

    if (newAnswers.length !== questions.length) {
      alert('Mismatch between number of questions and answers.');
      return;
    }

    if (!detailedFeedback.overall || detailedFeedback.overallScore === null) {
      alert('Please generate overall feedback and score before saving.');
      return;
    }

    setLoading(true);

    try {
      // Generate AI answers for each question
      const aiAnswers = await Promise.all(
        questions.map(async (q) => {
          const prompt = `Please provide a sample answer for the following interview question. Your answer should not exceed 5 lines:\n\n${q}`;
          const result = await model.generateContent(prompt);
          return result.response.text().trim();
        })
      );

      const feedbackData = {
        authenticate:
          user?.emailAddresses?.[0]?.emailAddress ||
          user?.phoneNumbers?.[0]?.phoneNumber ||
          '',
        name: formData.name,
        feedbackId: Date.now(),
        jobPosition: formData.jobPosition,
        techStack: formData.techStack,
        experience: formData.experience,
        jobDescription: formData.jobDescription,
        difficultyLevel: difficulty,
        questions: questions.length,
        questionAnswers: questions.map((q, index) => ({
          question: q,
          answer: newAnswers[index],
          answerbyAI: aiAnswers[index],
          feedback: detailedFeedback.questionFeedbacks[index] || 'No feedback provided',
        })),
        overallFeedback: detailedFeedback.overall,
        score: detailedFeedback.overallScore,
      };

      console.log('Sending feedbackData:', JSON.stringify(feedbackData, null, 2));

      const response = await fetch('http://localhost:5000/interview/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save feedback');
      }

      alert('Feedback saved successfully');
    } catch (error) {
      console.error('Error saving feedback:', error);
      alert(`Error saving feedback: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowInterview(false);
    setShowMediaPrompt(false);
    setFormVisible(true);
    setFormData({
      jobPosition: '',
      jobDescription: '',
      techStack: '',
      experience: '',
      name: '',
      numOfQuestions: 5,
    });
    setCurrentQuestion('');
    setCurrentAnswer('');
    setQuestions([]);
    setAnswers([]);
    setQuestionCount(0);
    setDifficulty(3);
    setDetailedFeedback({ overall: '', overallScore: null, questionFeedbacks: [] });
    setIsRecording(false);
    setAvailableTechStacks([]); // Reset available tech stacks

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    stopCamera();
  };

  return (
    <div className="interview-container">
      {/* Header */}
      <div className="interview-header">
        <h1>
          Professional Interview Simulator <span className="green-text">AI</span>
        </h1>
        {formVisible && (
          <p className="interview-subtitle">
            Elevate your career preparation with AI-driven mock interviews
          </p>
        )}
      </div>

      {/* Form */}
      {formVisible && (
        <div className="interview-form-container">
          <a href="/user/dash" className="back-button" style={{ textDecoration: 'none' }}>
            <ChevronLeft size={18} />
            <span>Back to Dashboard</span>
          </a>

          <form onSubmit={handleSubmit} className="interview-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="jobPosition">Job Position</label>
                <select
                  id="jobPosition"
                  name="jobPosition"
                  value={formData.jobPosition}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Job Position</option>
                  {jobPositions.map((position, idx) => (
                    <option key={idx} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="techStack">Technology Stack</label>
                <select
                  id="techStack"
                  name="techStack"
                  value={formData.techStack}
                  onChange={handleChange}
                  required
                  disabled={!formData.jobPosition}
                >
                  <option value="">Select Technology Stack</option>
                  {availableTechStacks.map((stack, idx) => (
                    <option key={idx} value={stack}>
                      {stack}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="experience">Years of Experience</label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Experience Level</option>
                  {experiences.map((exp, idx) => (
                    <option key={idx} value={exp}>
                      {exp}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="numOfQuestions">Number of Questions</label>
                <select
                  id="numOfQuestions"
                  name="numOfQuestions"
                  value={formData.numOfQuestions}
                  onChange={handleChange}
                >
                  <option value={5}>5 Questions</option>
                  <option value={10}>10 Questions</option>
                  <option value={15}>15 Questions</option>
                </select>
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="jobDescription">Job Description / Additional Details</label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                placeholder="Provide the job description or additional details to customize your interview experience"
                rows={4}
                required
              />
            </div>

            <button type="submit" className="submit-button">
              <span className='color-button'>Initiate Interview Simulation</span>
            </button>
          </form>
        </div>
      )}

      {/* Media permission prompt */}
      {showMediaPrompt && (
        <div className="overlay media-prompt">
          <div className="modal-content">
            <h2>Enable Video?</h2>
            <p>
              Would you like to enable video for a more immersive interview experience?
            </p>
            <div className="button-group">
              <button onClick={() => handleMediaChoice('allow')} className="primary-button">
                Enable Video
              </button>
              <button onClick={() => handleMediaChoice('deny')} className="secondary-button">
                Proceed Without Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading overlay */}
      {loading && (
        <div className="overlay loading">
          <div className="loader">
            <div className="spinner"></div>
            <p>Processing...</p>
          </div>
        </div>
      )}

      {/* Interview interface */}
      {showInterview && (
        <div className="overlay interview-session">
          <div className="interview-panel">
            <button className="close-button" onClick={handleClose}>
              <X size={20} />
            </button>

            <div className="interview-grid">
              {/* Left column - Question & Answer */}
              <div className="interview-qa">
                <div className="difficulty-indicator">
                  <span>Difficulty:</span>
                  <div className="difficulty-bar">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`difficulty-segment ${i < difficulty ? 'active' : ''}`}
                      ></div>
                    ))}
                  </div>
                  <span className="question-counter">
                    Question {questionCount} of {maxQuestions}
                  </span>
                </div>

                <div className="question-container">
                  <div className="question-box">
                    <h3>Question:</h3>
                    <p>{currentQuestion}</p>

                    <button
                      className={`speech-toggle ${isReading ? 'speaking' : ''}`}
                      onClick={
                        isReading
                          ? handleStopSpeaking
                          : () => {
                              window.speechSynthesis.cancel();
                              const utterance = new SpeechSynthesisUtterance(currentQuestion);
                              utterance.onstart = () => setIsReading(true);
                              utterance.onend = () => setIsReading(false);
                              window.speechSynthesis.speak(utterance);
                            }
                      }
                    >
                      {isReading ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                  </div>

                  <div className="answer-box">
                    <h3>Your Answer:</h3>
                    <div className="textarea-container">
                      <textarea
                        value={currentAnswer}
                        onChange={(e) => {
                          updateActivity();
                          setCurrentAnswer(e.target.value);
                        }}
                        onFocus={() => {
                          updateActivity();
                          if (!videoRef.current?.srcObject && mediaAllowed) {
                            startCamera();
                          }
                        }}
                        placeholder="Type your response here or use voice input..."
                        rows={5}
                      />

                      <button
                        type="button"
                        className={`mic-button ${isRecording ? 'recording' : ''}`}
                        onClick={() =>
                          startRecording((transcript) =>
                            setCurrentAnswer((prev) =>
                              prev ? prev + ' ' + transcript : transcript
                            )
                          )
                        }
                        aria-label={isRecording ? 'Stop recording' : 'Start recording'}
                        title={isRecording ? 'Stop recording' : 'Click to speak'}
                      >
                        <div>
                          <Mic size={24} color="white" />
                        </div>
                        {isRecording && <span className="recording-pulse"></span>}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column - Video & AI Avatar */}
              <div className="interview-visual">
                {mediaAllowed ? (
                  <div className="video-container">
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      playsInline
                      className="normal-video"
                    ></video>
                    <div className="video-overlay"></div>
                  </div>
                ) : (
                  <div className="avatar-placeholder">
                    <div className="avatar-circle">
                      <span>
                        {formData.name
                          ? formData.name.charAt(0).toUpperCase()
                          : 'U'}
                      </span>
                    </div>
                  </div>
                )}

                <div className={`ai-avatar ${isReading ? 'speaking' : ''}`}>
                  <div className="ai-avatar-inner">
                    <span className="ai-icon">🤖</span>
                    {isReading && (
                      <div className="sound-waves">
                        <div className="wave wave1"></div>
                        <div className="wave wave2"></div>
                        <div className="wave wave3"></div>
                      </div>
                    )}
                  </div>
                  <span className="ai-label">AI Interviewer</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="interview-actions">
              {questionCount < maxQuestions ? (
                <button className="action-button submit-answer" onClick={handleNextQuestion}>
                  <MessageSquare size={18} />
                  <span className='submit-nxt-button'>Submit & Next Question</span>
                </button>
              ) : detailedFeedback.overall === '' ? (
                <button className="action-button get-feedback" onClick={handleGetFeedback}>
                  <MessageSquare size={18} />
                  <span className='submit-nxt-button'>Generate Feedback</span>
                </button>
              ) : (
                <button className="action-button save-feedback" onClick={handleSaveFeedback}>
                  <Save size={18} />
                  <span >Save Feedback</span>
                </button>
              )}
            </div>

            {/* Feedback section */}
            {detailedFeedback.overall && (
              <div className="feedback-container">
                <h2>Interview Feedback</h2>
                <div className="overall-feedback">
                  <h3>Overall Assessment</h3>
                  <p>{detailedFeedback.overall}</p>
                  <p><strong>Overall Score:</strong> {detailedFeedback.overallScore}/10</p>
                </div>

                <div className="question-feedback">
                  <h3>Question-by-Question Feedback</h3>
                  <div className="feedback-items">
                    {detailedFeedback.questionFeedbacks.map((fb, idx) => (
                      <div key={idx} className="feedback-item">
                        <h4>Question {idx + 1}</h4>
                        <p className="question-text">{questions[idx]}</p>
                        <div className="feedback-content">
                          <p>{fb}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confetti effect when feedback is generated */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                backgroundColor:
                  i % 5 === 0
                    ? '#00cc66'
                    : i % 5 === 1
                    ? '#ffffff'
                    : i % 5 === 2
                    ? '#333333'
                    : i % 5 === 3
                    ? '#00b359'
                    : '#121212',
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}
