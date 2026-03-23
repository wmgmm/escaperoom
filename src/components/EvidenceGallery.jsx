import React from 'react';
import EvidenceCard from './EvidenceCard.jsx';
import CopilotHint from './CopilotHint.jsx';

// Base path matches vite base: /escaperoom/
const BASE = import.meta.env.BASE_URL;

const ARTIFACTS = [
  {
    id: 'A',
    label: 'The Whiteboard',
    filename: 'Exhibit_A_evidence_whiteboard.jpg',
    svgPath: `${BASE}placeholders/evidence_whiteboard_thumb.webp`,
    downloadPath: `${BASE}placeholders/evidence_whiteboard.jpg`,
    altText: 'Whiteboard scrawled with project notes, URGENT stamp overlaid',
    accentType: 'stamp',
    accentText: 'URGENT',
  },
  {
    id: 'B',
    label: 'The Coaster',
    filename: 'Exhibit_B_evidence_coaster.jpg',
    svgPath: `${BASE}placeholders/evidence_coaster_thumb.webp`,
    downloadPath: `${BASE}placeholders/evidence_coaster.jpg`,
    altText: 'Circular coaster object on yellow background with evidence tag',
    accentType: 'tag',
    accentText: 'EVIDENCE B',
  },
  {
    id: 'C',
    label: 'The Letter',
    filename: 'Exhibit_C_evidence_letter.png',
    svgPath: `${BASE}placeholders/evidence_letter_thumb.webp`,
    downloadPath: `${BASE}placeholders/evidence_letter.png`,
    altText: 'Crumpled letter with REJECTED stamp',
    accentType: 'stamp-red',
    accentText: 'REJECTED',
  },
  {
    id: 'D',
    label: 'The Transcript',
    filename: 'Exhibit_D_Raw_Meeting_Transcript.pdf',
    svgPath: `${BASE}placeholders/evidence_transcript_thumb.webp`,
    downloadPath: `${BASE}placeholders/Exhibit_D_Raw_Meeting_Transcript.pdf`,
    altText: 'Teams meeting transcript screenshot',
    accentType: 'handwritten',
    accentText: 'pdf',
  },
  {
    id: 'E',
    label: 'The Survey',
    filename: 'Staff_Survey_Results.xlsx',
    svgPath: `${BASE}placeholders/evidence_survey_thumb.webp`,
    downloadPath: `${BASE}placeholders/Staff_Survey_Results.xlsx`,
    altText: 'Staff Survey Results spreadsheet screenshot',
    accentType: 'tape',
    accentText: 'xlsx',
  },
  {
    id: 'F',
    label: 'The Receipt',
    filename: 'Exhibit_F_evidence_receipt.png',
    svgPath: `${BASE}placeholders/evidence_receipt_thumb.webp`,
    downloadPath: `${BASE}placeholders/evidence_receipt.png`,
    altText: 'Narrow receipt strip with arrow graphic',
    accentType: 'arrow',
    accentText: '→ KEY ITEM',
  },
];

export default function EvidenceGallery() {
  return (
    <section className="evidence-section">
      <div className="directive">
        <div className="directive__top">
          <span className="directive__label">DIRECTIVE</span>
        </div>
        <p className="directive__text">
          Professor Albright&rsquo;s failure of information governance means a &pound;5M grant proposal
          is missing, with only 30 minutes until the deadline. I have isolated six critical artifacts
          from the chaos. Treat them as data points which you can investigate in any order. Use Copilot&rsquo;s image analysis to determine
          the root cause of this failure, precisely what is at stake, and where the physical backup
          is hidden. The Vice-Chancellor demands answers. Don&rsquo;t just look at the images &mdash;
          instruct Copilot on your phone or laptop on what to find!
        </p>
        <span className="directive__sig">— Christopher Gravitas, IT Services</span>
      </div>

      <div className="evidence-section__header">
        <h2 className="evidence-section__title">SIX ACTS OF EVIDENCE</h2>
        <ol className="evidence-section__steps">
          <li>Download each artifact</li>
          <li>Analyse with <a href="https://m365copilot.com/" target="_blank" rel="noopener noreferrer" className="evidence-steps__link">Microsoft Copilot</a></li>
          <li>Submit your findings below</li>
        </ol>
      </div>
      <div className="evidence-grid">
        {ARTIFACTS.map((artifact, i) => (
          <EvidenceCard key={artifact.id} artifact={artifact} index={i} />
        ))}
      </div>
      <CopilotHint />
    </section>
  );
}
