import React, { useState, useEffect, useCallback } from 'react';
import Leaderboard from './Leaderboard.jsx';
import TaglineBar from './TaglineBar.jsx';
import { loadBoard } from '../lib/leaderboard.js';

export default function LeaderboardPage() {
  const [board, setBoard] = useState(null);

  const refresh = useCallback(() => { loadBoard().then(setBoard); }, []);

  useEffect(() => {
    refresh();
    window.addEventListener('focus', refresh);
    return () => window.removeEventListener('focus', refresh);
  }, [refresh]);

  return (
    <>
      <TaglineBar />
      <div className="lb-page">
        <div className="lb-page__header">
          <div>
            <h1 className="lb-page__title">PROMPT LEADERBOARD</h1>
            <p className="lb-page__sub">THE ALBRIGHT AFFAIR &mdash; Full Session Results</p>
          </div>
          <div className="lb-page__actions">
            <button className="admin-refresh" onClick={refresh}>&#8635; Refresh</button>
            <a href={window.location.pathname} className="lb-page__back">
              &larr; Back to game
            </a>
          </div>
        </div>

        {board === null ? null : board.length === 0 ? (
          <p className="lb-page__empty">No submissions yet. Results will appear here as investigators complete the case.</p>
        ) : (
          <Leaderboard board={board} fullPage={true} source="global" />
        )}
      </div>
    </>
  );
}
