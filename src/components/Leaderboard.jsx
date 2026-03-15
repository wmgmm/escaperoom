import React, { useState } from 'react';

const PREVIEW_COUNT = 5;

export default function Leaderboard({ board, dark = false, fullPage = false, source = 'local' }) {
  const [expanded, setExpanded] = useState(fullPage);

  const visible = expanded ? board : board.slice(0, PREVIEW_COUNT);
  const hidden = board.length - PREVIEW_COUNT;

  const darkMod = dark ? '--dark' : '';

  return (
    <div className={`leaderboard${dark ? ' leaderboard--dark' : ''}`}>
      <div className="leaderboard__header">
        <h2 className={`leaderboard__title${dark ? ' leaderboard__title--dark' : ''}`}>
          PROMPT LEADERBOARD
        </h2>
        <p className={`leaderboard__sub${dark ? ' leaderboard__sub--dark' : ''}`}>
          {board.length} submission{board.length !== 1 ? 's' : ''} &mdash; ranked by time remaining
          <span className={`leaderboard__source leaderboard__source--${source}`}>
            {source === 'global' ? '● GLOBAL' : '● MY RESULTS'}
          </span>
        </p>
      </div>

      <div className="leaderboard__table-wrap">
        <table className={`leaderboard__table${dark ? ' leaderboard__table--dark' : ''}`}>
          <thead>
            <tr>
              <th>#</th>
              <th>Investigator</th>
              <th>Time left</th>
              <th>Verdict</th>
              <th>Best prompt</th>
              {!dark && <th>Their solution</th>}
            </tr>
          </thead>
          <tbody>
            {visible.map((entry, i) => (
              <tr key={i} className={entry.solved ? 'leaderboard__row--solved' : 'leaderboard__row--failed'}>
                <td className="leaderboard__rank">{i + 1}</td>
                <td className="leaderboard__name">{entry.name}</td>
                <td className="leaderboard__time">{entry.timeRemaining}</td>
                <td className="leaderboard__verdict">
                  <span className={`leaderboard__badge ${entry.solved ? 'leaderboard__badge--pass' : 'leaderboard__badge--fail'}`}>
                    {entry.solved ? 'SOLVED' : 'FAILED'}
                  </span>
                </td>
                <td className="leaderboard__prompt">
                  {entry.prompt ? <em>&ldquo;{entry.prompt}&rdquo;</em> : <span className="leaderboard__empty">—</span>}
                </td>
                {!dark && (
                  <td className="leaderboard__solution">
                    <span className="leaderboard__sol-item">{entry.failure}</span>
                    <span className="leaderboard__sol-sep"> / </span>
                    <span className="leaderboard__sol-item">{entry.location}</span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Expand / collapse */}
      {!fullPage && board.length > PREVIEW_COUNT && (
        <div className="leaderboard__expand-bar">
          {!expanded ? (
            <button className="leaderboard__expand-btn" onClick={() => setExpanded(true)}>
              Show all {board.length} entries &darr;
            </button>
          ) : (
            <button className="leaderboard__expand-btn" onClick={() => setExpanded(false)}>
              Show fewer &uarr;
            </button>
          )}
        </div>
      )}

      {/* Link to full leaderboard page */}
      {!fullPage && (
        <div className="leaderboard__footer">
          <a
            href={`${window.location.pathname}?leaderboard`}
            target="_blank"
            rel="noopener noreferrer"
            className="leaderboard__full-link"
          >
            Open full leaderboard page &rarr;
          </a>
        </div>
      )}
    </div>
  );
}
