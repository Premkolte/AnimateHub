import React, { useEffect, useMemo, useRef, useState } from "react";
import CHALLENGES from "./challengeData";

/* ----------------------- Helpers: dates & storage ----------------------- */
const STORAGE_KEY = "animatehub_challenge_progress_v1";
const todayISO = () => new Date().toISOString().slice(0, 10);

const loadProgress = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw
      ? JSON.parse(raw)
      : { completedDates: [], totalPoints: 0, attempts: {}, streakBest: 0 };
  } catch {
    return { completedDates: [], totalPoints: 0, attempts: {}, streakBest: 0 };
  }
};

const saveProgress = (p) => localStorage.setItem(STORAGE_KEY, JSON.stringify(p));

/** Day index (0..29) that repeats every 30 days */
const dailyIndex = (d = new Date()) => {
  const daysSinceEpoch = Math.floor(d.getTime() / (1000 * 60 * 60 * 24));
  return ((daysSinceEpoch % 30) + 30) % 30;
};

/** Compute current streak from completedDates (ISO strings) */
const computeStreak = (completedDates) => {
  const set = new Set(completedDates);
  let streak = 0;
  let day = new Date();
  while (set.has(day.toISOString().slice(0, 10))) {
    streak += 1;
    day.setDate(day.getDate() - 1);
  }
  return streak;
};

