import React, { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function playCameraClick() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    const bufferSize = ctx.sampleRate * 0.08;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // White noise with fast decay
      data[i] = (Math.random() * 2 - 1) * Math.max(0, 1 - i / (bufferSize * 0.4));
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 2000;
    source.connect(filter);
    filter.connect(ctx.destination);
    source.start();
  } catch {
    // Silently ignore if Web Audio unavailable
  }
}

export default function EvidenceCard({ artifact, index }) {
  const [hovered, setHovered] = React.useState(false);
  const [downloading, setDownloading] = React.useState(false);

  const handleDownload = useCallback(() => {
    playCameraClick();
    setDownloading(true);
    // Create a download link for the SVG
    const link = document.createElement('a');
    link.href = artifact.downloadPath || artifact.svgPath;
    link.download = artifact.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(false), 800);
  }, [artifact]);

  return (
    <motion.div
      className={`evidence-card evidence-card--${index + 1}`}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleDownload}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      role="button"
      tabIndex={0}
      aria-label={`Download evidence artifact: ${artifact.label}`}
      onKeyDown={e => e.key === 'Enter' && handleDownload()}
      style={{ cursor: 'pointer' }}
    >
      {/* Artifact image */}
      <div className="evidence-card__image">
        <img src={artifact.svgPath} alt={artifact.altText} draggable={false} />
      </div>

      {/* Decorative overlay: stamp / sticker / label */}
      <div className={`evidence-card__accent evidence-card__accent--${artifact.accentType}`}>
        {artifact.accentText}
      </div>

      {/* Evidence label */}
      <div className="evidence-card__label">
        <span className="evidence-card__id">EXHIBIT {artifact.id}</span>
        <span className="evidence-card__name">{artifact.label}</span>
      </div>

      {/* Hover overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="evidence-card__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <span className="evidence-card__cta">
              {downloading ? 'DOWNLOADING...' : 'EXAMINE ARTIFACT'}
            </span>
            <span className="evidence-card__subcta">CLICK TO DOWNLOAD</span>
            <svg className="evidence-card__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Download flash */}
      <AnimatePresence>
        {downloading && (
          <motion.div
            className="evidence-card__flash"
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
