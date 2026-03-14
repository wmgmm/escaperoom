import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Leaderboard from './Leaderboard.jsx';
import { loadLocalBoard, loadBoard } from '../lib/leaderboard.js';

export default function SuccessScreen({ onRestart, player, result }) {
  const init = loadLocalBoard();
  const [board, setBoard] = useState(init.entries);
  const [boardSource, setBoardSource] = useState(init.source);
  useEffect(() => {
    loadBoard().then(({ entries, source }) => { setBoard(entries); setBoardSource(source); });
  }, []);

  return (
    <div className="outcome-screen outcome-screen--success">
      <motion.div
        className="outcome-inner"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="outcome-kicker outcome-kicker--success">CASE CLOSED</div>
        <h1 className="outcome-headline outcome-headline--success">SCANDAL<br/>CONTAINED</h1>
        <div className="outcome-rule" />
        <p className="outcome-deck">Governance Restored. Grant Submitted.</p>

        {result && (
          <div className="outcome-result-card">
            <div className="outcome-result-card__row">
              <span className="outcome-result-card__key">Investigator</span>
              <span className="outcome-result-card__val">{result.name}</span>
            </div>
            <div className="outcome-result-card__row">
              <span className="outcome-result-card__key">Time taken</span>
              <span className="outcome-result-card__val">{result.timeTaken}</span>
            </div>
            <div className="outcome-result-card__row">
              <span className="outcome-result-card__key">Time remaining</span>
              <span className="outcome-result-card__val outcome-result-card__val--highlight">{result.timeRemaining}</span>
            </div>
            <div className="outcome-result-card__row">
              <span className="outcome-result-card__key">The failure</span>
              <span className="outcome-result-card__val">{result.failure}</span>
            </div>
            <div className="outcome-result-card__row">
              <span className="outcome-result-card__key">The location</span>
              <span className="outcome-result-card__val">{result.location}</span>
            </div>
            {result.prompt && (
              <div className="outcome-result-card__row outcome-result-card__row--prompt">
                <span className="outcome-result-card__key">Best prompt</span>
                <span className="outcome-result-card__val outcome-result-card__val--prompt">&ldquo;{result.prompt}&rdquo;</span>
              </div>
            )}
          </div>
        )}

        <blockquote className="outcome-quote">
          &ldquo;Order brought to chaos. An exemplary investigation. The university
          owes you a debt that cannot be easily quantified.&rdquo;
          <cite>— Christopher Gravitas, IT Services</cite>
        </blockquote>

        <div className="outcome-stamp outcome-stamp--success">CLEARED</div>

        {board.length > 0 && <Leaderboard board={board} source={boardSource} />}

        <motion.button
          className="btn-restart btn-restart--success"
          onClick={onRestart}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          BEGIN NEW INVESTIGATION
        </motion.button>
      </motion.div>
    </div>
  );
}
