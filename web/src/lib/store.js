// Shared client-side persistence (localStorage) for quiz progress, exam history,
// and flashcard spaced-repetition state. All access is guarded so importing this
// during SSR never touches storage.

const PROGRESS = 'cca:progress';
const EXAMS = 'cca:exams';
const SRS = 'cca:srs';
const META = 'cca:meta';
const KEYS = [PROGRESS, EXAMS, SRS, META];
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

// --- Meta: schema version + small counters (flashcard daily new-card intake) ---
export function loadMeta() {
  return read(META, { v: SCHEMA_VERSION });
}
export function saveMeta(meta) {
  write(META, { ...meta, v: SCHEMA_VERSION });
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
