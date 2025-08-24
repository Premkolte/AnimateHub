import React, { useEffect, useMemo, useRef, useState } from "react";

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

/* ----------------------- Challenge Bank (30 items) ---------------------- */
/**
 * Each challenge has minimal auto-checks:
 *  - "includes": substring checks on the user's code (simple MVP validator)
 *  - points: awarded if all checks pass
 *  - starter: preloaded code
 *  - targetTip: description of expected effect
 */
const CHALLENGES = [
  {
    id: 1,
    title: "Fade In Card",
    difficulty: "Easy",
    points: 50,
    targetTip: "Make a box fade in from opacity 0 to 1 in 1s.",
    checks: ["opacity", "animation", "keyframes", "1s"],
    starter: `<style>
.box{
  width:140px;height:140px;border-radius:16px;
  background:#3b82f6;margin:30px auto;opacity:0;
  /* your animation here */
}
</style>
<div class="box"></div>
<script>
// Hint: Define @keyframes fadeIn and apply animation to .box
</script>`,
  },
  {
    id: 2,
    title: "Slide Up",
    difficulty: "Easy",
    points: 50,
    targetTip: "Slide a circle up 80px while fading in.",
    checks: ["transform", "translateY", "animation", "keyframes"],
    starter: `<style>
.ball{
  width:90px;height:90px;border-radius:50%;
  background:#10b981;margin:50px auto;opacity:0;
  /* animate to translateY(-80px) and opacity:1 */
}
</style>
<div class="ball"></div>`,
  },
  {
    id: 3,
    title: "Bouncy Scale",
    difficulty: "Easy",
    points: 60,
    targetTip: "Scale from 0.7 → 1 with a bouncy easing feel.",
    checks: ["scale", "animation", "keyframes"],
    starter: `<style>
.item{width:120px;height:120px;border-radius:20px;background:#f59e0b;margin:40px auto;transform:scale(.7)}
</style>
<div class="item"></div>`,
  },
  {
    id: 4,
    title: "Spinner",
    difficulty: "Easy",
    points: 50,
    targetTip: "Create a looping spinner (rotate 360°).",
    checks: ["rotate", "360deg", "infinite", "animation"],
    starter: `<style>
.spinner{
  width:80px;height:80px;border-radius:50%;border:8px solid #ddd;border-top-color:#6366f1;margin:40px auto;
  /* infinite rotate */
}
</style>
<div class="spinner"></div>`,
  },
  {
    id: 5,
    title: "Pulse Button",
    difficulty: "Easy",
    points: 60,
    targetTip: "Make a button pulse (grow/shrink).",
    checks: ["@keyframes", "scale", "animation"],
    starter: `<style>
.btn{display:block;margin:50px auto;padding:12px 24px;border-radius:12px;background:#8b5cf6;color:#fff;border:none;font-weight:700}
</style>
<button class="btn">Pulse Me</button>`,
  },
  {
    id: 6,
    title: "Shake Effect",
    difficulty: "Easy",
    points: 60,
    targetTip: "Shake a box left and right quickly.",
    checks: ["translateX", "keyframes", "animation"],
    starter: `<style>
.box{width:120px;height:120px;background:#ef4444;margin:40px auto}
</style>
<div class="box"></div>`,
  },
  {
    id: 7,
    title: "Flip Card",
    difficulty: "Medium",
    points: 80,
    targetTip: "Flip a card 180° on the Y axis.",
    checks: ["rotateY", "transform", "animation"],
    starter: `<style>
.card{width:120px;height:160px;background:#6366f1;margin:40px auto}
</style>
<div class="card"></div>`,
  },
  {
    id: 8,
    title: "Typewriter Text",
    difficulty: "Medium",
    points: 80,
    targetTip: "Reveal text like a typewriter effect.",
    checks: ["steps", "width", "overflow", "animation"],
    starter: `<style>
.text{font:24px monospace;white-space:nowrap;overflow:hidden;width:0;border-right:2px solid}
</style>
<div class="text">Animate This Text</div>`,
  },
  {
    id: 9,
    title: "Wobble",
    difficulty: "Medium",
    points: 80,
    targetTip: "Make a rectangle wobble (rotate small angles).",
    checks: ["rotate", "animation", "keyframes"],
    starter: `<style>
.rect{width:160px;height:80px;background:#22d3ee;margin:40px auto}
</style>
<div class="rect"></div>`,
  },
  {
    id: 10,
    title: "Loading Dots",
    difficulty: "Medium",
    points: 80,
    targetTip: "Animate 3 dots bouncing in sequence.",
    checks: ["scale", "animation-delay", "infinite"],
    starter: `<style>
.dot{width:16px;height:16px;background:#000;border-radius:50%;display:inline-block;margin:0 4px}
</style>
<div class="dot"></div><div class="dot"></div><div class="dot"></div>`,
  },
  {
    id: 11,
    title: "Slide Carousel",
    difficulty: "Medium",
    points: 80,
    targetTip: "Slide items horizontally in a loop.",
    checks: ["translateX", "infinite", "animation"],
    starter: `<style>
.track{display:flex;gap:12px;overflow:hidden;width:300px;margin:auto}
.item{width:80px;height:80px;background:#f87171}
</style>
<div class="track">
 <div class="item"></div><div class="item"></div><div class="item"></div>
</div>`,
  },
  {
    id: 12,
    title: "Heartbeat",
    difficulty: "Medium",
    points: 80,
    targetTip: "Animate a heart shape to beat (scale up/down).",
    checks: ["scale", "keyframes", "animation"],
    starter: `<style>
.heart{width:100px;height:100px;background:red;transform:rotate(45deg);margin:40px auto;position:relative}
.heart:before,.heart:after{content:"";position:absolute;width:100px;height:100px;background:red;border-radius:50%}
.heart:before{left:-50px}
.heart:after{top:-50px}
</style>
<div class="heart"></div>`,
  },
  {
    id: 13,
    title: "Orbiting Planet",
    difficulty: "Medium",
    points: 80,
    targetTip: "Make a small circle orbit around a larger one.",
    checks: ["rotate", "transform-origin", "animation"],
    starter: `<style>
.planet{width:40px;height:40px;background:#10b981;border-radius:50%;position:relative;margin:80px auto}
.moon{width:20px;height:20px;background:#fbbf24;border-radius:50%;position:absolute;top:10px;left:60px}
</style>
<div class="planet"><div class="moon"></div></div>`,
  },
  {
    id: 14,
    title: "Wave Text",
    difficulty: "Medium",
    points: 80,
    targetTip: "Animate letters to wave up and down sequentially.",
    checks: ["translateY", "animation-delay"],
    starter: `<style>
span{display:inline-block;font-size:28px;margin:0 2px}
</style>
<div>
 <span>W</span><span>A</span><span>V</span><span>E</span>
</div>`,
  },
  {
    id: 15,
    title: "Falling Snow",
    difficulty: "Medium",
    points: 80,
    targetTip: "Create multiple snowflakes falling infinitely.",
    checks: ["translateY", "infinite", "keyframes"],
    starter: `<style>
.snow{position:absolute;width:12px;height:12px;background:white;border-radius:50%}
</style>
<div class="snow"></div><div class="snow"></div><div class="snow"></div>`,
  },
  {
    id: 16,
    title: "Swinging Pendulum",
    difficulty: "Hard",
    points: 100,
    targetTip: "Animate a pendulum swinging side to side.",
    checks: ["rotate", "transform-origin", "animation"],
    starter: `<style>
.pendulum{width:6px;height:180px;background:#333;margin:20px auto;transform-origin:top}
</style>
<div class="pendulum"></div>`,
  },
  {
    id: 17,
    title: "Ripple Effect",
    difficulty: "Hard",
    points: 100,
    targetTip: "Create expanding ripple circles.",
    checks: ["scale", "opacity", "infinite"],
    starter: `<style>
.ripple{width:100px;height:100px;border-radius:50%;border:4px solid #3b82f6;margin:40px auto}
</style>
<div class="ripple"></div>`,
  },
  {
    id: 18,
    title: "Glowing Neon",
    difficulty: "Hard",
    points: 100,
    targetTip: "Make text glow with animated shadows.",
    checks: ["text-shadow", "animation", "keyframes"],
    starter: `<style>
.glow{font-size:40px;color:#fff;text-align:center;margin-top:50px}
</style>
<div class="glow">NEON</div>`,
  },
  {
    id: 19,
    title: "Morphing Shape",
    difficulty: "Hard",
    points: 100,
    targetTip: "Morph between circle and square.",
    checks: ["border-radius", "keyframes", "animation"],
    starter: `<style>
.shape{width:120px;height:120px;background:#ec4899;margin:40px auto}
</style>
<div class="shape"></div>`,
  },
  {
    id: 20,
    title: "Path Animation",
    difficulty: "Hard",
    points: 100,
    targetTip: "Move an element along a path using translate.",
    checks: ["translate", "animation", "keyframes"],
    starter: `<style>
.box{width:40px;height:40px;background:#0ea5e9;margin:60px auto}
</style>
<div class="box"></div>`,
  },
  {
    id: 21,
    title: "3D Cube Spin",
    difficulty: "Hard",
    points: 120,
    targetTip: "Animate a 3D cube rotation.",
    checks: ["rotateX", "rotateY", "perspective"],
    starter: `<style>
.scene{width:120px;height:120px;margin:60px auto;perspective:600px}
.cube{width:100%;height:100%;position:relative;transform-style:preserve-3d}
.face{position:absolute;width:120px;height:120px;background:#8b5cf6;opacity:.8}
</style>
<div class="scene"><div class="cube"><div class="face"></div></div></div>`,
  },
  {
    id: 22,
    title: "SVG Line Draw",
    difficulty: "Hard",
    points: 120,
    targetTip: "Animate SVG stroke to look like drawing.",
    checks: ["stroke-dasharray", "stroke-dashoffset"],
    starter: `<svg width="200" height="100">
  <path d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
    stroke="blue" fill="transparent" stroke-width="3"/>
</svg>`,
  },
  {
    id: 23,
    title: "Clipping Reveal",
    difficulty: "Hard",
    points: 120,
    targetTip: "Reveal text using clip-path animation.",
    checks: ["clip-path", "animation", "keyframes"],
    starter: `<style>
.text{font-size:48px;font-weight:700;text-align:center;background:linear-gradient(90deg,#f43f5e,#3b82f6);-webkit-background-clip:text;color:transparent}
</style>
<div class="text">Reveal</div>`,
  },
  {
    id: 24,
    title: "Fire Effect",
    difficulty: "Hard",
    points: 120,
    targetTip: "Simulate flickering fire effect with blur.",
    checks: ["filter", "animation", "keyframes"],
    starter: `<style>
.fire{width:60px;height:80px;background:orange;margin:60px auto;border-radius:50%}
</style>
<div class="fire"></div>`,
  },
  {
    id: 25,
    title: "Galaxy Background",
    difficulty: "Hard",
    points: 120,
    targetTip: "Animate stars twinkling in background.",
    checks: ["opacity", "infinite", "keyframes"],
    starter: `<style>
.star{position:absolute;width:4px;height:4px;background:white;border-radius:50%}
</style>
<div class="star"></div><div class="star"></div>`,
  },
  {
    id: 26,
    title: "Text Bounce In",
    difficulty: "Medium",
    points: 90,
    targetTip: "Bounce text in from the top.",
    checks: ["translateY", "ease-out", "keyframes"],
    starter: `<style>
h1{text-align:center;font-size:40px}
</style>
<h1>Bounce!</h1>`,
  },
  {
    id: 27,
    title: "Button Hover Glow",
    difficulty: "Medium",
    points: 90,
    targetTip: "Add glowing hover animation to a button.",
    checks: ["hover", "box-shadow", "transition"],
    starter: `<style>
button{padding:12px 24px;border-radius:12px;border:none;background:#3b82f6;color:#fff;font-size:16px;margin:50px auto;display:block}
</style>
<button>Hover Me</button>`,
  },
  {
    id: 28,
    title: "Accordion Expand",
    difficulty: "Medium",
    points: 90,
    targetTip: "Animate accordion height expand/collapse.",
    checks: ["max-height", "transition"],
    starter: `<style>
.panel{max-height:0;overflow:hidden;transition:max-height .6s ease}
</style>
<div class="panel">Content</div>`,
  },
  {
    id: 29,
    title: "Loading Bar Fill",
    difficulty: "Easy",
    points: 60,
    targetTip: "Animate a progress bar filling left to right.",
    checks: ["width", "animation", "keyframes"],
    starter: `<style>
.bar{width:0;height:20px;background:#22c55e;margin:40px auto}
</style>
<div class="bar"></div>`,
  },
  {
    id: 30,
    title: "Confetti Burst",
    difficulty: "Hard",
    points: 120,
    targetTip: "Make multiple shapes fall like confetti.",
    checks: ["rotate", "translateY", "animation"],
    starter: `<style>
.confetti{width:10px;height:10px;background:#f87171;position:absolute}
</style>
<div class="confetti"></div><div class="confetti"></div>`,
  },
];

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
      <div className="w-full sm:w-[320px] bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            {d.toLocaleString("default", { month: "long" })} {year}
          </div>
          <div className="text-xs text-slate-500">
            Streak: <span className="font-semibold">{streak}</span> • Best:{" "}
            <span className="font-semibold">{progress.streakBest || 0}</span>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-xs text-slate-500 mb-1">
          {["S","M","T","W","T","F","S"].map((d) => (
            <div key={d} className="text-center">{d}</div>
          ))}
        </div>
        {/* leading blanks */}
        <div
          className="grid grid-cols-7 gap-1 text-sm"
          aria-label="calendar-grid"
        >
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
                  "h-8 rounded-lg flex items-center justify-center border",
                  "transition-all",
                  done
                    ? "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700"
                    : "bg-white/70 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700",
                  isToday
                    ? "ring-2 ring-blue-500 font-semibold"
                    : "hover:bg-blue-50 dark:hover:bg-slate-700/50",
                ].join(" ")}
                title={done ? "Completed ✅" : "Incomplete"}
              >
                {day}
                {done && <span className="ml-1">✅</span>}
              </div>
            );
          })}
        </div>

        <div className="mt-3">
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <div className="text-right text-xs text-slate-500 mt-1">
            Month Progress: {completionRate}%
          </div>
        </div>
      </div>
    );
  };

  /* ------------------------------ UI Render ------------------------------ */
  return (
    <div className="min-h-screen w-full py-8 px-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <section className="relative">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-2 shadow-lg">
              <span className="text-2xl">🔥</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Challenge Mode
            </h1>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Solve one animation challenge every day. Earn points, build a streak, and level up your motion skills.
            </p>
          </div>

          {/* Progress + Calendar section */}
<div className="mt-6 flex justify-between items-start gap-6">
  {/* Left side - Bigger Progress Card */}
  <div className="flex-1 bg-white/80 dark:bg-slate-800/80 p-6 rounded-2xl shadow-md">
    <h3 className="text-3xl font-bold text-slate-700 dark:text-slate-200 mb-4">
      Your Progress
    </h3>

    <div className="space-y-5 text-slate-600 dark:text-slate-300">
      <p className="text-lg">⭐ {progress.totalPoints} pts</p>
      <p className="text-lg">🔥 Streak: {streak} days</p>
      <p className="text-lg">✅ Completed: {progress.completedDates.length}/30</p>
    </div>

    {/* Big Progress Bar */}
    <div className="mt-6 w-full bg-slate-200 rounded-full h-5">
      <div
        className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-500"
        style={{ width: `${completionRate}%` }}
      ></div>
    </div>
  </div>

  {/* Right side - Calendar */}
  <div className="w-[350px]">
    <MiniCalendar />
  </div>
</div>

        </section>

        {/* Challenge Card */}
        <section className="grid lg:grid-cols-5 gap-8">
          {/* Editor + Actions */}
          <div className="lg:col-span-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-500">
                  Today’s Challenge • #{challenge.id} / 30
                </div>
                <h2 className="text-2xl font-bold mt-1">{challenge.title}</h2>
                <div className="text-sm text-slate-500">
                  Difficulty:{" "}
                  <span
                    className={
                      challenge.difficulty === "Easy"
                        ? "text-green-600"
                        : challenge.difficulty === "Medium"
                        ? "text-amber-600"
                        : "text-rose-600"
                    }
                  >
                    {challenge.difficulty}
                  </span>{" "}
                  • Points: <b>{challenge.points}</b>
                </div>
                <div className="mt-2 text-slate-600 dark:text-slate-300">
                  <b>Target:</b> {challenge.targetTip}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  Checker looks for: {challenge.checks.join(", ")}
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-500">Your Points</div>
                <div className="text-3xl font-extrabold">
                  {progress.totalPoints}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  Streak: <b>{streak}</b> days
                </div>
              </div>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="w-full h-80 md:h-96 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm p-4 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Write HTML/CSS/JS here…"
            />

            <div className="flex flex-wrap gap-3">
              <button
                onClick={runCode}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-slate-600 transition"
              >
                ▶️ Run
              </button>
              <button
                onClick={submit}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition"
              >
                ✅ Submit
              </button>
              <button
                onClick={() => {
                  setCode(challenge.starter);
                  setSubmitted(false);
                  setScoreMsg("");
                }}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-slate-600 transition"
              >
                ♻️ Reset Starter
              </button>
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
                className="ml-auto px-4 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 text-rose-600 dark:text-rose-300 transition"
              >
                🗑 Reset Progress
              </button>
            </div>

            {submitted && (
              <div
                className={`mt-2 text-sm px-4 py-3 rounded-xl border ${
                  scoreMsg.startsWith("✅")
                    ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700 text-green-700 dark:text-green-200"
                    : "bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-200"
                }`}
              >
                {scoreMsg}
              </div>
            )}
          </div>

          {/* Preview Pane */}
          <div className="lg:col-span-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Preview</h3>
              <span className="text-xs text-slate-500">
                Sandbox iframe (HTML/CSS/JS)
              </span>
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
              <iframe
                ref={iframeRef}
                title="challenge-preview"
                className="w-full h-96"
              />
            </div>
            <div className="text-xs text-slate-500">
              Tip: Use <code>@keyframes</code>, <code>animation</code>,{" "}
              <code>transform</code>, <code>opacity</code>, etc. Then press
              <b> Run</b> → <b>Submit</b>.
            </div>
          </div>
        </section>

        {/* Footer Callouts */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow">
            <div className="text-lg font-semibold">Monthly Rotation</div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              30 challenges repeat each month. If you miss a day, keep going —
              streaks resume when you complete the current day’s task.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow">
            <div className="text-lg font-semibold">Points & Streaks</div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Completing a challenge awards points. Keep a daily streak to push
              your best score!
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow">
            <div className="text-lg font-semibold">What’s Next?</div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              We’ll add difficulty filters, weekly events, and global leaderboards
              (backend) later. For now, enjoy the practice loop 💪
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChallengeMode;
