import React, { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'escaperoom_leaderboard';

function loadBoard() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function exportCSV(entries) {
  const headers = ['Name', 'Email', 'Solved', 'Time Remaining', 'Time Taken', 'Submitted At', 'Failure', 'Threat', 'Location', 'Best Prompt'];
  const rows = entries.map(e => [
    e.name, e.email || '', e.solved ? 'YES' : 'NO',
    e.timeRemaining, e.timeTaken, e.submittedAt,
    e.failure, e.threat, e.location,
    e.prompt,
  ].map(v => `"${(v || '').replace(/"/g, '""')}"`).join(','));
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `albright-leaderboard-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminPanel() {
  const [board, setBoard] = useState(loadBoard);
  const [filter, setFilter] = useState('all'); // 'all' | 'solved' | 'failed'
  const [confirmClear, setConfirmClear] = useState(false);

  const refresh = useCallback(() => setBoard(loadBoard()), []);

  useEffect(() => {
    // Refresh when window regains focus (other tabs may have added entries)
    window.addEventListener('focus', refresh);
    return () => window.removeEventListener('focus', refresh);
  }, [refresh]);

  const handleClear = () => {
    if (!confirmClear) { setConfirmClear(true); return; }
    localStorage.removeItem(STORAGE_KEY);
    setBoard([]);
    setConfirmClear(false);
  };

  const handleDeleteRow = (idx) => {
    const updated = board.filter((_, i) => i !== idx);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setBoard(updated);
  };

  const filtered = board.filter(e =>
    filter === 'all' ? true : filter === 'solved' ? e.solved : !e.solved
  );

  const solved = board.filter(e => e.solved).length;

  return (
    <div className="admin">
      <div className="admin-header">
        <div className="admin-header__left">
          <h1 className="admin-title">LEADERBOARD ADMIN</h1>
          <p className="admin-sub">THE ALBRIGHT AFFAIR &mdash; Session Data</p>
        </div>
        <button className="admin-refresh" onClick={refresh}>&#8635; Refresh</button>
      </div>

      <div className="admin-stats">
        <div className="admin-stat">
          <span className="admin-stat__val">{board.length}</span>
          <span className="admin-stat__label">Total Submissions</span>
        </div>
        <div className="admin-stat admin-stat--pass">
          <span className="admin-stat__val">{solved}</span>
          <span className="admin-stat__label">Solved</span>
        </div>
        <div className="admin-stat admin-stat--fail">
          <span className="admin-stat__val">{board.length - solved}</span>
          <span className="admin-stat__label">Failed</span>
        </div>
        <div className="admin-stat">
          <span className="admin-stat__val">
            {board.length ? Math.round((solved / board.length) * 100) : 0}%
          </span>
          <span className="admin-stat__label">Success Rate</span>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-filters">
          {['all', 'solved', 'failed'].map(f => (
            <button
              key={f}
              className={`admin-filter ${filter === f ? 'admin-filter--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="admin-actions">
          <button className="admin-btn admin-btn--export" onClick={() => exportCSV(board)} disabled={!board.length}>
            Export CSV
          </button>
          <button
            className={`admin-btn admin-btn--clear ${confirmClear ? 'admin-btn--confirm' : ''}`}
            onClick={handleClear}
            onBlur={() => setConfirmClear(false)}
          >
            {confirmClear ? 'Confirm Clear?' : 'Clear All'}
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="admin-empty">No entries yet. Participants must complete the game to appear here.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Verdict</th>
                <th>Time Left</th>
                <th>Time Taken</th>
                <th>Submitted</th>
                <th>Failure</th>
                <th>Location</th>
                <th>Best Prompt</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e, i) => (
                <tr key={i} className={e.solved ? 'admin-row--solved' : 'admin-row--failed'}>
                  <td className="admin-td--num">{i + 1}</td>
                  <td className="admin-td--name">{e.name}</td>
                  <td className="admin-td--email">{e.email || '—'}</td>
                  <td>
                    <span className={`admin-badge ${e.solved ? 'admin-badge--pass' : 'admin-badge--fail'}`}>
                      {e.solved ? 'SOLVED' : 'FAILED'}
                    </span>
                  </td>
                  <td className={`admin-td--time ${e.solved ? 'admin-td--time-pass' : ''}`}>{e.timeRemaining}</td>
                  <td>{e.timeTaken}</td>
                  <td className="admin-td--small">{e.submittedAt}</td>
                  <td className="admin-td--answer">{e.failure}</td>
                  <td className="admin-td--answer">{e.location}</td>
                  <td className="admin-td--prompt">{e.prompt ? <em>&ldquo;{e.prompt}&rdquo;</em> : '—'}</td>
                  <td>
                    <button className="admin-delete" onClick={() => handleDeleteRow(i)} title="Delete row">
                      &times;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="admin-note">
        Data is stored in this browser&rsquo;s localStorage. To share results across devices, use Export CSV.
        Entries appear here as soon as participants submit on this same device/browser.
        <br/>
        Admin URL: <code>{window.location.origin}{window.location.pathname}?admin</code>
      </p>
    </div>
  );
}
