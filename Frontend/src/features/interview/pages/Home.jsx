import "../style/home.scss";
import { useEffect, useState, useRef } from "react";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";


const Home = () => {
  const { loading, generatereport, reports, getAllReports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    getAllReports();
  }, []);

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current?.files?.[0];
    const createdReport = await generatereport({
      jobDescription,
      resumeFile,
      selfDescription,
    });

    if (createdReport?._id) {
      navigate(`/interview/${createdReport._id}`);
    }
  };


  if(loading){
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    )
  }

  return (
    <main className="home">
      {/* Header */}
      <header className="home__header">
        <h1 className="home__title">
          Create Your Custom{" "}
          <span className="home__title--accent">Interview Plan</span>
        </h1>
        <p className="home__subtitle">
          Let our AI analyze the job requirements and your unique profile to
          <br />
          build a winning strategy.
        </p>
      </header>

      {/* Main card */}
      <div className="home__card">
        {/* Left panel – Job Description */}
        <div className="home__panel home__panel--left">
          <div className="home__panel-header">
            <span className="home__panel-icon">🧳</span>
            <h2 className="home__panel-title">Target Job Description</h2>
            <span className="home__badge home__badge--required">REQUIRED</span>
          </div>
          <textarea
          onChange={(e)=>{setJobDescription(e.target.value)}}
            className="home__textarea"
            name="jobDescription"
            id="jobDescription"
            maxLength={5000}
            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
          />
          <p className="home__char-count">0 / 5000 chars</p>
        </div>

        {/* Right panel – Your Profile */}
        <div className="home__panel home__panel--right">
          <div className="home__panel-header">
            <span className="home__panel-icon">👤</span>
            <h2 className="home__panel-title">Your Profile</h2>
          </div>

          {/* Upload Resume */}
          <div className="home__upload-section">
            <p className="home__section-label">
              Upload Resume{" "}
              <span className="home__badge home__badge--best">
                BEST RESULTS
              </span>
            </p>
            <label htmlFor="resume" className="home__dropzone">
              <span className="home__dropzone-icon">☁️</span>
              <span className="home__dropzone-text">
                Click to upload or drag &amp; drop
              </span>
              <span className="home__dropzone-hint">PDF or DOCX (Max 3MB)</span>
            </label>
            <input
            ref={resumeInputRef}
              hidden
              type="file"
              name="resume"
              id="resume"
              accept=".pdf,.docx"
            />
          </div>

          {/* OR divider */}
          <div className="home__divider">
            <span className="home__divider-text">OR</span>
          </div>

          {/* Quick Self-Description */}
          <div className="home__self-desc">
            <p className="home__section-label">Quick Self-Description</p>
            <textarea
            onChange={(e)=>{setSelfDescription(e.target.value)}}
              className="home__textarea home__textarea--short"
              name="selfDescription"
              id="selfDescription"
              placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
            />
          </div>

          {/* Info note */}
          <div className="home__info-note">
            <span className="home__info-icon">ℹ️</span>
            <p>
              Either a <strong>Resume</strong> or a{" "}
              <strong>Self Description</strong> is required to generate a
              personalized plan.
            </p>
          </div>
        </div>
      </div>


      

      {/* Footer bar */}
      <div className="home__footer-bar">
        <p className="home__footer-text">
          AI-Powered Strategy Generation • Approx 30s
        </p>
        <button
          onClick={handleGenerateReport}
          disabled={loading}
          className="button primary-button home__generate-btn"
        >
          ★ Generate My Interview Strategy
        </button>
      </div>

      {/* If there are existing reports, show a quick access section */}
      {reports.length > 0 && (
        <div className="recent-reports">
          <h2 className="home__section-title">My recent interview plans.</h2>
          <div className="recent-report-list">
            {reports.map((report) => (
              <div
                key={report._id}
                className="home-report-card"
                onClick={() => navigate(`/interview/${report._id}`)}
              >
                <h3 className="home__report-title">{report.title || "Untitled Report"}</h3>
                <p className="home__report-date">
                  Created on {new Date(report.createdAt).toLocaleDateString()}
                </p>
                <p className="match-score">Match Score: {report.matchScore}%</p>
              </div>
            ))}
          </div>
        </div>
      )}  

      {/* Bottom links */}
      <nav className="home__bottom-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Help Center</a>
      </nav>
    </main>
  );
};

export default Home;
