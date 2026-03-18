import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HINT = {
  artifact: 'EXHIBIT A — THE WHITEBOARD',
  label: 'OPTIMISED COPILOT DIRECTIVE',
  sublabel: 'Filtering Noise',
  prompt: `You are a forensic analyst. Ignore diagrams. Extract: names, deadlines, monetary amounts. Three bullet lists.`,
};

export default function CopilotHint() {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(HINT.prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="copilot-hint-wrapper">
      <button
        className="copilot-hint-toggle"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="copilot-hint-toggle__icon">{open ? '▲' : '▼'}</span>
        <span>EXAMPLE COPILOT PROMPT — HOW TO GET STARTED</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="copilot-hint"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="copilot-hint__inner">
              <div className="copilot-hint__meta">
                <span className="copilot-hint__artifact">{HINT.artifact}</span>
                <span className="copilot-hint__label">
                  {HINT.label}
                  <em> ({HINT.sublabel})</em>
                </span>
              </div>

              <div className="copilot-hint__prompt-block">
                <p className="copilot-hint__prompt-text">&ldquo;{HINT.prompt}&rdquo;</p>
                <button
                  className={`copilot-hint__copy ${copied ? 'copilot-hint__copy--done' : ''}`}
                  onClick={handleCopy}
                  aria-label="Copy prompt to clipboard"
                >
                  {copied ? 'COPIED!' : 'COPY PROMPT'}
                </button>
              </div>

              <p className="copilot-hint__instructions">
                Download Exhibit A above &rarr; open Microsoft Copilot &rarr; attach the image &rarr; paste this prompt. Apply the same analytical approach to all six artifacts.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
