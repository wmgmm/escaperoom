import React, { useMemo } from 'react';

export default function Countdown({ timeLeft, playerName }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isUrgent = timeLeft <= 600;
  const isCritical = timeLeft <= 60;

  const urgencyClass = useMemo(() => {
    if (isCritical) return 'countdown--critical';
    if (isUrgent) return 'countdown--urgent';
    return '';
  }, [isUrgent, isCritical]);

  return (
    <header className={`countdown ${urgencyClass}`}>
      <div className="countdown-inner">
        <span className="countdown-label">THE ALBRIGHT AFFAIR</span>
        <span
          className="countdown-display"
          aria-live="polite"
          aria-label={`${minutes} minutes ${seconds} seconds remaining`}
        >
          {display}
        </span>
        <span className="countdown-label countdown-label--right">
          {playerName ? `INVESTIGATOR: ${playerName.toUpperCase()}` : 'TIME REMAINING'}
        </span>
      </div>
      {isUrgent && (
        <div className="countdown-warning-strip">
          DEADLINE APPROACHING &mdash; SUBMIT FINDINGS IMMEDIATELY
        </div>
      )}
    </header>
  );
}
