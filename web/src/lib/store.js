// Shared client-side persistence (localStorage) for quiz progress, exam history,
// and flashcard spaced-repetition state. All access is guarded so importing this
// during SSR never touches storage.

const PROGRESS = 'cca:progress';
const EXAMS = 'cca:exams';
const SRS = 'cca:srs';
const META = 'cca:meta';
const BOOKMARKS = 'cca:bookmarks';
const KEYS = [PROGRESS, EXAMS, SRS, META, BOOKMARKS];
const SCHEMA_VERSION = 1;

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

// Local (not UTC) calendar day, shared by the streak and the flashcard daily cap.
export function dayKey(d = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

// --- Practice progress: { [questionNumber]: { chosen, correct, ts } } ---
export function loadProgress() {
  return read(PROGRESS, {});
}
export function saveAnswer(n, chosen, correct) {
  const p = loadProgress();
  p[n] = { chosen, correct, ts: Date.now() };
  write(PROGRESS, p);
  touchActivity();
  return p;
}
export function clearProgress() {
  write(PROGRESS, {});
}

// --- Exam attempts: [{ ts, scaled, correct, total, passed, byScenario, qns, answers }] ---
// `qns` (question numbers, in exam order) + `answers` ({ [n]: letter }) make a
// past attempt fully reviewable; records from before schema v1 lack them.
export function loadExams() {
  return read(EXAMS, []);
}
export function saveExam(rec) {
  const e = loadExams();
  e.push(rec);
  write(EXAMS, e);
  touchActivity();
  return e;
}
export function clearExams() {
  write(EXAMS, []);
}

// --- Flashcard SRS: { [cardId]: { ease, interval, due, reps } } ---
export function loadSrs() {
  return read(SRS, {});
}
export function saveSrs(state) {
  write(SRS, state);
}

// --- Question bookmarks: { [questionNumber]: true } ---
export function loadBookmarks() {
  return read(BOOKMARKS, {});
}
export function toggleBookmark(n) {
  const b = loadBookmarks();
  if (b[n]) delete b[n];
  else b[n] = true;
  write(BOOKMARKS, b);
  return b;
}

// --- Meta: schema version + small counters (flashcard daily new-card intake,
//     per-day activity log powering the study streak) ---
export function loadMeta() {
  return read(META, { v: SCHEMA_VERSION });
}
export function saveMeta(meta) {
  write(META, { ...meta, v: SCHEMA_VERSION });
}

// Record "the user studied today". Called on every answer, exam submit, and
// flashcard grade; the dashboard derives the streak from this map.
export function touchActivity() {
  const meta = loadMeta();
  const activity = meta.activity || {};
  activity[dayKey()] = 1;
  const days = Object.keys(activity).sort();
  while (days.length > 400) delete activity[days.shift()];
  saveMeta({ ...meta, activity });
}

// --- Backup: export / import / reset the whole study state on this device ---
export function exportAll() {
  return {
    app: 'claude-certified-architect',
    v: SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    progress: loadProgress(),
    exams: loadExams(),
    srs: loadSrs(),
    bookmarks: loadBookmarks(),
    meta: loadMeta(),
  };
}
export function importAll(data) {
  if (!data || typeof data !== 'object' || data.app !== 'claude-certified-architect') {
    throw new Error('not a valid backup');
  }
  write(PROGRESS, data.progress && typeof data.progress === 'object' ? data.progress : {});
  write(EXAMS, Array.isArray(data.exams) ? data.exams : []);
  write(SRS, data.srs && typeof data.srs === 'object' ? data.srs : {});
  write(BOOKMARKS, data.bookmarks && typeof data.bookmarks === 'object' ? data.bookmarks : {});
  write(META, data.meta && typeof data.meta === 'object' ? data.meta : { v: SCHEMA_VERSION });
}
export function resetAll() {
  if (typeof localStorage === 'undefined') return;
  for (const k of KEYS) {
    try {
      localStorage.removeItem(k);
    } catch {
      /* ignore */
    }
  }
}
