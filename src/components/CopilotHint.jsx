import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HINT = {
  artifact: 'EXHIBIT A — THE WHITEBOARD',
  label: 'OPTIMISED COPILOT DIRECTIVE',
  sublabel: 'Filtering Noise',
  prompt: `Please read the text on this whiteboard. Extract the information into simple categories`,
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
