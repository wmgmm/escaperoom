import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function SplashScreen({ onStart }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Please enter your name.';
    const emailLower = email.trim().toLowerCase();
    if (!emailLower.endsWith('@cardiff.ac.uk') && !emailLower.endsWith('@cf.ac.uk')) {
      e.email = 'Please use your Cardiff University email.';
    }
    return e;
  };

  const handleStart = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onStart({ name: name.trim(), email: email.trim() });
  };

  return (
    <div className="splash">
      <div className="splash-content">

        {/* Stamps row */}
        <div className="splash-hero">
          <div className="cover-brand-stamp cover-brand-stamp--main">THE MATTS PRESENT A DIGITAL ESCAPE ROOM</div>
          <div className="cover-brand-stamp cover-brand-stamp--uni">CARDIFF UNIVERSITY</div>
          <div className="cover-brand-stamp cover-brand-stamp--presenter">CONFIDENTIAL</div>
        </div>

        {/* Headline */}
        <div className="splash-kicker">
          EXCLUSIVE INVESTIGATION &mdash;{' '}
          <em className="splash-kicker__tagline">A Digital Escape Room using Microsoft Copilot to assist with your escape</em>
        </div>
        <h1 className="splash-headline">THE ALBRIGHT AFFAIR</h1>
        <p className="splash-deck">
          &pound;5M Grant Vanishes: A Governance Scandal in Six Acts
        </p>
        <p className="splash-byline">
          Investigation lead: <strong>Christopher Gravitas</strong>, IT Services
        </p>

        {/* 3-step instructions */}
        <ol className="splash-steps">
          <li className="splash-step">
            <span className="splash-step__num">1</span>
            <span className="splash-step__text">
              <strong>Log in to Copilot</strong> at{' '}
              <a href="https://m365copilot.com/" target="_blank" rel="noopener noreferrer" className="splash-link">
                m365copilot.com
              </a>{' '}
              <em>(On mobile: use the Microsoft Copilot app.)</em>
            </span>
          </li>
          <li className="splash-step">
            <span className="splash-step__num">2</span>
            <span className="splash-step__text">
              <strong>Download or photograph</strong> the six evidence artifacts from this dossier.
            </span>
          </li>
          <li className="splash-step">
            <span className="splash-step__num">3</span>
            <span className="splash-step__text">
              <strong>Analyse with Copilot</strong> by attaching each image and experimenting with prompts like{' '}
              <em>"Analyse this photo and extract the key names, dates, and any suspicious entries."</em>{' '}
              Find the most useful prompts to solve the case.
            </span>
          </li>
        </ol>

        {/* Name + Email */}
        <div className="splash-register">
          <p className="splash-register__label">INVESTIGATOR CREDENTIALS</p>
          <div className="splash-register__fields">
            <div className="splash-field">
              <input
                type="text"
                className={`splash-input ${errors.name ? 'splash-input--error' : ''}`}
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleStart()}
              />
              {errors.name && <span className="splash-field-error">{errors.name}</span>}
            </div>
            <div className="splash-field">
              <input
                type="email"
                className={`splash-input ${errors.email ? 'splash-input--error' : ''}`}
                placeholder="name@cardiff.ac.uk"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleStart()}
              />
              {errors.email && <span className="splash-field-error">{errors.email}</span>}
            </div>
          </div>
        </div>

        <motion.button
          className="btn-start"
          onClick={handleStart}
          whileHover={{ scale: 1.03, backgroundColor: '#000', color: '#FFFF00' }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
        >
          OPEN THE ISSUE &mdash; START TIMER 30:00
        </motion.button>

        <p className="splash-warning">
          &bull; Timer begins immediately &bull; Collaborate with Microsoft Copilot &bull;
        </p>

        <div className="splash-footer">
          <span>CONFIDENTIAL DOSSIER</span>
          <span>DO NOT REPRODUCE</span>
          <span>INTERNAL USE ONLY</span>
        </div>

      </div>
    </div>
  );
}
