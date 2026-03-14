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
    prompt: 'Analyse this formal letter. Extract: the institution name and department in the letterhead, the full date, who it is addressed to (name and title), who signed it (name and role), and the full text of any highlighted or underlined passage. What decision is stamped on this letter and what does that imply?',
  },
  {
    exhibit: 'D',
    artifact: 'The Ledger',
    prompt: 'Analyse this open book. What are the page numbers shown? Describe the content of the sticky note on the right-hand page. What text appears underlined or highlighted on the left page? What does the chapter heading on the right page say? What might page 47 reveal in the context of a governance investigation?',
  },
  {
    exhibit: 'E',
    artifact: 'The Fragments',
    prompt: 'Analyse these four map fragments arranged on a dark background. List every room name or location label visible across all fragments. Identify which area is marked with a red X — what is the exact room name? Describe the direction any arrows are pointing and what they lead to. Which specific location is the most significant finding?',
  },
  {
    exhibit: 'F',
    artifact: 'The Receipt',
    prompt: 'Analyse this receipt. Extract: the organisation name, reference number, full date, and every line item with its cost. Which item is flagged as unauthorised — give the exact label and amount. What is the total amount charged and to which payment method? What category of expenditure does the flagged item fall under, and why is it significant in a governance context?',
  },
];

export function randomHint() {
  return HINTS[Math.floor(Math.random() * HINTS.length)];
}
