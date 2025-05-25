import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle, XCircle, Filter, Search, Award, Calendar, Activity, BarChart, PieChart, User } from 'lucide-react';
import './interviewQuestions.css';
import Header from '../Header';
import Footer from '../Footer';

function InterQues() {
  // State management
  const [username, setUsername] = useState('');
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('problems'); // 'problems' or 'profile'
  const [userData, setUserData] = useState(null);
  const [initialized, setInitialized] = useState(false);

  const problemsPerPage = 10;

  // Generate expanded sample problems (100 problems)
  const generateSampleProblems = (solved = false) => {
    const categories = ['Arrays', 'Linked List', 'String', 'Math', 'Dynamic Programming', 'Trees', 'Graphs', 'Greedy', 'Backtracking', 'Binary Search'];
    const difficulties = ['Easy', 'Medium', 'Hard'];
    const difficultyWeights = [0.3, 0.5, 0.2]; // 30% Easy, 50% Medium, 20% Hard

    const problems = [];
    for (let i = 1; i <= 100; i++) {
      const randomCat = categories[Math.floor(Math.random() * categories.length)];
      const diffIndex = Math.random();
      let difficulty;
      if (diffIndex < difficultyWeights[0]) difficulty = difficulties[0];
      else if (diffIndex < difficultyWeights[0] + difficultyWeights[1]) difficulty = difficulties[1];
      else difficulty = difficulties[2];

      const title = `Problem ${i}`;
      const slug = `problem-${i}`;
      const isSolved = solved ? Math.random() > 0.6 : false;

      problems.push({
        id: i,
        title,
        difficulty,
        slug,
        solved: isSolved,
        category: randomCat,
      });
    }

    // Add original problems for better titles
    const originalProblems = [
      { id: 1, title: "Two Sum", difficulty: "Easy", slug: "two-sum", solved: false, category: "Arrays" },
      { id: 2, title: "Add Two Numbers", difficulty: "Medium", slug: "add-two-numbers", solved: false, category: "Linked List" },
      { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", slug: "longest-substring-without-repeating-characters", solved: false, category: "String" },
      { id: 4, title: "Median of Two Sorted Arrays", difficulty: "Hard", slug: "median-of-two-sorted-arrays", solved: false, category: "Arrays" },
      { id: 5, title: "Longest Palindromic Substring", difficulty: "Medium", slug: "longest-palindromic-substring", solved: false, category: "String" },
      { id: 6, title: "ZigZag Conversion", difficulty: "Medium", slug: "zigzag-conversion", solved: false, category: "String" },
      { id: 7, title: "Reverse Integer", difficulty: "Medium", slug: "reverse-integer", solved: false, category: "Math" },
      { id: 8, title: "String to Integer (atoi)", difficulty: "Medium", slug: "string-to-integer-atoi", solved: false, category: "String" },
      { id: 9, title: "Palindrome Number", difficulty: "Easy", slug: "palindrome-number", solved: false, category: "Math" },
      { id: 10, title: "Regular Expression Matching", difficulty: "Hard", slug: "regular-expression-matching", solved: false, category: "String" },
      { id: 11, title: "Container With Most Water", difficulty: "Medium", slug: "container-with-most-water", solved: false, category: "Arrays" },
      { id: 12, title: "Integer to Roman", difficulty: "Medium", slug: "integer-to-roman", solved: false, category: "Math" },
      { id: 13, title: "Roman to Integer", difficulty: "Easy", slug: "roman-to-integer", solved: false, category: "Math" },
      { id: 14, title: "Longest Common Prefix", difficulty: "Easy", slug: "longest-common-prefix", solved: false, category: "String" },
      { id: 15, title: "3Sum", difficulty: "Medium", slug: "3sum", solved: false, category: "Arrays" },
    ];

    for (let i = 0; i < originalProblems.length; i++) {
      problems[i] = originalProblems[i];
    }

    return problems;
  };

  // Generate user activity data
  const generateUserActivity = (solvedProblems) => {
    const monthNames = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];
    const activeDays = Array(12).fill().map(() => Array(30).fill(0));

    // Simulate activity based on solved problems
    solvedProblems.forEach((problem) => {
      if (problem.solved) {
        const month = Math.floor(Math.random() * 12);
        const day = Math.floor(Math.random() * 30);
        activeDays[month][day] = Math.min(activeDays[month][day] + 1, 3);
      }
    });

    return { monthNames, activeDays };
  };

  // Initialize user data
  const initializeUserData = (problems) => {
    const solvedProblems = problems.filter((p) => p.solved);
    const activityData = generateUserActivity(solvedProblems);

    let totalSubmissions = 0;
    let activeSubmissionDays = 0;
    activityData.activeDays.forEach((month) => {
      month.forEach((day) => {
        if (day > 0) {
          totalSubmissions += day;
          activeSubmissionDays++;
        }
      });
    });

    const easyTotal = problems.filter((p) => p.difficulty === 'Easy').length;
    const mediumTotal = problems.filter((p) => p.difficulty === 'Medium').length;
    const hardTotal = problems.filter((p) => p.difficulty === 'Hard').length;

    const easySolved = solvedProblems.filter((p) => p.difficulty === 'Easy').length;
    const mediumSolved = solvedProblems.filter((p) => p.difficulty === 'Medium').length;
    const hardSolved = solvedProblems.filter((p) => p.difficulty === 'Hard').length;

    return {

      username: username || "leetcoder123",
      solved: solvedProblems.length,
      totalProblems: problems.length,
      easy: { solved: easySolved, total: easyTotal },
      medium: { solved: mediumSolved, total: mediumTotal },
      hard: { solved: hardSolved, total: hardTotal },
      badges: Math.floor(Math.random() * 5),
      currentStreak: Math.min(activeSubmissionDays, 13), // Cap streak for realism
      activeSubmissionDays,
      totalSubmissions,
      activeDays: activityData.activeDays,
      monthNames: activityData.monthNames,
      lockedBadge: { name: "Mar LeetCoding Challenge", imageUrl: "/badge-placeholder.png" },
      attempting: Math.floor(Math.random() * 3) + 1,
    };
  };

  // Mock API service
  const LeetCodeAPI = {
    fetchUserSolvedProblems: async (username) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (!username || username.trim() === '') {
            resolve({ success: false, message: 'Invalid username' });
          }

          const problemIds = Array.from({ length: 100 }, (_, i) => i + 1);
          const solvedCount = Math.floor(Math.random() * 20) + 5; // 5-25 solved
          const solvedProblems = problemIds
            .sort(() => Math.random() - 0.5)
            .slice(0, solvedCount);

          resolve({
            success: true,
            data: { username, solvedProblems },
          });
        }, 1500);
      });
    },
  };

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      const generatedProblems = generateSampleProblems(false);

      if (username) {
        try {
          const response = await LeetCodeAPI.fetchUserSolvedProblems(username);
          if (response.success) {
            const solvedProblemIds = new Set(response.data.solvedProblems);
            const updatedProblems = generatedProblems.map((problem) => ({
              ...problem,
              solved: solvedProblemIds.has(problem.id),
            }));
            setProblems(updatedProblems);
            setUserData(initializeUserData(updatedProblems));
          } else {
            setProblems(generatedProblems);
            setUserData(initializeUserData(generatedProblems));
            setError(response.message);
          }
        } catch (err) {
          setProblems(generatedProblems);
          setUserData(initializeUserData(generatedProblems));
          setError("Failed to fetch initial data.");
        }
      } else {
        setProblems(generatedProblems);
        setUserData(initializeUserData(generatedProblems));
      }

      setLoading(false);
      setInitialized(true);
    };

    fetchInitialData();
  }, [username]);

  // Sync userData with problems
  useEffect(() => {
    if (initialized) {
      setUserData(initializeUserData(problems));
    }
  }, [problems, initialized]);

  // Refresh problem status
  const refreshStatus = async () => {
    if (!username || username.trim() === '') {
      alert("Please enter a valid LeetCode username");
      return;
    }

    setRefreshing(true);

    try {
      const response = await LeetCodeAPI.fetchUserSolvedProblems(username);

      if (response.success) {
        const solvedProblemIds = new Set(response.data.solvedProblems);
        const updatedProblems = problems.map((problem) => ({
          ...problem,
          solved: solvedProblemIds.has(problem.id),
        }));

        setProblems(updatedProblems);
        setUserData(initializeUserData(updatedProblems));
        setCurrentPage(1); // Reset pagination
        setError(null);
        alert(`Successfully refreshed LeetCode data for ${username}`);
      } else {
        setError(response.message || "Failed to fetch data. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while refreshing data. Please try again.");
      console.error("Refresh error:", err);
    } finally {
      setRefreshing(false);
    }
  };

  // Filter problems
  const filteredProblems = problems.filter((problem) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'solved' && problem.solved) ||
      (filter === 'unsolved' && !problem.solved) ||
      (filter === 'easy' && problem.difficulty === 'Easy') ||
      (filter === 'medium' && problem.difficulty === 'Medium') ||
      (filter === 'hard' && problem.difficulty === 'Hard');

    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Pagination
  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = filteredProblems.slice(indexOfFirstProblem, indexOfLastProblem);

  // Utility functions
  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'difficulty-easy';
      case 'Medium': return 'difficulty-medium';
      case 'Hard': return 'difficulty-hard';
      default: return '';
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getActivityCellColor = (value) => {
    switch (value) {
      case 0: return 'activity-none';
      case 1: return 'activity-low';
      case 2: return 'activity-medium';
      case 3: return 'activity-high';
      default: return 'activity-none';
    }
  };

  const calculateProgress = () => {
    if (!userData) return 0;
    return (userData.solved / userData.totalProblems) * 100;
  };

  return (
    <div className="app-container">
      <Header/>
      <div className="content-wrapper">
        <header className="app-header">
          <h1>HireVerse</h1>
          <h2>LeetCode Interview Prep Tracker</h2>

          <div className="user-actions">
            <div className="username-input-container">
              <input
                type="text"
                placeholder="Your LeetCode Username"
                className="username-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <button
              onClick={refreshStatus}
              disabled={!username || refreshing}
              className={`refresh-button ${!username ? 'disabled' : ''} ${refreshing ? 'refreshing' : ''}`}
            >
              <RefreshCw size={18} className={`refresh-icon ${refreshing ? 'spinning' : ''}`} />
              Refresh Status
            </button>
          </div>

          <div className="nav-tabs">
            <button
              className={`nav-tab ${activeTab === 'problems' ? 'active' : ''}`}
              onClick={() => setActiveTab('problems')}
            >
              <Activity size={18} />
              Problems
            </button>
            <button
              className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={18} />
              Profile
            </button>
          </div>
        </header>

        {activeTab === 'problems' ? (
          <div className="problem-tracker-container">
            <div className="filters-bar">
              <div className="filter-dropdown-container">
                <Filter size={20} />
                <select
                  className="filter-dropdown"
                  value={filter}
                  onChange={(e) => {
                    setFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">All Problems</option>
                  <option value="solved">Solved</option>
                  <option value="unsolved">Unsolved</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search problems..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <Search size={18} className="search-icon" />
              </div>
            </div>

            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
              </div>
            ) : error ? (
              <div className="error-container">
                <p>{error}</p>
                <button onClick={() => window.location.reload()} className="try-again-button">
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <div className="table-container">
                  <table className="problems-table">
                    <thead>
                      <tr>
                        <th>Problem</th>
                        <th>Difficulty</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProblems.map((problem) => (
                        <tr key={problem.id} className="problem-row">
                          <td className="problem-title">
                            <div>{problem.title}</div>
                          </td>
                          <td>
                            <span className={`difficulty-badge ${getDifficultyClass(problem.difficulty)}`}>
                              {problem.difficulty}
                            </span>
                          </td>
                          <td className="problem-category">{problem.category}</td>
                          <td className="problem-status">
                            <div className="status-indicator">
                              {problem.solved ? (
                                <>
                                  <CheckCircle size={16} className="solved-icon" />
                                  <span className="solved-text">Solved</span>
                                </>
                              ) : (
                                <>
                                  <XCircle size={16} className="unsolved-icon" />
                                  <span className="unsolved-text">Not Solved</span>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="problem-action">
                            <a
                              href={`https://leetcode.com/problems/${problem.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="solve-link"
                            >
                              Solve on LeetCode
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pagination-container">
                  <div className="pagination-info">
                    Showing {indexOfFirstProblem + 1} to {Math.min(indexOfLastProblem, filteredProblems.length)} of {filteredProblems.length} problems
                  </div>
                  <nav className="pagination-controls">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
                    >
                      Previous
                    </button>
                    {Array.from({ length: Math.ceil(filteredProblems.length / problemsPerPage) }).map((_, i) => {
                      const pageNumber = i + 1;
                      if (
                        pageNumber === 1 ||
                        pageNumber === Math.ceil(filteredProblems.length / problemsPerPage) ||
                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={i}
                            onClick={() => paginate(pageNumber)}
                            className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (
                        (pageNumber === currentPage - 2 && currentPage > 3) ||
                        (pageNumber === currentPage + 2 && currentPage < Math.ceil(filteredProblems.length / problemsPerPage) - 2)
                      ) {
                        return <span key={i} className="pagination-ellipsis">...</span>;
                      }
                      return null;
                    })}
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === Math.ceil(filteredProblems.length / problemsPerPage)}
                      className={`pagination-button ${currentPage === Math.ceil(filteredProblems.length / problemsPerPage) ? 'disabled' : ''}`}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="profile-container">
            {userData && (
              <>
                <div className="profile-stats-grid">
                  <div className="progress-circle-container">
                    <div className="progress-circle">
                      <svg className="progress-ring" width="180" height="180">
                        <circle
                          className="progress-ring-bg"
                          stroke="#2a2a2a"
                          strokeWidth="8"
                          fill="transparent"
                          r="80"
                          cx="90"
                          cy="90"
                        />
                        <circle
                          className="progress-ring-circle-easy"
                          stroke="#00b8a3"
                          strokeWidth="8"
                          strokeDasharray={`${(2 * Math.PI * 80) * (userData.easy.solved / userData.totalProblems)} ${2 * Math.PI * 80}`}
                          strokeDashoffset="0"
                          fill="transparent"
                          r="80"
                          cx="90"
                          cy="90"
                        />
                        <circle
                          className="progress-ring-circle-medium"
                          stroke="#ffc01e"
                          strokeWidth="8"
                          strokeDasharray={`${(2 * Math.PI * 80) * (userData.medium.solved / userData.totalProblems)} ${2 * Math.PI * 80}`}
                          strokeDashoffset={`${-(2 * Math.PI * 80) * (userData.easy.solved / userData.totalProblems)}`}
                          fill="transparent"
                          r="80"
                          cx="90"
                          cy="90"
                        />
                        <circle
                          className="progress-ring-circle-hard"
                          stroke="#ef4743"
                          strokeWidth="8"
                          strokeDasharray={`${(2 * Math.PI * 80) * (userData.hard.solved / userData.totalProblems)} ${2 * Math.PI * 80}`}
                          strokeDashoffset={`${-(2 * Math.PI * 80) * ((userData.easy.solved + userData.medium.solved) / userData.totalProblems)}`}
                          fill="transparent"
                          r="80"
                          cx="90"
                          cy="90"
                        />
                      </svg>
                      <div className="progress-inner">
                        <div className="progress-number">
                          <span className="count">{userData.solved}</span>
                          <span className="total">/{userData.totalProblems}</span>
                        </div>
                        <div className="progress-label">Solved</div>
                        <div className="attempting-label">{userData.attempting} Attempting</div>
                      </div>
                    </div>
                  </div>

                  <div className="difficulty-stats-container">
                    <div className="difficulty-stat-box easy">
                      <div className="difficulty-label">Easy</div>
                      <div className="difficulty-numbers">
                        {userData.easy.solved}/{userData.easy.total}
                      </div>
                    </div>
                    <div className="difficulty-stat-box medium">
                      <div className="difficulty-label">Med.</div>
                      <div className="difficulty-numbers">
                        {userData.medium.solved}/{userData.medium.total}
                      </div>
                    </div>
                    <div className="difficulty-stat-box hard">
                      <div className="difficulty-label">Hard</div>
                      <div className="difficulty-numbers">
                        {userData.hard.solved}/{userData.hard.total}
                      </div>
                    </div>
                  </div>

                  <div className="badges-container">
                    <h3 className="section-title">Badges</h3>
                    <div className="badges-count">{userData.badges}</div>
                    <div className="locked-badge">
                      <div className="locked-badge-label">Locked Badge</div>
                      <div className="locked-badge-name">{userData.lockedBadge.name}</div>
                    </div>
                  </div>
                </div>

                <div className="activity-report-container">
                  <div className="activity-header">
                    <h3 className="activity-title">
                      <Activity size={18} />
                      {userData.totalSubmissions} submissions in the past one year
                    </h3>
                    <div className="activity-meta">
                      <span>Total active days: {userData.activeSubmissionDays}</span>
                      <span>Max streak: {userData.currentStreak}</span>
                    </div>
                  </div>

                  <div className="activity-calendar">
                    {userData.monthNames.map((monthName, monthIndex) => (
                      <div key={monthIndex} className="activity-month">
                        <div className="month-label">{monthName}</div>
                        <div className="month-days">
                          {userData.activeDays[monthIndex].map((day, dayIndex) => (
                            <div
                              key={`${monthIndex}-${dayIndex}`}
                              className={`activity-day ${getActivityCellColor(day)}`}
                              title={`${day} submissions on ${monthName} ${dayIndex + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="activity-legend">
                    <div className="legend-item">
                      <div className="legend-color activity-none"></div>
                      <div className="legend-label">No submissions</div>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color activity-low"></div>
                      <div className="legend-label">1-2 submissions</div>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color activity-medium"></div>
                      <div className="legend-label">3-4 submissions</div>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color activity-high"></div>
                      <div className="legend-label">5+ submissions</div>
                    </div>
                  </div>
                </div>

                <div className="activity-stats-container">
                  <div className="activity-stat-box">
                    <div className="activity-stat-value">{userData.totalSubmissions}</div>
                    <div className="activity-stat-label">Total Submissions</div>
                  </div>
                  <div className="activity-stat-box">
                    <div className="activity-stat-value">{userData.activeSubmissionDays}</div>
                    <div className="activity-stat-label">Active Days</div>
                  </div>
                  <div className="activity-stat-box">
                    <div className="activity-stat-value">{userData.currentStreak}</div>
                    <div className="activity-stat-label">Current Streak</div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default InterQues;