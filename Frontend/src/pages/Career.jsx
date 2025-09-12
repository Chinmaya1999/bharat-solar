// Career.jsx
import React, { useState, useEffect } from 'react';
import './Career.css';

const Career = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
    jobId: ''
  });
  const [loading, setLoading] = useState(true);
  const [applicationError, setApplicationError] = useState('');
  const [applicationSuccess, setApplicationSuccess] = useState('');

  // Fetch job listings from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.bharatsolarsolution.com/api/jobs');
        
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        
        const jobsData = await response.json();
        setJobs(jobsData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        // Fallback to mock data if API fails
        const mockJobs = [
          {
            _id: 1,
            title: "Solar Installation Technician",
            department: "Installation",
            location: "San Francisco, CA",
            type: "Full-time",
            description: "We are seeking skilled Solar Installation Technicians to join our team. You will be responsible for installing solar panels and related equipment on residential and commercial properties.",
            requirements: [
              "2+ years of solar installation experience",
              "Knowledge of electrical systems and roofing",
              "Ability to work at heights and in various weather conditions",
              "Valid driver's license"
            ],
            benefits: [
              "Competitive pay",
              "Health insurance",
              "401(k) matching",
              "Paid time off"
            ]
          },
          {
            _id: 2,
            title: "Solar Sales Representative",
            department: "Sales",
            location: "Remote",
            type: "Full-time",
            description: "Join our sales team as a Solar Sales Representative. You will be responsible for generating leads, conducting consultations, and closing solar installation deals.",
            requirements: [
              "Proven sales experience",
              "Knowledge of solar energy systems",
              "Excellent communication skills",
              "Self-motivated and goal-oriented"
            ],
            benefits: [
              "Base salary + commission",
              "Flexible schedule",
              "Health insurance",
              "Uncapped earning potential"
            ]
          }
        ];
        setJobs(mockJobs);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setShowApplicationForm(false);
    setApplicationError('');
    setApplicationSuccess('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0]
    });
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setApplicationError('');
    setApplicationSuccess('');
    
    if (!formData.resume) {
      setApplicationError('Please upload your resume');
      return;
    }

    const submitData = new FormData();
    submitData.append('jobId', selectedJob._id);
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    submitData.append('coverLetter', formData.coverLetter);
    submitData.append('resume', formData.resume);

    try {
      const response = await fetch('https://api.bharatsolarsolution.com/api/applications', {
        method: 'POST',
        body: submitData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit application');
      }

      const result = await response.json();
      setApplicationSuccess('Application submitted successfully!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        resume: null,
        coverLetter: '',
        jobId: ''
      });
      
      // Clear file input
      document.getElementById('resume').value = '';
      
    } catch (error) {
      console.error('Error submitting application:', error);
      setApplicationError(error.message || 'Failed to submit application. Please try again.');
    }
  };

  return (
    <div className="career-page">
      <div className="career-hero">
        <div className="hero-content">
          <h1>Power Your Career with Solar Energy</h1>
          <p>Join our mission to make renewable energy accessible to everyone</p>
        </div>
      </div>

      <div className="career-container">
        <div className="job-listings">
          <h2>Current Openings</h2>
          {loading ? (
            <p>Loading job openings...</p>
          ) : jobs.length === 0 ? (
            <p>No current job openings. Please check back later.</p>
          ) : (
            <div className="jobs-grid">
              {jobs.map(job => (
                <div 
                  key={job._id} 
                  className={`job-card ${selectedJob?._id === job._id ? 'selected' : ''}`}
                  onClick={() => handleJobSelect(job)}
                >
                  <h3>{job.title}</h3>
                  <div className="job-meta">
                    <span className="department">{job.department}</span>
                    <span className="location">{job.location}</span>
                    <span className="type">{job.type}</span>
                  </div>
                  <button 
                    className="apply-now-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedJob(job);
                      setShowApplicationForm(true);
                      setApplicationError('');
                      setApplicationSuccess('');
                    }}
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="job-details">
          {selectedJob ? (
            <>
              <div className="job-detail-header">
                <h2>{selectedJob.title}</h2>
                <div className="job-meta">
                  <span>{selectedJob.department}</span>
                  <span>{selectedJob.location}</span>
                  <span>{selectedJob.type}</span>
                </div>
                <button 
                  className="apply-now-btn large"
                  onClick={() => {
                    setShowApplicationForm(true);
                    setApplicationError('');
                    setApplicationSuccess('');
                  }}
                >
                  Apply Now
                </button>
              </div>

              {!showApplicationForm ? (
                <div className="job-description">
                  <h3>Job Description</h3>
                  <p>{selectedJob.description}</p>
                  
                  <h3>Requirements</h3>
                  <ul>
                    {selectedJob.requirements && selectedJob.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                  
                  <h3>Benefits</h3>
                  <ul>
                    {selectedJob.benefits && selectedJob.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="application-form">
                  <h3>Apply for {selectedJob.title}</h3>
                  
                  {applicationError && (
                    <div className="error-message">{applicationError}</div>
                  )}
                  
                  {applicationSuccess && (
                    <div className="success-message">{applicationSuccess}</div>
                  )}
                  
                  <form onSubmit={handleSubmitApplication}>
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone">Phone *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="resume">Resume (PDF, DOC, DOCX) *</label>
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="coverLetter">Cover Letter</label>
                      <textarea
                        id="coverLetter"
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        rows="5"
                        placeholder="Tell us why you're interested in this position..."
                      />
                    </div>
                    
                    <div className="form-actions">
                      <button 
                        type="button" 
                        className="cancel-btn"
                        onClick={() => {
                          setShowApplicationForm(false);
                          setApplicationError('');
                          setApplicationSuccess('');
                        }}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="submit-btn">
                        Submit Application
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </>
          ) : (
            <div className="no-job-selected">
              <h3>Select a job to view details</h3>
              <p>Click on a job listing to see the full description and requirements</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Career;