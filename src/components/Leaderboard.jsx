import React from 'react';

const PREVIEW_COUNT = 5;

export default function Leaderboard({ board, dark = false, fullPage = false, source = 'local' }) {
  const visible = fullPage ? board : board.slice(0, PREVIEW_COUNT);

  const darkMod = dark ? '--dark' : '';

  return (
    <div className={`leaderboard${dark ? ' leaderboard--dark' : ''}`}>
      <div className="leaderboard__header">
        <h2 className={`leaderboard__title${dark ? ' leaderboard__title--dark' : ''}`}>
          MY PROMPT LEADERBOARD
        </h2>
      </div>

      <div className="leaderboard__table-wrap">
        <table className={`leaderboard__table${dark ? ' leaderboard__table--dark' : ''}`}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Investigator</th>
              <th scope="col">Time left</th>
              <th scope="col">Verdict</th>
              <th scope="col">Best prompt</th>
              {!dark && <th scope="col">Their solution</th>}
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

      {/* Link to global leaderboard page */}
      {!fullPage && (
        <div className="leaderboard__footer">
          <a
            href={`${window.location.pathname}?leaderboard`}
            target="_blank"
            rel="noopener noreferrer"
            className="leaderboard__global-btn"
          >
            VIEW GLOBAL LEADERBOARD
          </a>
          <p className="leaderboard__global-hint">See how all participants ranked across every session</p>
        </div>
      )}
    </div>
  );
}
