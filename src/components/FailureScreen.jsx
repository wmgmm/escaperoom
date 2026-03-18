import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Leaderboard from './Leaderboard.jsx';
import HintReveal from './HintReveal.jsx';
import { getGravitasQuote } from '../data/gravitas.js';

function loadBoard() {
  try { return JSON.parse(localStorage.getItem('escaperoom_leaderboard') || '[]'); }
  catch { return []; }
}

export default function FailureScreen({ onRestart, timeExpired, result, attemptCount }) {
  const [board, setBoard] = useState([]);
  const [quote] = useState(() => getGravitasQuote(attemptCount || 1));
  useEffect(() => { window.scrollTo(0, 0); setBoard(loadBoard()); }, []);

  return (
    <div className="outcome-screen outcome-screen--failure">
      <motion.div
        className="outcome-inner"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="outcome-kicker outcome-kicker--failure">
          {timeExpired ? 'TIME EXPIRED' : 'INVESTIGATION FAILED'}
        </div>
        <h1 className="outcome-headline outcome-headline--failure">REDACTED</h1>
        <div className="outcome-rule outcome-rule--failure" />
        <p className="outcome-deck outcome-deck--failure">
          {timeExpired ? 'Deadline Missed. The grant window has closed.' : 'Incorrect Findings. Opportunity Lost.'}
        </p>

        {result && (
          <div className="outcome-result-card outcome-result-card--failure">
            <div className="outcome-result-card__row">
              <span className="outcome-result-card__key">Investigator</span>
              <span className="outcome-result-card__val">{result.name}</span>
            </div>
            <div className="outcome-result-card__row">
              <span className="outcome-result-card__key">Time taken</span>
              <span className="outcome-result-card__val">{result.timeTaken}</span>
            </div>
            <div className="outcome-result-card__row">
              <span className="outcome-result-card__key">Your failure</span>
              <span className="outcome-result-card__val">{result.failure || '—'}</span>
            </div>
            <div className="outcome-result-card__row">
              <span className="outcome-result-card__key">Your location</span>
              <span className="outcome-result-card__val">{result.location || '—'}</span>
            </div>
            {result.prompt && (
              <div className="outcome-result-card__row outcome-result-card__row--prompt">
                <span className="outcome-result-card__key">Best prompt</span>
                <span className="outcome-result-card__val outcome-result-card__val--prompt">&ldquo;{result.prompt}&rdquo;</span>
              </div>
            )}
          </div>
        )}

        <blockquote className="outcome-quote outcome-quote--failure">
          &ldquo;{quote}&rdquo;
          <cite>— Christopher Gravitas, IT Services (formerly Dept. of Physics)</cite>
        </blockquote>

        <div className="outcome-stamp outcome-stamp--failure">REDACTED</div>

        {board.length > 0 && <Leaderboard board={board} dark={true} />}

        <motion.button
          className="btn-restart btn-restart--failure"
          onClick={onRestart}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          REOPEN THE CASE
        </motion.button>
      </motion.div>
    </div>
  );
}
