import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "../style/inter.scss";
import { useInterview } from "../hooks/useInterview";

// Mock report matching the API response shape


const SECTIONS = {
  TECHNICAL: "technical",
  BEHAVIORAL: "behavioral",
  ROADMAP: "roadmap",
};



const Interview = () => {
  const [activeSection, setActiveSection] = useState(SECTIONS.TECHNICAL);
  const [expandedIdx, setExpandedIdx] = useState(null);
  const { report, loading, getReportById } = useInterview();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) getReportById(interviewId);
  }, [interviewId]);

  const toggleExpand = (idx) => setExpandedIdx(expandedIdx === idx ? null : idx);

  if (loading) {
    return (
      <main className="inter">
        <div className="inter__card inter__card--center">
          <p className="inter__loading">Loading report...</p>
        </div>
      </main>
    );
  }

  if (!report) {
    return (
      <main className="inter">
        <div className="inter__card inter__card--center">
          <p className="inter__loading">No report found.</p>
        </div>
      </main>
    );
  }

  const renderContent = () => {
    if (activeSection === SECTIONS.TECHNICAL) {
      return (
        <div className="inter__questions">
          {report.technicalQuestions.map((item, idx) => (
            <div key={idx} className="inter__question-card">
              <button
                className="inter__question-header"
                onClick={() => toggleExpand(idx)}
              >
                <span className="inter__question-num">Q{idx + 1}</span>
                <span className="inter__question-text">{item.question}</span>
                <span className="inter__chevron">{expandedIdx === idx ? "▲" : "▼"}</span>
              </button>
              {expandedIdx === idx && (
                <div className="inter__question-body">
                  <p className="inter__intention">
                    <span className="inter__label">🎯 Intent:</span> {item.intention}
                  </p>
                  <p className="inter__answer">
                    <span className="inter__label">💬 Answer:</span> {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (activeSection === SECTIONS.BEHAVIORAL) {
      return (
        <div className="inter__questions">
          {report.behavioralQuestions.map((item, idx) => (
            <div key={idx} className="inter__question-card">
              <button
                className="inter__question-header"
                onClick={() => toggleExpand(idx)}
              >
                <span className="inter__question-num">Q{idx + 1}</span>
                <span className="inter__question-text">{item.question}</span>
                <span className="inter__chevron">{expandedIdx === idx ? "▲" : "▼"}</span>
              </button>
              {expandedIdx === idx && (
                <div className="inter__question-body">
                  <p className="inter__intention">
                    <span className="inter__label">🎯 Intent:</span> {item.intention}
                  </p>
                  <p className="inter__answer">
                    <span className="inter__label">💬 Answer:</span> {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (activeSection === SECTIONS.ROADMAP) {
      return (
        <div className="inter__roadmap">
          {report.preparationPlan.map((plan) => (
            <div key={plan.day} className="inter__plan-card">
              <div className="inter__plan-header">
                <span className="inter__plan-day">Day {plan.day}</span>
                <span className="inter__plan-focus">{plan.focus}</span>
              </div>
              <ul className="inter__plan-tasks">
                {plan.task.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <main className="inter">
      <div className="inter__card">
        {/* Left sidebar – navigation */}
        <aside className="inter__sidebar inter__sidebar--left">
          <p className="inter__sidebar-heading">SECTIONS</p>
          <nav className="inter__nav">
            <button
              className={`inter__nav-btn ${activeSection === SECTIONS.TECHNICAL ? "inter__nav-btn--active" : ""}`}
              onClick={() => { setActiveSection(SECTIONS.TECHNICAL); setExpandedIdx(null); }}
            >
              <span className="inter__nav-icon">&lt;/&gt;</span>
              Technical Questions
            </button>
            <button
              className={`inter__nav-btn ${activeSection === SECTIONS.BEHAVIORAL ? "inter__nav-btn--active" : ""}`}
              onClick={() => { setActiveSection(SECTIONS.BEHAVIORAL); setExpandedIdx(null); }}
            >
              <span className="inter__nav-icon">💬</span>
              Behavioral Questions
            </button>
            <button
              className={`inter__nav-btn ${activeSection === SECTIONS.ROADMAP ? "inter__nav-btn--active" : ""}`}
              onClick={() => { setActiveSection(SECTIONS.ROADMAP); setExpandedIdx(null); }}
            >
              <span className="inter__nav-icon">🧭</span>
              Road Map
            </button>
          </nav>
        </aside>

        {/* Center – main content */}
        <section className="inter__main">
          <div className="inter__main-header">
            <h2 className="inter__section-title">
              {activeSection === SECTIONS.TECHNICAL && "Technical Questions"}
              {activeSection === SECTIONS.BEHAVIORAL && "Behavioral Questions"}
              {activeSection === SECTIONS.ROADMAP && "Preparation Road Map"}
            </h2>
            {activeSection === SECTIONS.TECHNICAL && (
              <span className="inter__count-badge">{report.technicalQuestions.length} questions</span>
            )}
            {activeSection === SECTIONS.BEHAVIORAL && (
              <span className="inter__count-badge">{report.behavioralQuestions.length} questions</span>
            )}
            {activeSection === SECTIONS.ROADMAP && (
              <span className="inter__count-badge">{report.preparationPlan.length} days</span>
            )}
          </div>
          <hr className="inter__divider" />
          {renderContent()}
        </section>

        {/* Right sidebar – score + skill gaps */}
        <aside className="inter__sidebar inter__sidebar--right">
          <p className="inter__sidebar-heading">MATCH SCORE</p>
          <div className="inter__score-ring">
            <svg viewBox="0 0 36 36" className="inter__score-svg">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#30363d" strokeWidth="2.5" />
              <circle
                cx="18" cy="18" r="15.9" fill="none"
                stroke="#22c55e" strokeWidth="2.5"
                strokeDasharray={`${report.matchScore} ${100 - report.matchScore}`}
                strokeDashoffset="25"
                strokeLinecap="round"
              />
            </svg>
            <div className="inter__score-label">
              <span className="inter__score-value">{report.matchScore}</span>
              <span className="inter__score-pct">%</span>
            </div>
        </div>
        <p className="inter__score-desc">Strong match for this role</p>

          <p className="inter__sidebar-heading inter__sidebar-heading--gap">SKILL GAPS</p>
          <div className="inter__skill-tags">
            {report.skillGap.map((item, idx) => (
              <span key={idx} className={`inter__skill-tag inter__skill-tag--${item.severity}`}>
                {item.skill}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Interview;
