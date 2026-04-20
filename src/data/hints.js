// One Copilot analysis prompt per artifact.
// A random one is shown to players who fail.

export const HINTS = [
  {
    exhibit: 'A',
    artifact: 'The Whiteboard',
    prompt: 'Analyse this whiteboard image. Extract every human name visible. List all deadlines, dates, or times. Describe the process diagram including each labelled box and what the final box says. What item has been circled in red? What does the URGENT stamp relate to?',
  },
  {
    exhibit: 'B',
    artifact: 'The Coaster',
    prompt: 'Analyse this image of a hotel coaster. What is the full name of the establishment printed on it? What does this venue suggest about where a meeting took place? Is there a tag or label attached — what does it say? Why might a coaster from this location be classified as evidence?',
  },
  {
    exhibit: 'C',
    artifact: 'The Letter',
    prompt: 'Analyse this formal letter. Extract: the institution name and department in the letterhead, the full date, who it is addressed to, and who signed it. What is the subject of the letter — does it reference a policy, a tool, or a specific incident? What does the stamp on this letter mean, and what governance issue does it point to?',
  },
  {
    exhibit: 'D',
    artifact: 'The Transcript',
    prompt: 'Analyse this meeting transcript. Who are the participants? Extract every location mentioned — room names, building references, any specific place where something was stored or left. Is there any mention of a backup, a USB drive, or physical documents? Which room or location is most significant as a storage point?',
  },
  {
    exhibit: 'E',
    artifact: 'The Survey',
    prompt: 'Analyse this staff survey spreadsheet. What question or topic does it cover? Look for any free-text responses that mention a specific room, location, or storage area. Do any responses refer to where files, backups, or documents were placed? What is the most frequently cited or significant location mentioned?',
  },
  {
    exhibit: 'F',
    artifact: 'The Receipt',
    prompt: 'Analyse this receipt. Extract: the vendor name, date, and every line item with its cost. Is any item flagged, highlighted, or marked as unauthorised? What type of product or service was purchased — is it software, a subscription, or a tool? Why would purchasing this item without approval represent a governance failure?',
  },
];

export function randomHint() {
  return HINTS[Math.floor(Math.random() * HINTS.length)];
}
