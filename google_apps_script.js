// =====================================================================
// AI Escape Room — Google Apps Script Leaderboard
// =====================================================================
// SETUP:
//   1. Go to script.google.com — create a new project
//   2. Paste this entire file, replacing the default code
//   3. Set TOKEN below to any secret string of your choice
//   4. Click Deploy > New Deployment > Web App
//      - Execute as: Me
//      - Who has access: Anyone
//   5. Copy the Web App URL into src/config.js (LEADERBOARD_URL)
//   6. Copy your TOKEN into src/config.js (LEADERBOARD_TOKEN)
//
// The script creates a "Submissions" sheet automatically on first use.
// =====================================================================

const TOKEN = 'CHANGE_THIS_TO_YOUR_SECRET';
const SHEET_NAME = 'Submissions';
const MAX_PER_EMAIL = 30;

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);

    if (payload.token !== TOKEN) {
      return respond({ error: 'Unauthorised' });
    }

    const sheet = getSheet();
    const rows = sheet.getDataRange().getValues();

    // Rate limit: reject if this email has already hit the cap
    const emailCount = rows.slice(1).filter(r => r[1] === payload.email).length;
    if (emailCount >= MAX_PER_EMAIL) {
      return respond({ error: 'Rate limited' });
    }

    sheet.appendRow([
      payload.name        || '',
      payload.email       || '',
      payload.solved      ? 'YES' : 'NO',
      payload.timeRemaining || '',
      payload.timeTaken   || '',
      payload.submittedAt || '',
      payload.failure     || '',
      payload.threat      || '',
      payload.location    || '',
      payload.prompt      || '',
    ]);

    return respond({ ok: true });
  } catch (err) {
    return respond({ error: err.message });
  }
}

function doGet(e) {
  try {
    if (e.parameter.token !== TOKEN)  return respond({ error: 'Unauthorised' });
    if (e.parameter.action !== 'read') return respond({ error: 'Unknown action' });

    const sheet = getSheet();
    const rows = sheet.getDataRange().getValues();

    if (rows.length <= 1) return respond([]);

    const entries = rows.slice(1).map(r => ({
      name:          r[0],
      email:         r[1],
      solved:        r[2] === 'YES',
      timeRemaining: r[3],
      timeTaken:     r[4],
      submittedAt:   r[5],
      failure:       r[6],
      threat:        r[7],
      location:      r[8],
      prompt:        r[9],
    }));

    // Sort: solved first, then by most time remaining
    entries.sort((a, b) => {
      if (a.solved !== b.solved) return a.solved ? -1 : 1;
      return timeToSeconds(b.timeRemaining) - timeToSeconds(a.timeRemaining);
    });

    return respond(entries.slice(0, 30));
  } catch (err) {
    return respond({ error: err.message });
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Name', 'Email', 'Solved', 'Time Remaining', 'Time Taken',
      'Submitted At', 'Failure', 'Threat', 'Location', 'Best Prompt',
    ]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function timeToSeconds(timeStr) {
  if (!timeStr) return 0;
  const [m, s] = timeStr.split(':').map(Number);
  return (m || 0) * 60 + (s || 0);
}

function respond(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
