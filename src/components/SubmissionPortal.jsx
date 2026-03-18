import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FAILURE_OPTIONS = [
  { value: '', label: '-- Select the root cause --' },
  { value: 'Unsanctioned AI Tool Usage', label: 'Unsanctioned AI Tool Usage' },
  { value: 'Budget Misallocation', label: 'Budget Misallocation' },
  { value: 'Data Breach via External Vendor', label: 'Data Breach via External Vendor' },
  { value: 'Regulatory Non-Compliance', label: 'Regulatory Non-Compliance' },
  { value: 'Internal Fraud', label: 'Internal Fraud' },
];

export default function SubmissionPortal({ onSubmit }) {
  const [failure, setFailure] = useState('');
  const [threat, setThreat] = useState('');
  const [location, setLocation] = useState('');
  const [prompt, setPrompt] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!failure) e.failure = 'Select the root cause.';
    if (!threat.trim()) e.threat = 'Describe the threat.';
    if (!location.trim()) e.location = 'Specify the location.';
    if (!prompt.trim()) e.prompt = 'Share the prompt that helped you most.';
    return e;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    onSubmit({ failure, threat, location, prompt });
  };

  return (
    <section className="submission-portal">
      <div className="submission-portal__header">
        <h2 className="submission-portal__title">SUBMIT YOUR FINDINGS</h2>
        <p className="submission-portal__sub">
          All four fields required. One chance. Choose carefully.
        </p>
      </div>

      <form className="submission-form" onSubmit={handleSubmit} noValidate>

        <div className="form-field">
          <label className="form-label" htmlFor="field-failure">
            I &mdash; THE FAILURE
            <span className="form-label__hint">What caused the governance crisis?</span>
          </label>
          <select
            id="field-failure"
            className={`form-select ${errors.failure ? 'form-select--error' : ''}`}
            value={failure}
            onChange={e => setFailure(e.target.value)}
            aria-required="true"
            aria-invalid={errors.failure ? 'true' : undefined}
            aria-describedby={errors.failure ? 'err-failure' : undefined}
          >
            {FAILURE_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.failure && <span id="err-failure" className="form-error" role="alert">{errors.failure}</span>}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="field-threat">
            II &mdash; THE THREAT
            <span className="form-label__hint">What is at stake if this reaches the press?</span>
          </label>
          <input
            id="field-threat"
            type="text"
            className={`form-input ${errors.threat ? 'form-input--error' : ''}`}
            value={threat}
            onChange={e => setThreat(e.target.value)}
            placeholder="e.g. Withdrawal of the &pound;5M UKRI grant"
            aria-required="true"
            aria-invalid={errors.threat ? 'true' : undefined}
            aria-describedby={errors.threat ? 'err-threat' : undefined}
          />
          {errors.threat && <span id="err-threat" className="form-error" role="alert">{errors.threat}</span>}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="field-location">
            III &mdash; THE LOCATION
            <span className="form-label__hint">Where is the backup of the grant application?</span>
          </label>
          <input
            id="field-location"
            type="text"
            className={`form-input ${errors.location ? 'form-input--error' : ''}`}
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="e.g. Server Room B"
            aria-required="true"
            aria-invalid={errors.location ? 'true' : undefined}
            aria-describedby={errors.location ? 'err-location' : undefined}
          />
          {errors.location && <span id="err-location" className="form-error" role="alert">{errors.location}</span>}
        </div>

        <div className="form-field form-field--full">
          <label className="form-label" htmlFor="field-prompt">
            IV &mdash; YOUR BEST PROMPT
            <span className="form-label__hint">The Copilot prompt that gave you the most useful insight.</span>
          </label>
          <textarea
            id="field-prompt"
            className={`form-textarea ${errors.prompt ? 'form-textarea--error' : ''}`}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder={`e.g. "Analyse this image and extract a bulleted list of all names, dates, and monetary amounts mentioned."`}
            rows={3}
            aria-required="true"
            aria-invalid={errors.prompt ? 'true' : undefined}
            aria-describedby={errors.prompt ? 'err-prompt' : undefined}
          />
          {errors.prompt && <span id="err-prompt" className="form-error" role="alert">{errors.prompt}</span>}
        </div>

        <div className="form-actions">
          <motion.button
            type="submit"
            className="btn-submit"
            whileHover={{ scale: 1.02, backgroundColor: '#FFFF00', color: '#000' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            FILE REPORT &mdash; SUBMIT NOW
          </motion.button>
          <p className="form-disclaimer">
            Incorrect answers will trigger case closure. This action cannot be undone.
          </p>
        </div>

      </form>
    </section>
  );
}