/* ----------------------------- Main Component --------------------------- */
const ChallengeMode = () => {
  const [progress, setProgress] = useState(loadProgress());
  const [code, setCode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [scoreMsg, setScoreMsg] = useState("");
  const iframeRef = useRef(null);

  const today = useMemo(() => new Date(), []);
  const idx = useMemo(() => dailyIndex(today), [today]);
  const challenge = CHALLENGES[idx];
  const todayKey = todayISO();

  // initialize code (once per day)
  useEffect(() => {
    const prevAttempt = progress.attempts?.[todayKey]?.code;
    setCode(prevAttempt || challenge.starter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  // persist draft attempts
  useEffect(() => {
    setProgress((prev) => {
      const next = {
        ...prev,
        attempts: {
          ...prev.attempts,
          [todayKey]: {
            ...(prev.attempts?.[todayKey] || {}),
            code,
            updatedAt: Date.now(),
          },
        },
      };
      saveProgress(next);
      return next;
    });
  }, [code, todayKey]);

  const alreadyCompletedToday = progress.completedDates.includes(todayKey);
  const streak = computeStreak(progress.completedDates);
  const completionRate = Math.min(
    100,
    Math.round((progress.completedDates.length / 30) * 100)
  );

  /* ----------------------------- Run in Iframe --------------------------- */
  const runCode = () => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      doc.open();
      doc.write(code);
      doc.close();
    }
  };

  /* ------------------------------ Auto Checker --------------------------- */
  const validateSolution = () => {
    const lower = code.toLowerCase();
    const passedAll = challenge.checks.every((needle) =>
      lower.includes(needle.toLowerCase())
    );
    return passedAll;
  };

  const submit = () => {
    const ok = validateSolution();
    setSubmitted(true);

    if (ok && !alreadyCompletedToday) {
      const newPoints = progress.totalPoints + challenge.points;
      const updatedDates = [...progress.completedDates, todayKey].sort();
      const newStreak = computeStreak(updatedDates);
      const streakBest = Math.max(progress.streakBest || 0, newStreak);

      const next = {
        ...progress,
        totalPoints: newPoints,
        completedDates: updatedDates,
        streakBest,
        attempts: {
          ...progress.attempts,
          [todayKey]: {
            ...(progress.attempts?.[todayKey] || {}),
            code,
            result: "passed",
            scored: challenge.points,
            submittedAt: Date.now(),
          },
        },
      };
      saveProgress(next);
      setProgress(next);
      setScoreMsg(`✅ Great! +${challenge.points} pts awarded.`);
    } else if (ok && alreadyCompletedToday) {
      setScoreMsg("✅ Already completed today. Keep the streak going!");
    } else {
      const next = {
        ...progress,
        attempts: {
          ...progress.attempts,
          [todayKey]: {
            ...(progress.attempts?.[todayKey] || {}),
            code,
            result: "failed",
            submittedAt: Date.now(),
          },
        },
      };
      saveProgress(next);
      setProgress(next);
      setScoreMsg(
        "❌ Not quite there yet. Check the hint and try again! (The checker looks for key code/keywords.)"
      );
    }
  };

  /* ---------------------------- Mini Calendar ---------------------------- */
  const MiniCalendar = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const totalDays = last.getDate();
    const completedSet = new Set(progress.completedDates);

    return (
      <div className="w-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-6 shadow-2xl ring-1 ring-slate-200/20 dark:ring-slate-700/20">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-white bg-clip-text text-transparent">
            {d.toLocaleString("default", { month: "long" })} {year}
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold shadow-lg">
              <span>🔥</span>
              <span>{streak}</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold shadow-lg">
              <span>⭐</span>
              <span>{progress.streakBest || 0}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
            <div key={d} className="text-center py-1">{d}</div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-x-2 gap-y-3 text-sm" aria-label="calendar-grid">
          {Array.from({ length: first.getDay() }).map((_, i) => (
            <div key={`b-${i}`} />
          ))}
          {Array.from({ length: totalDays }).map((_, i) => {
            const day = i + 1;
            const slotDate = new Date(year, month, day)
              .toISOString()
              .slice(0, 10);
            const isToday = slotDate === todayKey;
            const done = completedSet.has(slotDate);

            return (
              <div
                key={day}
                className={[
                  "flex items-center justify-center font-semibold transition-all duration-300 cursor-pointer",
                  "h-9 w-9 sm:h-10 sm:w-10 rounded-xl border-2",
                  done
                    ? "bg-gradient-to-br from-emerald-400 to-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                    : "bg-white/80 dark:bg-slate-700/80 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600",
                  isToday
                    ? "ring-4 ring-blue-500/50 ring-offset-2 ring-offset-white dark:ring-offset-slate-800 scale-105 z-10"
                    : "",
                ].join(" ")}
                style={{
                  minWidth: "2.25rem",
                  minHeight: "2.25rem",
                  maxWidth: "2.5rem",
                  maxHeight: "2.5rem",
                }}
                title={done ? "Completed ✅" : "Incomplete"}
              >
                <span className={isToday ? "font-bold" : ""}>{day}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-slate-600 dark:text-slate-300">Monthly Progress</span>
            <span className="text-slate-800 dark:text-white font-bold">{completionRate}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out shadow-lg"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  /* ------------------------------ UI Render ------------------------------ */
  return (
    <div className="min-h-screen w-full py-4 sm:py-8 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-900 dark:text-white relative overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-cyan-600/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 relative z-10">
        {/* Header */}
        <section className="relative">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 rounded-3xl mb-4 shadow-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-500">
                  <span className="text-3xl transform -rotate-12">🔥</span>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-lg opacity-30 -z-10"></div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Challenge Mode
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Master animation one challenge at a time. Build your streak, earn points, and become a motion design expert.
            </p>
          </div>

          {/* Progress + Calendar section */}
          <div className="mt-8 sm:mt-12 flex flex-col xl:flex-row justify-between items-start gap-6 lg:gap-8">
            {/* Left side - Progress Card */}
            <div className="w-full xl:flex-1 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border-2 border-primary-500 dark:border-accent-500 ring-2 ring-primary-500/20 dark:ring-accent-500/20 relative overflow-hidden">
              {/* Decorative gradient blobs */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary-500/30 to-accent-500/30 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-accent-500/20 to-primary-500/20 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-primary-600/10 to-accent-600/10 rounded-full blur-xl pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg animate-bounce-slow">
                  <span className="text-white font-bold text-2xl">📊</span>
                </div>
                <h3 className="text-3xl font-extrabold bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent tracking-tight drop-shadow">
                  Your Progress
                </h3>
                <span className="ml-auto px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/40 dark:to-accent-900/40 text-primary-700 dark:text-accent-200 font-semibold shadow">
                  {completionRate}%
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-500 p-6 rounded-2xl text-white shadow-xl hover:scale-105 transition-transform duration-300 border-2 border-yellow-300">
                  <div className="text-4xl font-black drop-shadow-lg animate-pop">{progress.totalPoints}</div>
                  <div className="text-yellow-100 font-medium mt-2 tracking-wide">Total Points</div>
                </div>
                <div className="flex flex-col items-center justify-center bg-gradient-to-br from-red-500 to-pink-600 p-6 rounded-2xl text-white shadow-xl hover:scale-105 transition-transform duration-300 border-2 border-pink-300">
                  <div className="text-4xl font-black drop-shadow-lg animate-pop">{streak}</div>
                  <div className="text-red-100 font-medium mt-2 tracking-wide">Current Streak</div>
                </div>
                <div className="flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl text-white shadow-xl hover:scale-105 transition-transform duration-300 border-2 border-green-300">
                  <div className="text-4xl font-black drop-shadow-lg animate-pop">{progress.completedDates.length}</div>
                  <div className="text-green-100 font-medium mt-2 tracking-wide">Completed</div>
                </div>
              </div>

              {/* Enhanced Progress Bar */}
              <div className="space-y-3 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">Monthly Progress</span>
                  <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">{completionRate}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-5 overflow-hidden shadow-inner border border-primary-200 dark:border-accent-700">
                  <div
                    className="bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 dark:from-primary-400 dark:via-accent-400 dark:to-primary-400 h-full rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden animate-progress"
                    style={{ width: `${completionRate}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Calendar */}
            <div className="w-full xl:w-[400px] flex-shrink-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border-2 border-primary-500 dark:border-accent-500 ring-2 ring-primary-500/20 dark:ring-accent-500/20 relative overflow-hidden">
              <MiniCalendar />
            </div>
          </div>
        </section>

        {/* Challenge Card */}
        <section className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Editor + Actions */}
          <div className="lg:col-span-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl p-6 rounded-3xl border-2 border-primary-500 dark:border-accent-500 shadow-2xl space-y-6 ring-2 ring-primary-500/20 dark:ring-accent-500/20 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                {/* Challenge Info */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-xs uppercase tracking-widest text-slate-500 font-bold px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">
                    Challenge #{challenge.id} / 30
                  </div>
                  <div className={`text-xs font-bold px-3 py-1 rounded-full ${
                    challenge.difficulty === "Easy"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : challenge.difficulty === "Medium"
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                  }`}>
                    {challenge.difficulty}
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                  {challenge.title}
                </h2>
                {/* Enhanced Target & Keywords */}
                <div className="flex flex-col gap-3 mt-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-block px-2 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold text-xs">Target</span>
                    <span className="text-slate-700 dark:text-slate-200 font-medium">{challenge.targetTip}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-block px-2 py-1 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-semibold text-xs">Keywords</span>
                    {challenge.checks.map((check, i) => (
                      <span key={i} className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-mono border border-slate-200 dark:border-slate-600">
                        {check}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Simple Stats Section */}
              <div className="flex flex-col gap-2 min-w-[160px] max-w-[220px] bg-gradient-to-br from-white/95 to-blue-100 dark:from-slate-900/95 dark:to-blue-900/80 border px-4 py-4 border-blue-200 dark:border-blue-700 rounded-xl shadow-lg">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Total Points :</span>
                  <span className="text-xl font-bold text-blue-700 dark:text-blue-300">{progress.totalPoints}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Streak :</span>
                  <span className="text-lg font-bold text-purple-700 dark:text-purple-300">{streak} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Today's Points :</span>
                  <span className="text-base font-bold text-pink-700 dark:text-pink-300">+{challenge.points}</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="w-full h-80 md:h-96 rounded-2xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm p-4 focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all duration-300 shadow-inner resize-none"
                placeholder="Write your HTML/CSS/JS animation here..."
              />
              <div className="absolute top-3 right-3 flex gap-1">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {/* Run Code Button */}
              <button
                onClick={runCode}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold border-2 border-cyan-300 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95 focus:ring-4 focus:ring-cyan-400/40"
                style={{ boxShadow: "0 4px 24px rgba(0, 180, 255, 0.10)" }}
              >
                <span className="animate-spin-slow">▶️</span>
                <span>Run Code</span>
              </button>

              {/* Submit Solution Button */}
              <button
                onClick={submit}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-bold border-2 border-purple-400 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95 focus:ring-4 focus:ring-purple-400/40"
                style={{ boxShadow: "0 4px 24px rgba(180, 0, 255, 0.10)" }}
              >
                <span className="animate-bounce">✅</span>
                <span>Submit Solution</span>
              </button>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setCode(challenge.starter);
                  setSubmitted(false);
                  setScoreMsg("");
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-yellow-300 to-orange-400 text-slate-800 font-semibold border-2 border-yellow-300 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95 focus:ring-4 focus:ring-yellow-300/40"
                style={{ boxShadow: "0 4px 24px rgba(255, 200, 0, 0.10)" }}
              >
                <span className="animate-spin">♻️</span>
                <span className="hidden sm:inline">Reset</span>
              </button>

              {/* Clear Progress Button */}
              <button
                onClick={() => {
                  const cleared = {
                    completedDates: [],
                    totalPoints: 0,
                    attempts: {},
                    streakBest: 0,
                  };
                  saveProgress(cleared);
                  setProgress(cleared);
                  setSubmitted(false);
                  setScoreMsg("");
                }}
                className="ml-auto flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-400 to-rose-600 text-white font-semibold border-2 border-red-400 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95 focus:ring-4 focus:ring-red-400/40"
                style={{ boxShadow: "0 4px 24px rgba(255, 0, 60, 0.10)" }}
              >
                <span className="animate-shake">🗑</span>
                <span className="hidden sm:inline">Clear Progress</span>
              </button>
            </div>

            {submitted && (
              <div
                className={`p-4 rounded-2xl border-2 font-medium shadow-lg ${
                  scoreMsg.startsWith("✅")
                    ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-300 dark:border-green-600 text-green-800 dark:text-green-200"
                    : "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-300 dark:border-amber-600 text-amber-800 dark:text-amber-200"
                } animate-pulse`}
              >
                {scoreMsg}
              </div>
            )}
          </div>

          {/* Preview Pane */}
          <div className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl p-6 rounded-3xl border-2 border-primary-500 dark:border-accent-500 shadow-2xl space-y-4 ring-2 ring-primary-500/20 dark:ring-accent-500/20 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">👁️</span>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-white bg-clip-text text-transparent">
                  Live Preview
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">
                HTML/CSS/JS Sandbox
              </span>
            </div>
            
            <div className="rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl relative">
              <div className="absolute top-0 left-0 right-0 h-8 bg-slate-100 dark:bg-slate-800 flex items-center justify-center gap-2 border-b border-slate-200 dark:border-slate-700">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <iframe
                ref={iframeRef}
                title="challenge-preview"
                className="w-full h-96 mt-8"
              />
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-2xl border border-blue-200 dark:border-blue-700">
              <div className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                <span className="font-semibold">💡 Pro Tip:</span> Use CSS properties like <code className="bg-white/50 dark:bg-slate-800/50 px-1 py-0.5 rounded text-xs">@keyframes</code>, <code className="bg-white/50 dark:bg-slate-800/50 px-1 py-0.5 rounded text-xs">transform</code>, <code className="bg-white/50 dark:bg-slate-800/50 px-1 py-0.5 rounded text-xs">animation</code>, and <code className="bg-white/50 dark:bg-slate-800/50 px-1 py-0.5 rounded text-xs">opacity</code> to create smooth animations.
              </div>
            </div>
          </div>
        </section>

        {/* Footer Callouts */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="group p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl border-2 border-primary-500 dark:border-accent-500 shadow-2xl ring-2 ring-primary-500/20 dark:ring-accent-500/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <span className="text-white font-bold">🔄</span>
              </div>
              <div className="text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-white bg-clip-text text-transparent">
                Monthly Rotation
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              30 unique challenges cycle each month. Miss a day? No worries! Jump back in anytime to continue your learning journey.
            </p>
          </div>

          <div className="group p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl border-2 border-primary-500 dark:border-accent-500 shadow-2xl ring-2 ring-primary-500/20 dark:ring-accent-500/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold">🏆</span>
              </div>
              <div className="text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-white bg-clip-text text-transparent">
                Points & Streaks
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Every completed challenge earns points. Build daily streaks to maximize your learning momentum and track your progress.
            </p>
          </div>

          <div className="group p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl border-2 border-primary-500 dark:border-accent-500 shadow-2xl ring-2 ring-primary-500/20 dark:ring-accent-500/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center group-hover:bounce transition-all duration-300">
                <span className="text-white font-bold">🚀</span>
              </div>
              <div className="text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-white bg-clip-text text-transparent">
                What's Next?
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Coming soon: difficulty filters, weekly events, global leaderboards, and community features. Keep practicing! 💪
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl rounded-full border-2 border-primary-500 dark:border-accent-500 shadow-xl">
            <span className="text-2xl">✨</span>
            <span className="font-semibold text-slate-600 dark:text-slate-300">
              Keep animating, keep growing!
            </span>
            <span className="text-2xl">✨</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ChallengeMode;

/* Add these custom animations to your global CSS:
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0);}
  50% { transform: translateY(-8px);}
}
@keyframes pop {
  0% { transform: scale(1);}
  60% { transform: scale(1.15);}
  100% { transform: scale(1);}
}
@keyframes progress {
  0% { width: 0;}
  100% { width: var(--tw-width);}
}
.animate-bounce-slow { animation: bounce-slow 2s infinite; }
.animate-pop { animation: pop 1s; }
.animate-progress { animation: progress 1.2s cubic-bezier(.4,0,.2,1); }
*/