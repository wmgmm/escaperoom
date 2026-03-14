import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { submitEntry } from './lib/leaderboard.js';
import SplashScreen from './components/SplashScreen.jsx';
import Countdown from './components/Countdown.jsx';
import EvidenceGallery from './components/EvidenceGallery.jsx';
import SubmissionPortal from './components/SubmissionPortal.jsx';
import SuccessScreen from './components/SuccessScreen.jsx';
import FailureScreen from './components/FailureScreen.jsx';
import TaglineBar from './components/TaglineBar.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import LeaderboardPage from './components/LeaderboardPage.jsx';

// Total time in seconds (30 minutes)
const TOTAL_TIME = 1800;

const _params = new URLSearchParams(window.location.search);
const IS_ADMIN = _params.has('admin');
const IS_LEADERBOARD = _params.has('leaderboard');

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function App() {
  const [stage, setStage] = useState('SPLASH');
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [warningTriggered, setWarningTriggered] = useState(false);
  const [player, setPlayer] = useState({ name: '', email: '' });
  const [submitResult, setSubmitResult] = useState(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const timeLeftRef = useRef(TOTAL_TIME);

  // Keep ref in sync so handleSubmit can read current value without stale closure
  useEffect(() => { timeLeftRef.current = timeLeft; }, [timeLeft]);

  const triggerWarningAudio = useCallback(() => {
    if (warningTriggered) return;
    setWarningTriggered(true);
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      for (let i = 0; i < 3; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(60, ctx.currentTime + i * 0.4);
        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.4);
        gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + i * 0.4 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.4 + 0.35);
        osc.start(ctx.currentTime + i * 0.4);
        osc.stop(ctx.currentTime + i * 0.4 + 0.35);
      }
    } catch {
      // Web Audio not available
    }
  }, [warningTriggered]);

  useEffect(() => {
    if (stage !== 'ACTIVE') return;
    if (timeLeft <= 0) { setStage('FAILURE'); return; }
    const id = setInterval(() => {
      setTimeLeft(prev => {
        const next = prev - 1;
        if (next <= 0) { clearInterval(id); setStage('FAILURE'); return 0; }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [stage]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (stage === 'ACTIVE' && timeLeft <= 600 && timeLeft > 595) {
      triggerWarningAudio();
    }
  }, [timeLeft, stage, triggerWarningAudio]);

  const handleStart = ({ name, email }) => {
    setPlayer({ name, email });
    setTimeLeft(TOTAL_TIME);
    timeLeftRef.current = TOTAL_TIME;
    setWarningTriggered(false);
    setSubmitResult(null);
    setStage('ACTIVE');
  };

  const handleSubmit = ({ failure, threat, location, prompt }) => {
    const timeTaken = TOTAL_TIME - timeLeftRef.current;
    const timeRemaining = timeLeftRef.current;

    const failureCorrect =
      failure.toLowerCase().includes('unsanctioned') ||
      failure.toLowerCase().includes('ai tool') ||
      failure === 'Unsanctioned AI Tool Usage';
    const threatOk = threat.trim().length > 0;
    const locationCorrect = location.toLowerCase().includes('server room b');
    const solved = failureCorrect && threatOk && locationCorrect;

    const entry = {
      name: player.name,
      email: player.email,
      failure,
      threat,
      location,
      prompt: prompt.trim(),
      solved,
      timeTaken: formatTime(timeTaken),
      timeRemaining: formatTime(timeRemaining),
      submittedAt: new Date().toLocaleTimeString(),
    };

    submitEntry(entry);

    setSubmitResult(entry);
    if (!solved) setAttemptCount(c => c + 1);
    setStage(solved ? 'SUCCESS' : 'FAILURE');
  };

  const handleRestart = () => {
    setStage('SPLASH');
    setTimeLeft(TOTAL_TIME);
    setWarningTriggered(false);
    setSubmitResult(null);
    setAttemptCount(0);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -24, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  if (IS_ADMIN) return <AdminPanel />;
  if (IS_LEADERBOARD) return <LeaderboardPage />;

  return (
    <>
      <TaglineBar />
      <AnimatePresence mode="wait">
        {stage === 'SPLASH' && (
          <motion.div key="splash" {...pageVariants}>
            <SplashScreen onStart={handleStart} />
          </motion.div>
        )}

        {stage === 'ACTIVE' && (
          <motion.div key="active" {...pageVariants} className="active-layout">
            <Countdown timeLeft={timeLeft} playerName={player.name} />
            <EvidenceGallery />
            <SubmissionPortal onSubmit={handleSubmit} />
          </motion.div>
        )}

        {stage === 'SUCCESS' && (
          <motion.div key="success" {...pageVariants}>
            <SuccessScreen onRestart={handleRestart} player={player} result={submitResult} />
          </motion.div>
        )}

        {stage === 'FAILURE' && (
          <motion.div key="failure" {...pageVariants}>
            <FailureScreen onRestart={handleRestart} timeExpired={timeLeft <= 0} result={submitResult} attemptCount={attemptCount} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
