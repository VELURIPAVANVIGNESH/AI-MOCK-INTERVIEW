import { useState, useEffect, useRef } from 'react';
import './aptitudeAndVerbal.css';
import Header from '../Header';
import Footer from '../Footer';

// VerbalApti Component
const VerbalApti = () => {
  const [activeTab, setActiveTab] = useState('verbal');
  const [activeTest, setActiveTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(90); // Default per-question time
  const [totalTime, setTotalTime] = useState(null); // Total test time (used for predefined tests)
  const timerRef = useRef(null);
  const [activeSyllabus, setActiveSyllabus] = useState(null);
  const [animateQuestion, setAnimateQuestion] = useState(false);

  // Verbal Syllabus Data
  const verbalSyllabus = [
    {
      id: 'synonyms',
      title: 'Synonyms & Antonyms',
      description: 'Identify similar or opposite meanings',
      link: 'https://www.geeksforgeeks.org/verbal-ability-synonyms-for-placements/',
      icon: '📚',
    },
    {
      id: 'grammar',
      title: 'Grammar & Error Spotting',
      description: 'Correct grammatical errors',
      link: 'https://www.geeksforgeeks.org/error-spotting-verbal-ability/',
      icon: '✏',
    },
    {
      id: 'comprehension',
      title: 'Reading Comprehension',
      description: 'Analyze written passages',
      link: 'https://www.geeksforgeeks.org/reading-comprehension-verbal-ability/',
      icon: '📖',
    },
    {
      id: 'vocab',
      title: 'Word Power & Usage',
      description: 'Test word meanings and usage',
      link: 'https://www.geeksforgeeks.org/vocabulary-verbal-ability/',
      icon: '🔤',
    },
    {
      id: 'analogy',
      title: 'Analogies & Relationships',
      description: 'Identify word relationships',
      link: 'https://www.geeksforgeeks.org/analogy-verbal-ability/',
      icon: '🔄',
    },
    {
      id: 'idioms',
      title: 'Idioms & Phrases',
      description: 'Understand expressions',
      link: 'https://www.geeksforgeeks.org/idioms-and-phrases-verbal-ability/',
      icon: '💬',
    },
  ];

  // Aptitude Syllabus Data
  const aptitudeSyllabus = [
    {
      id: 'numbers',
      title: 'Numbers & Operations',
      description: 'Number properties and operations',
      link: 'https://www.geeksforgeeks.org/number-system/',
      icon: '🔢',
    },
    {
      id: 'algebra',
      title: 'Equations & Algebra',
      description: 'Solve equations and concepts',
      link: 'https://www.geeksforgeeks.org/algebra-formulas-for-placements/',
      icon: '➗',
    },
    {
      id: 'geometry',
      title: 'Geometry & Mensuration',
      description: 'Calculate shapes and volumes',
      link: 'https://www.geeksforgeeks.org/geometry-and-mensuration-formulas-for-placements/',
      icon: '📐',
    },
    {
      id: 'probability',
      title: 'Probability & Odds',
      description: 'Analyze event likelihood',
      link: 'https://www.geeksforgeeks.org/probability-formulas-for-placements/',
      icon: '🎲',
    },
    {
      id: 'time',
      title: 'Time, Work and Efficiency',
      description: 'Efficiency and duration problems',
      link: 'https://www.geeksforgeeks.org/time-and-work-formulas-for-placements/',
      icon: '⏱',
    },
    {
      id: 'data',
      title: 'Data & Interpretation',
      description: 'Interpret numerical data',
      link: 'https://www.geeksforgeeks.org/data-interpretation/',
      icon: '📊',
    },
  ];

  // Practice Questions Links
  const practiceLinks = {
    verbal: [
      { title: 'Synonyms & Antonyms Practice', url: 'https://www.indiabix.com/verbal-ability/synonyms-and-antonyms/' },
      { title: 'Grammar Practice', url: 'https://www.indiabix.com/verbal-ability/spotting-errors/' },
      { title: 'Reading Comprehension Practice', url: 'https://www.indiabix.com/verbal-ability/comprehension/' },
      { title: 'Vocabulary Practice', url: 'https://www.indiabix.com/verbal-ability/ordering-of-words/' },
      { title: 'Idioms & Phrases Practice', url: 'https://www.indiabix.com/verbal-ability/idioms-and-phrases/' },
    ],
    aptitude: [
      { title: 'Number System Practice', url: 'https://www.indiabix.com/aptitude/numbers/' },
      { title: 'Algebra Practice', url: 'https://www.indiabix.com/aptitude/problems-on-ages/' },
      { title: 'Geometry Practice', url: 'https://www.indiabix.com/aptitude/area/' },
      { title: 'Time & Work Practice', url: 'https://www.indiabix.com/aptitude/time-and-work/' },
      { title: 'Probability Practice', url: 'https://www.indiabix.com/aptitude/probability/' },
      { title: 'Data Interpretation Practice', url: 'https://www.indiabix.com/aptitude/data-interpretation/' },
    ],
  };

  // Question Pools
  const verbalQuestionPool = {
    easy: [
      { text: "Choose the synonym of 'Big'", options: ["Small", "Large", "Tiny", "Short"], correctAnswer: 1 },
      { text: "Choose the antonym of 'Happy'", options: ["Joyful", "Sad", "Excited", "Content"], correctAnswer: 1 },
      { text: "Correct sentence: 'She go to school.'", options: ["She go", "to school", "She goes", "No error"], correctAnswer: 2 },
      { text: "Meaning of 'Piece of cake'", options: ["Difficult", "Easy", "Tasty", "Broken"], correctAnswer: 1 },
      { text: "Analogy: Big : Small :: Tall : ?", options: ["Short", "Long", "High", "Wide"], correctAnswer: 0 },
      { text: "Spot the error: 'I likes to read.'", options: ["I", "likes", "to read", "No error"], correctAnswer: 1 },
    ],
    medium: [
      { text: "Choose the synonym of 'Eloquent'", options: ["Silent", "Articulate", "Rough", "Vague"], correctAnswer: 1 },
      { text: "Spot the error: 'She don’t like to travel.'", options: ["She", "don’t", "like", "travel"], correctAnswer: 1 },
      { text: "Analogy: Sun : Day :: Moon : ?", options: ["Star", "Night", "Sky", "Eclipse"], correctAnswer: 1 },
      { text: "Choose the antonym of 'Candid'", options: ["Honest", "Deceptive", "Open", "Frank"], correctAnswer: 1 },
      { text: "Correct sentence: 'He go to school every day.'", options: ["He go", "to school", "every day", "He goes"], correctAnswer: 3 },
      { text: "Meaning of 'Break the ice'", options: ["Cool down", "Start conversation", "End discussion", "Freeze"], correctAnswer: 1 },
    ],
    hard: [
      { text: "Choose the synonym of 'Obsolete'", options: ["Modern", "Outdated", "New", "Current"], correctAnswer: 1 },
      { text: "Spot the error: 'Neither of the boys are present.'", options: ["Neither", "of the boys", "are", "present"], correctAnswer: 2 },
      { text: "Analogy: Doctor : Hospital :: Chef : ?", options: ["Kitchen", "Dining", "Garden", "Office"], correctAnswer: 0 },
      { text: "Choose the antonym of 'Meticulous'", options: ["Careful", "Sloppy", "Detailed", "Precise"], correctAnswer: 1 },
      { text: "Meaning of 'Bite the bullet'", options: ["Chew food", "Face a challenge", "Run away", "Give up"], correctAnswer: 1 },
      { text: "Correct sentence: 'Each of the students have a book.'", options: ["Each", "have", "a book", "has"], correctAnswer: 3 },
    ],
  };

  const aptitudeQuestionPool = {
    easy: [
      { text: "What is 10 + 15?", options: ["20", "25", "30", "35"], correctAnswer: 1 },
      { text: "What is 50% of 100?", options: ["25", "50", "75", "100"], correctAnswer: 1 },
      { text: "Next in sequence: 2, 4, 6, 8, ...", options: ["10", "12", "14", "16"], correctAnswer: 0 },
      { text: "Area of a square with side 3 cm?", options: ["6 cm²", "9 cm²", "12 cm²", "15 cm²"], correctAnswer: 1 },
      { text: "If 3 workers finish a job in 12 days, how long for 6 workers?", options: ["6 days", "8 days", "10 days", "12 days"], correctAnswer: 0 },
      { text: "A car travels 100 km in 2 hours. What is its speed?", options: ["40 km/hr", "50 km/hr", "60 km/hr", "70 km/hr"], correctAnswer: 1 },
    ],
    medium: [
      { text: "If 2x + 3 = 7, what is x?", options: ["1", "2", "3", "4"], correctAnswer: 1 },
      { text: "A car travels 240 km in 3 hours. What is its speed?", options: ["60 km/hr", "70 km/hr", "80 km/hr", "90 km/hr"], correctAnswer: 2 },
      { text: "What is 25% of 80?", options: ["15", "20", "25", "30"], correctAnswer: 1 },
      { text: "If 5 workers finish a job in 10 days, how long for 10 workers?", options: ["3 days", "4 days", "5 days", "6 days"], correctAnswer: 2 },
      { text: "Next in sequence: 1, 3, 5, 7, ...", options: ["9", "10", "11", "12"], correctAnswer: 0 },
      { text: "Area of a square with side 4 cm?", options: ["12 cm²", "16 cm²", "20 cm²", "24 cm²"], correctAnswer: 1 },
    ],
    hard: [
      { text: "Solve: 3x - 5 = 10", options: ["3", "5", "7", "9"], correctAnswer: 1 },
      { text: "What is the probability of getting heads twice in 2 coin tosses?", options: ["1/4", "1/2", "3/4", "1"], correctAnswer: 0 },
      { text: "Next in sequence: 1, 4, 9, 16, ...", options: ["20", "25", "30", "36"], correctAnswer: 1 },
      { text: "Area of a triangle with base 6 cm and height 4 cm?", options: ["12 cm²", "15 cm²", "18 cm²", "24 cm²"], correctAnswer: 0 },
      { text: "If 4 workers finish a job in 15 days, how long for 6 workers?", options: ["8 days", "9 days", "10 days", "12 days"], correctAnswer: 2 },
      { text: "A train travels 300 km in 5 hours. What is its speed?", options: ["50 km/hr", "60 km/hr", "70 km/hr", "80 km/hr"], correctAnswer: 1 },
    ],
  };

  // Generate Test Questions with No Repetition
  const generateTestQuestions = (type, level, numQuestions) => {
    const questions = [];
    const usedVerbalIndices = new Set();
    const usedAptitudeIndices = new Set();
    const verbalPool = type === 'pyq' ? verbalQuestionPool[level] : verbalQuestionPool[level];
    const aptitudePool = type === 'pyq' ? aptitudeQuestionPool[level] : aptitudeQuestionPool[level];
    const numVerbal = Math.ceil(numQuestions / 2);
    const numAptitude = numQuestions - numVerbal;

    // Generate Verbal Questions
    let verbalCount = 0;
    while (verbalCount < numVerbal && usedVerbalIndices.size < verbalPool.length) {
      let idx;
      do {
        idx = Math.floor(Math.random() * verbalPool.length);
      } while (usedVerbalIndices.has(idx));
      usedVerbalIndices.add(idx);
      const baseQuestion = verbalPool[idx];
      questions.push({
        id: questions.length + 1,
        type: 'verbal',
        text: `${baseQuestion.text} (${type.toUpperCase()} ${level.charAt(0).toUpperCase() + level.slice(1)})`,
        options: baseQuestion.options,
        correctAnswer: baseQuestion.correctAnswer
      });
      verbalCount++;
    }

    // Generate Aptitude Questions
    let aptitudeCount = 0;
    while (aptitudeCount < numAptitude && usedAptitudeIndices.size < aptitudePool.length) {
      let idx;
      do {
        idx = Math.floor(Math.random() * aptitudePool.length);
      } while (usedAptitudeIndices.has(idx));
      usedAptitudeIndices.add(idx);
      const baseQuestion = aptitudePool[idx];
      questions.push({
        id: questions.length + 1,
        type: 'aptitude',
        text: `${baseQuestion.text} (${type.toUpperCase()} ${level.charAt(0).toUpperCase() + level.slice(1)})`,
        options: baseQuestion.options,
        correctAnswer: baseQuestion.correctAnswer,
      });
      aptitudeCount++;
    }

    // If we run out of questions, we'll repeat the process with a warning
    if (questions.length < numQuestions) {
      console.warn("Not enough unique questions available. Consider expanding the question pool.");
    }

    return questions.slice(0, numQuestions);
  };

  // Assessment Tests (PYQs and Practice Tests)
  const assessments = [
    { id: 1, title: "Basic PYQ Assessment", description: "Previous year questions for beginners", questions: generateTestQuestions('pyq', 'easy', 30), icon: '📜', type: 'pyq' },
    { id: 2, title: "Medium PYQ Assessment", description: "Moderate previous year questions", questions: generateTestQuestions('pyq', 'medium', 30), icon: '📜', type: 'pyq' },
    { id: 3, title: "Advanced PYQ Assessment", description: "Challenging past questions", questions: generateTestQuestions('pyq', 'hard', 30), icon: '📜', type: 'pyq' },
    { id: 4, title: "Basic Practice Test", description: "Fundamental practice questions", questions: generateTestQuestions('practice', 'easy', 30), icon: '✏', type: 'practice' },
    { id: 5, title: "Medium Practice Test", description: "Moderate practice evaluation", questions: generateTestQuestions('practice', 'medium', 30), icon: '✏', type: 'practice' },
    { id: 6, title: "Advanced Practice Test", description: "In-depth practice evaluation", questions: generateTestQuestions('practice', 'hard', 30), icon: '✏', type: 'practice' },
  ];

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Timer effect
  useEffect(() => {
    if (activeTest && !showResults) {
      setTimeRemaining(90); // Default per-question timer
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleNextQuestion();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeTest, currentQuestionIndex, showResults]);

  // Question animation
  useEffect(() => {
    if (activeTest && !showResults) {
      setAnimateQuestion(true);
      const timer = setTimeout(() => setAnimateQuestion(false), 300);
      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex, activeTest]);

  const startTest = (test) => {
    setActiveTest(test);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
    setTotalTime(null);
    setActiveTab('assessment');
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setUserAnswers({ ...userAnswers, [questionId]: answerIndex });
  };

  const handleNextQuestion = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (currentQuestionIndex < activeTest.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevQuestion = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    return activeTest.questions.reduce((score, question) => {
      return userAnswers[question.id] === question.correctAnswer ? score + 1 : score;
    }, 0);
  };

  const resetTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveTest(null);
    setShowResults(false);
    setTotalTime(null);
  };

  const openSyllabus = (topic) => setActiveSyllabus(topic);
  const closeSyllabus = () => setActiveSyllabus(null);
  const navigateToLink = (url) => window.open(url, '_blank');

  const getTimerClass = () => {
    const threshold = 10;
    const warningThreshold = 30;
    if (timeRemaining <= threshold) return 'timer-critical';
    if (timeRemaining <= warningThreshold) return 'timer-warning';
    return '';
  };

  return (
    <div>
      <Header />
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">
            <span className="glow-text">IntelliHire</span> Assessment Center
          </h1>
          <p className="app-subtitle">Prepare, Practice, and Excel in Your Interviews</p>
        </header>

        <div className="app-main">
          <div className="tab-navigation">
            <button
              className={`tab-button ${activeTab === 'verbal' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('verbal');
                resetTest();
              }}
            >
              <span className="tab-icon">💬</span>
              <span className="tab-text">Verbal</span>
            </button>
            <button
              className={`tab-button ${activeTab === 'aptitude' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('aptitude');
                resetTest();
              }}
            >
              <span className="tab-icon">🧮</span>
              <span className="tab-text">Aptitude</span>
            </button>
            <button
              className={`tab-button ${activeTab === 'assessment' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('assessment');
                resetTest();
              }}
            >
              <span className="tab-icon">📝</span>
              <span className="tab-text">Assessment</span>
            </button>
          </div>

          <div className="content-area">
            {activeTab === 'verbal' && !activeTest && (
              <div className="section-container fade-in">
                <div className="section-header">
                  <h2 className="section-title">Verbal Assessment</h2>
                  <p className="section-description">
                    Enhance your verbal reasoning skills with our comprehensive resources and assessments.
                  </p>
                </div>
                <div className="cards-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="card syllabus-card">
                    <div className="card-header">
                      <h3 className="card-title">
                        <span className="card-icon">📚</span>
                        Syllabus
                      </h3>
                    </div>
                    <div className="card-content syllabus-items">
                      {verbalSyllabus.map((topic) => (
                        <div key={topic.id} className="syllabus-item" onClick={() => openSyllabus(topic)}>
                          <span className="syllabus-icon">{topic.icon}</span>
                          <h4 className="syllabus-title">{topic.title}</h4>
                          <p className="syllabus-description">{topic.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card practice-card">
                    <div className="card-header">
                      <h3 className="card-title">
                        <span className="card-icon">🔍</span>
                        Practice Questions
                      </h3>
                    </div>
                    <div className="card-content practice-links">
                      {practiceLinks.verbal.map((link, index) => (
                        <button key={index} className="practice-link-button" onClick={() => navigateToLink(link.url)}>
                          <span className="practice-icon">✏</span>
                          {link.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'aptitude' && !activeTest && (
              <div className="section-container fade-in">
                <div className="section-header">
                  <h2 className="section-title">Aptitude Assessment</h2>
                  <p className="section-description">
                    Develop your quantitative and analytical reasoning abilities with our specialized resources.
                  </p>
                </div>
                <div className="cards-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="card syllabus-card">
                    <div className="card-header">
                      <h3 className="card-title">
                        <span className="card-icon">📐</span>
                        Syllabus
                      </h3>
                    </div>
                    <div className="card-content syllabus-items">
                      {aptitudeSyllabus.map((topic) => (
                        <div key={topic.id} className="syllabus-item" onClick={() => openSyllabus(topic)}>
                          <span className="syllabus-icon">{topic.icon}</span>
                          <h4 className="syllabus-title">{topic.title}</h4>
                          <p className="syllabus-description">{topic.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card practice-card">
                    <div className="card-header">
                      <h3 className="card-title">
                        <span className="card-icon">🔍</span>
                        Practice Questions
                      </h3>
                    </div>
                    <div className="card-content practice-links">
                      {practiceLinks.aptitude.map((link, index) => (
                        <button key={index} className="practice-link-button" onClick={() => navigateToLink(link.url)}>
                          <span className="practice-icon">✏</span>
                          {link.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'assessment' && !activeTest && (
              <div className="section-container fade-in">
                <div className="section-header">
                  <h2 className="section-title">Assessments & Practice Tests</h2>
                  <p className="section-description">
                    Evaluate your skills with Previous Year Questions (PYQs) or Practice Tests.
                  </p>
                </div>

                <div className="complete-tests-container">
                  {assessments.map((test) => (
                    <div key={test.id} className="complete-test-item" onClick={() => startTest(test)}>
                      <div className="test-header">
                        <span className="test-icon">{test.icon}</span>
                        <h3 className="test-title">{test.title}</h3>
                      </div>
                      <p className="test-description">{test.description}</p>
                      <div className="test-footer">
                        <div className="test-meta">
                          <div className="test-meta-item">
                            <span className="meta-icon">📝</span>
                            30 questions
                          </div>
                          <div className="test-meta-item">
                            <span className="meta-icon">⏱</span>
                            1:30 per question
                          </div>
                        </div>
                        <button className="start-button">Start Test</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTest && !showResults && (
              <div className="test-container fade-in">
                <div className="test-header">
                  <div className="test-info">
                    <h2 className="test-title">{activeTest.title}</h2>
                    <p className="question-counter">
                      Question {currentQuestionIndex + 1} of {activeTest.questions.length}
                    </p>
                  </div>
                  <button className="exit-button" onClick={resetTest}>
                    Exit Test
                  </button>
                </div>

                <div className={`question-container ${animateQuestion ? 'question-animate' : ''}`}>
                  <div className="question-type-badge">
                    <span className="question-type">
                      {activeTest.questions[currentQuestionIndex].type === 'verbal' ? 'Verbal' : 'Aptitude'}
                    </span>
                  </div>

                  <div className="timer-container">
                    <div className="timer-label">
                      Time remaining:
                      <span className={`timer-value ${getTimerClass()}`}>
                        {formatTime(timeRemaining)}
                      </span>
                    </div>
                    <div className="timer-bar-container">
                      <div
                        className={`timer-bar ${getTimerClass()}`}
                        style={{ width: `${(timeRemaining / 90) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <h3 className="question-text">{activeTest.questions[currentQuestionIndex].text}</h3>

                  <div className="options-container">
                    {activeTest.questions[currentQuestionIndex].options.map((option, index) => (
                      <button
                        key={index}
                        className={`option-button ${userAnswers[activeTest.questions[currentQuestionIndex].id] === index ? 'selected' : ''}`}
                        onClick={() => handleAnswerSelect(activeTest.questions[currentQuestionIndex].id, index)}
                      >
                        <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                        {option}
                      </button>
                    ))}
                  </div>

                  <div className="navigation-buttons">
                    <button
                      className="nav-button prev-button"
                      onClick={handlePrevQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      <span className="nav-icon">←</span>
                      Previous
                    </button>
                    <button className="nav-button next-button" onClick={handleNextQuestion}>
                      {currentQuestionIndex === activeTest.questions.length - 1 ? 'Finish' : 'Next'}
                      {currentQuestionIndex < activeTest.questions.length - 1 && <span className="nav-icon">→</span>}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showResults && (
              <div className="results-container fade-in">
                <h2 className="results-title">Test Completed!</h2>
                <div className="results-content">
                  <div className="score-container">
                    <div className="score-display">
                      <div className="score-circle">
                        <div className="score-value">
                          {calculateScore()}/{activeTest.questions.length}
                        </div>
                        <div className="score-percentage">
                          {Math.round((calculateScore() / activeTest.questions.length) * 100)}%
                        </div>
                      </div>
                    </div>
                    <p className="score-message">
                      {calculateScore() >= activeTest.questions.length * 0.8
                        ? 'Excellent work! You’re well prepared!'
                        : calculateScore() >= activeTest.questions.length * 0.6
                        ? 'Good effort! Keep practicing to improve further.'
                        : 'Keep practicing! Review the syllabus materials to strengthen your skills.'}
                    </p>
                  </div>
                  <div className="breakdown-container">
                    <h3 className="breakdown-title">Performance Breakdown</h3>
                    <div className="breakdown-scores">
                      <div className="breakdown-item">
                        <h4 className="breakdown-category">Verbal Score</h4>
                        <div className="breakdown-value">
                          {activeTest.questions.filter((q) => q.type === 'verbal' && userAnswers[q.id] === q.correctAnswer).length}/
                          {activeTest.questions.filter((q) => q.type === 'verbal').length}
                        </div>
                      </div>
                      <div className="breakdown-item">
                        <h4 className="breakdown-category">Aptitude Score</h4>
                        <div className="breakdown-value">
                          {activeTest.questions.filter((q) => q.type === 'aptitude' && userAnswers[q.id] === q.correctAnswer).length}/
                          {activeTest.questions.filter((q) => q.type === 'aptitude').length}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="results-actions">
                    <button
                      className="review-button action-button"
                      onClick={() => {
                        setCurrentQuestionIndex(0);
                        setShowResults(false);
                      }}
                    >
                      Review Answers
                    </button>
                    <button className="restart-button action-button" onClick={resetTest}>
                      Return to Assessments
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {activeSyllabus && (
          <div className="modal-overlay" onClick={closeSyllabus}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">
                  <span className="modal-icon">{activeSyllabus.icon}</span>
                  {activeSyllabus.title}
                </h2>
                <button className="close-button" onClick={closeSyllabus}>×</button>
              </div>
              <div className="modal-body">
                <p className="modal-description">{activeSyllabus.description}</p>
                <div className="modal-actions">
                  <button className="action-button syllabus-link-button" onClick={() => navigateToLink(activeSyllabus.link)}>
                    View Full Syllabus
                  </button>
                  <button className="action-button close-modal-button" onClick={closeSyllabus}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default VerbalApti;