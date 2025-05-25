import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import "./profile.css";

function ProfileView() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    experience: "",
  });

  const [isExistingUser, setIsExistingUser] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [formData, setFormData] = useState({
    role: "",
    experience: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const roleOptions = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Data Scientist",
    "Mobile Developer"
  ];

  const experienceOptions = [1, 2, 3, 4, 5];

  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.fullName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
        phone: user.phoneNumbers?.[0]?.phoneNumber || ""
      }));
    }
  }, [user]);

  useEffect(() => {
    if (!profile.email && !profile.phone) return;
    const authenticateValue = profile.email || profile.phone;

    const fetchExistingData = async () => {
      try {
        const res = await fetch("http://localhost:5000/work/workRole/getuser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ authenticate: authenticateValue })
        });

        if (res.status === 404) {
          setIsExistingUser(false);
          return;
        }

        if (!res.ok) {
          console.log("Error fetching record:", res.status);
          return;
        }

        const result = await res.json();
        if (result.success && result.data) {
          setIsExistingUser(true);
          setProfile((prev) => ({
            ...prev,
            role: result.data.workerRole,
            experience: result.data.experience,
          }));
        }
      } catch (error) {
        console.error("Error fetching existing data:", error);
      }
    };

    fetchExistingData();
  }, [profile.email, profile.phone]);

  const handleGlobalClose = () => {
    navigate('/user/dash');
  };

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
    if (!showEditModal) {
      setFormData({
        role: profile.role || "",
        experience: profile.experience || "",
      });
      setFormErrors({});
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.role) {
      errors.role = "Please select a role";
    }
    if (!formData.experience) {
      errors.experience = "Please select experience level";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      try {
        const authenticateValue = profile.email || profile.phone;
        const endpoint = isExistingUser
          ? "http://localhost:5000/work/workRole/update"
          : "http://localhost:5000/work/workRole/create";

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            authenticate: authenticateValue,
            workerRole: formData.role,
            experience: formData.experience,
          })
        });

        if (!response.ok) {
          throw new Error(`Failed to ${isExistingUser ? "update" : "create"} data`);
        }

        const data = await response.json();
        console.log("Server response:", data);

        setIsExistingUser(true);
        setProfile((prev) => ({
          ...prev,
          role: formData.role,
          experience: formData.experience,
        }));

        toggleEditModal();
      } catch (error) {
        console.error(error);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="profile-view-app-container">
      <div className="profile-view-profile-card">
        <button className="profile-view-global-close-button" onClick={handleGlobalClose}>×</button>
        <h2 className="profile-view-profile-name">{profile.name}</h2>
        <p className="profile-view-profile-role">{profile.role}</p>

        <div className="profile-view-profile-details">
          <div className="profile-view-detail-item">
            <div className="profile-view-detail-icon">📧</div>
            <div className="profile-view-detail-content">
              <div className="profile-view-detail-label">Email</div>
              <div className="profile-view-detail-value">{profile.email}</div>
            </div>
          </div>

          <div className="profile-view-detail-item">
            <div className="profile-view-detail-icon">📱</div>
            <div className="profile-view-detail-content">
              <div className="profile-view-detail-label">Phone</div>
              <div className="profile-view-detail-value">{profile.phone}</div>
            </div>
          </div>

          <div className="profile-view-detail-item">
            <div className="profile-view-detail-icon">⏳</div>
            <div className="profile-view-detail-content">
              <div className="profile-view-detail-label">Experience</div>
              <div className="profile-view-detail-value">
                {profile.experience ? `${profile.experience} years` : ''}
              </div>
            </div>
          </div>
        </div>

        <button className="profile-view-edit-button" onClick={toggleEditModal}>
          Edit Profile
        </button>
      </div>

      {showEditModal && (
        <div className="profile-view-modal-overlay">
          <div className="profile-view-modal-content">
            <div className="profile-view-modal-header">
              <h3>Edit Profile</h3>
              <button className="profile-view-close-button" onClick={() => setShowEditModal(false)}>×</button>
            </div>

            <form onSubmit={handleSubmit} className="profile-view-edit-form">
              <div className="profile-view-form-group">
                <label htmlFor="name">Name (Non-editable)</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profile.name}
                  readOnly
                  className="profile-view-read-only-field"
                />
              </div>

              <div className="profile-view-form-group">
                <label htmlFor="email">Email (Non-editable)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  readOnly
                  className="profile-view-read-only-field"
                />
              </div>

              <div className="profile-view-form-group">
                <label htmlFor="phone">Phone (Non-editable)</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={profile.phone}
                  readOnly
                  className="profile-view-read-only-field"
                />
              </div>

              <div className="profile-view-form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className={formErrors.role ? "profile-view-input-error" : ""}
                >
                  <option value="">Select a role</option>
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                {formErrors.role && <div className="profile-view-error-message">{formErrors.role}</div>}
              </div>

              <div className="profile-view-form-group">
                <label htmlFor="experience">Experience (years)</label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className={formErrors.experience ? "profile-view-input-error" : ""}
                >
                  <option value="">Select experience</option>
                  {experienceOptions.map((exp) => (
                    <option key={exp} value={exp}>{exp}</option>
                  ))}
                </select>
                {formErrors.experience && <div className="profile-view-error-message">{formErrors.experience}</div>}
              </div>

              <div className="profile-view-form-actions">
                <button type="submit" className="profile-view-save-button">Save</button>
                <button type="button" onClick={() => setShowEditModal(false)} className="profile-view-cancel-button">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileView;
