import React, { useState } from 'react';
import { randomHint } from '../data/hints.js';

export default function HintReveal({ dark = false }) {
  const [hint] = useState(() => randomHint());
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(hint.prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`hint-reveal ${dark ? 'hint-reveal--dark' : ''}`}>
      <div className="hint-reveal__header">
        <span className="hint-reveal__label">INVESTIGATOR HINT</span>
        <span className="hint-reveal__sub">
          A Copilot prompt that may assist your next attempt
        </span>
      </div>

      <div className="hint-reveal__card">
        <div className="hint-reveal__exhibit">
          EXHIBIT {hint.exhibit} &mdash; {hint.artifact.toUpperCase()}
        </div>
        <p className="hint-reveal__prompt">&ldquo;{hint.prompt}&rdquo;</p>
        <button
          className={`hint-reveal__copy ${copied ? 'hint-reveal__copy--done' : ''}`}
          onClick={handleCopy}
        >
          {copied ? 'COPIED!' : 'COPY PROMPT'}
        </button>
      </div>
    </div>
  );
}
