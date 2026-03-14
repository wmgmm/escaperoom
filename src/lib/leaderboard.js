import { LEADERBOARD_URL, LEADERBOARD_TOKEN } from '../config.js';

const STORAGE_KEY = 'escaperoom_leaderboard';

function loadLocal() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function saveLocal(entry) {
  try {
    const existing = loadLocal();
    existing.unshift(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 30)));
  } catch {}
}

// Write entry locally immediately, then try remote silently.
export function submitEntry(entry) {
  saveLocal(entry);
  if (!LEADERBOARD_URL) return;
  try {
    fetch(LEADERBOARD_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ ...entry, token: LEADERBOARD_TOKEN }),
    }).catch(() => {});
  } catch {}
}

// Try remote first; fall back to local silently if anything goes wrong.
export async function loadBoard() {
  if (!LEADERBOARD_URL) return loadLocal();
  try {
    const res = await fetch(
      `${LEADERBOARD_URL}?token=${encodeURIComponent(LEADERBOARD_TOKEN)}&action=read`,
      { signal: AbortSignal.timeout(4000) }
    );
    if (!res.ok) throw new Error();
    const data = await res.json();
    if (Array.isArray(data)) return data;
    throw new Error();
  } catch {
    return loadLocal();
  }
}
