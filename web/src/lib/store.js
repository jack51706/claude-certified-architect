// Shared client-side persistence (localStorage) for quiz progress, exam history,
// and flashcard spaced-repetition state. All access is guarded so importing this
// during SSR never touches storage.

const PROGRESS = 'cca:progress';
const EXAMS = 'cca:exams';
const SRS = 'cca:srs';

function read(key, fallback) {
  if (typeof localStorage === 'undefined') return fallback;
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

function write(key, val) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {
    /* storage full / disabled — ignore */
  }
}

// --- Practice progress: { [questionNumber]: { chosen, correct, ts } } ---
export function loadProgress() {
  return read(PROGRESS, {});
}
export function saveAnswer(n, chosen, correct) {
  const p = loadProgress();
  p[n] = { chosen, correct, ts: Date.now() };
  write(PROGRESS, p);
  return p;
}
export function clearProgress() {
  write(PROGRESS, {});
}

// --- Exam attempts: [{ ts, scaled, correct, total, passed, scenarios }] ---
export function loadExams() {
  return read(EXAMS, []);
}
export function saveExam(rec) {
  const e = loadExams();
  e.push(rec);
  write(EXAMS, e);
  return e;
}
export function clearExams() {
  write(EXAMS, []);
}

// --- Flashcard SRS: { [cardId]: { ease, interval, due, reps, lapses } } ---
export function loadSrs() {
  return read(SRS, {});
}
export function saveSrs(state) {
  write(SRS, state);
}
