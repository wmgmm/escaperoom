// Christopher Gravitas quotes on failure.
// Tiered by attempt number.
// Former Physics lecturer at UHW (hospital campus). Now IT Services.
// Taught medical students who didn't want to be in his lectures.
// Dry, increasingly exasperated. Crossed to the dark side.

export const GRAVITAS_QUOTES = {
  // First attempt -- disappointed but measured. Still has professional composure.
  1: [
    "In seventeen years of teaching Physics at UHW, I watched medical students stare at a force diagram as if it had personally offended them. I recognise that expression. You are making it now.",
    "When I taught at the hospital campus, I had a simple rule: if the answer is in the textbook, the textbook is the first place you look. I have adapted this rule for IT. The evidence is the textbook. You did not look.",
    "I once spent an entire semester explaining to first-year medics that correlation is not causation. I am beginning to think I should have stayed and added a module on reading a receipt.",
    "The data is all there. In Physics we would call this a measurement problem. You have the instruments. You are simply not using them correctly.",
    "I left the lecture theatre for the server room because I thought the problems would be more concrete. A server either works or it does not. This investigation, apparently, does not.",
  ],

  // Second attempt -- the composure is fraying.
  2: [
    "Twice. At UHW I once had a student submit the same incorrect lab report twice with only the date changed. She became a consultant cardiologist. I am choosing to find that fact comforting right now.",
    "I taught Physics to people who would rather have been in anatomy. They found it hard. They still managed to locate the lab. Server Room B is labelled on a map.",
    "My colleagues in the Physics department told me IT would be simpler. 'More structured,' they said. 'Fewer essays to mark.' I have now written three incident reports about this single investigation.",
    "At the hospital campus, we had a saying: if you cannot explain it simply, you do not understand it. I am struggling to explain why this is still unresolved. Simply or otherwise.",
    "The Vice-Chancellor's office has been in touch. I described progress as 'iterative.' It was the most Physics thing I have said since I left.",
  ],

  // Third attempt -- genuine disbelief. Dark.
  3: [
    "Three attempts. I taught a module called Experimental Methods to two hundred students a year for over a decade at UHW. Only a handful ever needed three attempts to reach a correct conclusion from provided data. You are in that handful. It is not a distinguished group.",
    "When I worked at the hospital campus, I was surrounded by people who made life-or-death decisions under pressure. I thought that environment would be the most stressful of my career. I am revising that assessment.",
    "The grant is still missing. The backup is still where it has always been. I have now made and consumed four cups of tea that I did not offer to share. This is not a situation I envisaged when I took this role.",
    "I have a PhD in Condensed Matter Physics. I spent three years at UHW explaining Newton's laws of motion to people who found them counterintuitive. Nothing in that experience prepared me for this. Nothing.",
    "The Vice-Chancellor has stopped using the word 'confident' in her updates and started using the word 'concerned.' I have started using the word 'fine.' Neither of us means what we are saying.",
  ],

  // Four or more attempts -- full existential collapse.
  4: [
    "No. No. I stood in a lecture theatre at the hospital campus for seventeen years. I explained the photoelectric effect to people who had dissected a human heart that morning and still thought Physics was the hard part of their day. You have surpassed all of them.",
    "I want to be clear about something. I did not leave UHW for IT Services because I was chasing excitement. I left because I thought the problems would have solutions. I am formally reconsidering the premise.",
    "There is a principle in Physics called Occam's Razor. The simplest explanation is usually correct. The simplest explanation here is that the answer is in the evidence and the evidence has been available throughout. I cannot make it any simpler. I have a PhD and I cannot make it simpler.",
    "My former colleagues in the Physics department at UHW have a reunion every year. Last year someone asked me whether I missed teaching. I said no. I am now less certain. I was never certain about much, but I was more certain than this.",
    "Server Room B. It is in the building. It is on the map. It has been on the map since the map was drawn. I know this because I submitted the original IT infrastructure request in 2019 and I have the email. I am this close to forwarding it to you.",
  ],
};

export function getGravitasQuote(attemptNumber) {
  const tier = attemptNumber >= 4 ? 4 : attemptNumber;
  const pool = GRAVITAS_QUOTES[tier] || GRAVITAS_QUOTES[1];
  return pool[Math.floor(Math.random() * pool.length)];
}
