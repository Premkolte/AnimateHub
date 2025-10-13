import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Mock challenge data for demo
const CHALLENGES = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `Animation Challenge ${i + 1}`,
  difficulty: i < 10 ? "Easy" : i < 20 ? "Medium" : "Hard",
  points: i < 10 ? 10 : i < 20 ? 15 : 20,
  targetTip: "Create a smooth fade-in animation",
  checks: ["@keyframes", "opacity", "transform"],
  starter: `<!DOCTYPE html>
<html>
<head>
<style>
  .box {
    width: 100px;
    height: 100px;
    background: linear-gradient(45deg, #3b82f6, #8b5cf6);
    margin: 50px auto;
    border-radius: 10px;
  }
</style>
</head>
<body>
  <div class="box"></div>
</body>
</html>`
}));

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

  // GSAP refs
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const progressCardsRef = useRef(null);
  const calendarRef = useRef(null);
  const challengeCardRef = useRef(null);
  const previewCardRef = useRef(null);
  const footerCardsRef = useRef(null);
  const backgroundBlobsRef = useRef(null);
  const progressBarRef = useRef(null);
  const submitMessageRef = useRef(null);

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

  // GSAP Animations Setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background blobs floating animation
      gsap.set(".bg-blob", { 
        rotation: "random(-45, 45)",
        scale: "random(0.8, 1.2)"
      });
      
      gsap.to(".bg-blob", {
        rotation: "+=360",
        duration: "random(20, 30)",
        repeat: -1,
        ease: "none"
      });

      gsap.to(".bg-blob", {
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        duration: "random(8, 12)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Initial page load animation
      const tl = gsap.timeline();
      
      // Logo entrance
      gsap.set(logoRef.current, { scale: 0, rotation: -180 });
      tl.to(logoRef.current, {
        scale: 1,
        rotation: 12,
        duration: 1,
        ease: "back.out(2)"
      });

      // Header text stagger
      tl.fromTo(".header-text", 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.2,
          ease: "power3.out"
        }, 
        "-=0.5"
      );

      // Progress cards entrance
      tl.fromTo(".progress-card", 
        { y: 80, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.6, 
          stagger: 0.1,
          ease: "back.out(1.2)"
        }, 
        "-=0.3"
      );

      // Calendar entrance
      tl.fromTo(calendarRef.current, 
        { x: 100, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8,
          ease: "power3.out"
        }, 
        "-=0.6"
      );

      // Challenge card entrance
      tl.fromTo(challengeCardRef.current, 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          ease: "power3.out"
        }, 
        "-=0.4"
      );

      // Preview card entrance
      tl.fromTo(previewCardRef.current, 
        { x: 100, opacity: 0, scale: 0.95 },
        { 
          x: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.8,
          ease: "power3.out"
        }, 
        "-=0.6"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Calendar cells animation on mount
  useEffect(() => {
    const calendarCells = document.querySelectorAll('[aria-label="calendar-grid"] > div');
    
    gsap.fromTo(calendarCells, 
      { scale: 0, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.4, 
        stagger: {
          grid: [7, 5],
          from: "start",
          amount: 0.8
        },
        ease: "back.out(1.5)",
        delay: 1.2
      }
    );
  }, [progress.completedDates]);

  // Footer cards scroll trigger
  useEffect(() => {
    const footerCards = document.querySelectorAll('.footer-card');
    
    footerCards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  // Animate progress bar and numbers
  useEffect(() => {
    const completionRate = Math.min(100, Math.round((progress.completedDates.length / 30) * 100));
    
    // Animate progress bar width
    gsap.to(progressBarRef.current, {
      width: `${completionRate}%`,
      duration: 1.2,
      ease: "power2.out"
    });

    // Animate numbers counting up
    const progressNumbers = document.querySelectorAll('.animate-number');
    progressNumbers.forEach(el => {
      const finalValue = parseInt(el.textContent);
      gsap.from({ value: 0 }, {
        value: finalValue,
        duration: 1,
        ease: "power2.out",
        onUpdate: function() {
          el.textContent = Math.round(this.targets()[0].value);
        }
      });
    });
  }, [progress.totalPoints, progress.completedDates, progress.streakBest]);

  // Submit message animation
  useEffect(() => {
    if (submitted && submitMessageRef.current) {
      gsap.fromTo(submitMessageRef.current,
        { scale: 0, y: 20, opacity: 0 },
        { 
          scale: 1, 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          ease: "back.out(2)" 
        }
      );
    }
  }, [submitted]);

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

  // Button hover animations
  const handleButtonHover = (e, isEntering) => {
    if (isEntering) {
      gsap.to(e.currentTarget, {
        scale: 1.05,
        duration: 0.3,
        ease: "back.out(2)"
      });
    } else {
      gsap.to(e.currentTarget, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleButtonClick = (e) => {
    gsap.to(e.currentTarget, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
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
              <span className="animate-number">{streak}</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold shadow-lg">
              <span>⭐</span>
              <span className="animate-number">{progress.streakBest || 0}</span>
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
                  "flex items-center justify-center font-semibold transition-all duration-300 cursor-pointer calendar-cell",
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
                onMouseEnter={(e) => {
                  if (!done) {
                    gsap.to(e.currentTarget, {
                      scale: 1.1,
                      duration: 0.2,
                      ease: "power2.out"
                    });
                  }
                }}
                onMouseLeave={(e) => {
                  if (!done && !isToday) {
                    gsap.to(e.currentTarget, {
                      scale: 1,
                      duration: 0.2,
                      ease: "power2.out"
                    });
                  }
                }}
              >
                <span className={isToday ? "font-bold" : ""}>{day}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-slate-600 dark:text-slate-300">Monthly Progress</span>
            <span className="text-slate-800 dark:text-white font-bold animate-number">{completionRate}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden shadow-inner">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg relative overflow-hidden"
              style={{ width: "0%" }}
            >
              <div className="absolute inset-0 bg-white/20"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey) {
        switch (event.key) {
          case ',':
            event.preventDefault();
            runCode();
            break;
          case 'Enter':
            event.preventDefault();
            submit();
            break;
          case 'r':
          case 'R':
            event.preventDefault();
            setCode(challenge.starter);
            setSubmitted(false);
            setScoreMsg("");
            break;
          case 'd':
          case 'D':
            event.preventDefault();
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
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [code, challenge.starter]); 

  /* ------------------------------ UI Render ------------------------------ */
  return (
    <div ref={containerRef} className="min-h-screen w-full py-4 sm:py-8 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-900 dark:text-white relative overflow-x-hidden">
      {/* Animated Background Elements */}
      <div ref={backgroundBlobsRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-blob absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="bg-blob absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
        <div className="bg-blob absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-cyan-600/10 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 relative z-10">
        {/* Header */}
        <section ref={headerRef} className="relative">
          <div className="text-center space-y-6 transition-transform duration-500 hover:scale-105">
            <div className="flex justify-center">
              <div className="relative">
                <div 
                  ref={logoRef}
                  className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 rounded-3xl mb-4 shadow-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-500 cursor-pointer"
                >
                  <span className="text-3xl transform -rotate-12">🔥</span>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-lg opacity-30 -z-10"></div>
              </div>
            </div>
            <h1 className=" header-text text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Challenge Mode
            </h1>
            <p className="header-text text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Master animation one challenge at a time. Build your streak, earn points, and become a motion design expert.
            </p>
          </div>

          {/* Progress + Calendar section */}
          <div className="mt-8 sm:mt-12 flex flex-col xl:flex-row justify-between items-start gap-6 lg:gap-8">
            {/* Left side - Progress Card */}
            <div className="progress-card w-full xl:flex-1 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border-2 border-primary-500 dark:border-accent-500 ring-2 ring-primary-500/20 dark:ring-accent-500/20 relative overflow-hidden">
              {/* Decorative gradient blobs */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary-500/30 to-accent-500/30 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-accent-500/20 to-primary-500/20 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-primary-600/10 to-accent-600/10 rounded-full blur-xl pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">📊</span>
                </div>
                <h3 className="text-3xl font-extrabold bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent tracking-tight drop-shadow">
                  Your Progress
                </h3>
                <span className="ml-auto px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/40 dark:to-accent-900/40 text-primary-700 dark:text-accent-200 font-semibold shadow animate-number">
                  {completionRate}%
                </span>
              </div>

              <div ref={progressCardsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="stat-card flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-500 p-6 rounded-2xl text-white shadow-xl hover:scale-105 transition-transform duration-300 border-2 border-yellow-300 cursor-pointer"
                     onMouseEnter={(e) => handleButtonHover(e, true)}
                     onMouseLeave={(e) => handleButtonHover(e, false)}>
                  <div className="text-4xl font-black drop-shadow-lg animate-number">{progress.totalPoints}</div>
                  <div className="text-yellow-100 font-medium mt-2 tracking-wide">Total Points</div>
                </div>
                <div className="stat-card flex flex-col items-center justify-center bg-gradient-to-br from-red-500 to-pink-600 p-6 rounded-2xl text-white shadow-xl hover:scale-105 transition-transform duration-300 border-2 border-pink-300 cursor-pointer"
                     onMouseEnter={(e) => handleButtonHover(e, true)}
                     onMouseLeave={(e) => handleButtonHover(e, false)}>
                  <div className="text-4xl font-black drop-shadow-lg animate-number">{streak}</div>
                  <div className="text-red-100 font-medium mt-2 tracking-wide">Current Streak</div>
                </div>
                <div className="stat-card flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl text-white shadow-xl hover:scale-105 transition-transform duration-300 border-2 border-green-300 cursor-pointer"
                     onMouseEnter={(e) => handleButtonHover(e, true)}
                     onMouseLeave={(e) => handleButtonHover(e, false)}>
                  <div className="text-4xl font-black drop-shadow-lg animate-number">{progress.completedDates.length}</div>
                  <div className="text-green-100 font-medium mt-2 tracking-wide">Completed</div>
                </div>
              </div>

              {/* Enhanced Progress Bar */}
              <div className="space-y-3 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">Monthly Progress</span>
                  <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent animate-number">{completionRate}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-5 overflow-hidden shadow-inner border border-primary-200 dark:border-accent-700">
                  <div
                    ref={progressBarRef}
                    className="bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 dark:from-primary-400 dark:via-accent-400 dark:to-primary-400 h-full rounded-full shadow-lg relative overflow-hidden"
                    style={{ width: "0%" }}
                  >
                    <div className="absolute inset-0 bg-white/20"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Calendar */}
            <div ref={calendarRef} className="w-full xl:w-[400px] flex-shrink-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border-2 border-primary-500 dark:border-accent-500 ring-2 ring-primary-500/20 dark:ring-accent-500/20 relative overflow-hidden">
              <MiniCalendar />
            </div>
          </div>
        </section>

        {/* Challenge Card */}
        <section className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Editor + Actions */}
          <div ref={challengeCardRef} className="lg:col-span-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl p-6 rounded-3xl border-2 border-primary-500 dark:border-accent-500 shadow-2xl space-y-6 ring-2 ring-primary-500/20 dark:ring-accent-500/20 relative overflow-hidden">
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
                  <span className="text-xl font-bold text-blue-700 dark:text-blue-300 animate-number">{progress.totalPoints}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Streak :</span>
                  <span className="text-lg font-bold text-purple-700 dark:text-purple-300 animate-number">{streak} days</span>
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
                onFocus={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }}
                onBlur={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }}
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
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
                onMouseDown={handleButtonClick}
                className="action-btn flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold border-2 border-cyan-300 shadow-lg hover:shadow-2xl transition-all duration-300 focus:ring-4 focus:ring-cyan-400/40"
                style={{ boxShadow: "0 4px 24px rgba(0, 180, 255, 0.10)" }}
              >
                <span>▶️</span>
                <span>Run Code</span>
              </button>

              {/* Submit Solution Button */}
              <button
                onClick={submit}
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
                onMouseDown={handleButtonClick}
                className="action-btn flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-bold border-2 border-purple-400 shadow-lg hover:shadow-2xl transition-all duration-300 focus:ring-4 focus:ring-purple-400/40"
                style={{ boxShadow: "0 4px 24px rgba(180, 0, 255, 0.10)" }}
              >
                <span>✅</span>
                <span>Submit Solution</span>
              </button>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setCode(challenge.starter);
                  setSubmitted(false);
                  setScoreMsg("");
                }}
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
                onMouseDown={handleButtonClick}
                className="action-btn flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-yellow-300 to-orange-400 text-slate-800 font-semibold border-2 border-yellow-300 shadow-lg hover:shadow-2xl transition-all duration-300 focus:ring-4 focus:ring-yellow-300/40"
                style={{ boxShadow: "0 4px 24px rgba(255, 200, 0, 0.10)" }}
              >
                <span>♻️</span>
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
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
                onMouseDown={handleButtonClick}
                className="action-btn ml-auto flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-400 to-rose-600 text-white font-semibold border-2 border-red-400 shadow-lg hover:shadow-2xl transition-all duration-300 focus:ring-4 focus:ring-red-400/40"
                style={{ boxShadow: "0 4px 24px rgba(255, 0, 60, 0.10)" }}
              >
                <span>🗑</span>
                <span className="hidden sm:inline">Clear Progress</span>
              </button>
            </div>

            {submitted && (
              <div
                ref={submitMessageRef}
                className={`p-4 rounded-2xl border-2 font-medium shadow-lg ${
                  scoreMsg.startsWith("✅")
                    ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-300 dark:border-green-600 text-green-800 dark:text-green-200"
                    : "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-300 dark:border-amber-600 text-amber-800 dark:text-amber-200"
                }`}
              >
                {scoreMsg}
              </div>
            )}
          </div>

          {/* Preview Pane */}
          <div ref={previewCardRef} className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl p-6 rounded-3xl border-2 border-primary-500 dark:border-accent-500 shadow-2xl space-y-4 ring-2 ring-primary-500/20 dark:ring-accent-500/20 relative overflow-hidden">
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
        <section ref={footerCardsRef} className="grid md:grid-cols-3 gap-6">
          <div className="footer-card group p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl border-2 border-primary-500 dark:border-accent-500 shadow-2xl ring-2 ring-primary-500/20 dark:ring-accent-500/20 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden cursor-pointer"
               onMouseEnter={(e) => {
                 gsap.to(e.currentTarget, {
                   y: -8,
                   scale: 1.02,
                   duration: 0.3,
                   ease: "power2.out"
                 });
                 gsap.to(e.currentTarget.querySelector('.card-icon'), {
                   rotation: 12,
                   scale: 1.1,
                   duration: 0.3,
                   ease: "back.out(2)"
                 });
               }}
               onMouseLeave={(e) => {
                 gsap.to(e.currentTarget, {
                   y: 0,
                   scale: 1,
                   duration: 0.3,
                   ease: "power2.out"
                 });
                 gsap.to(e.currentTarget.querySelector('.card-icon'), {
                   rotation: 0,
                   scale: 1,
                   duration: 0.3,
                   ease: "power2.out"
                 });
               }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="card-icon w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center transition-transform duration-300">
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

          <div className="footer-card group p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl border-2 border-primary-500 dark:border-accent-500 shadow-2xl ring-2 ring-primary-500/20 dark:ring-accent-500/20 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden cursor-pointer"
               onMouseEnter={(e) => {
                 gsap.to(e.currentTarget, {
                   y: -8,
                   scale: 1.02,
                   duration: 0.3,
                   ease: "power2.out"
                 });
                 gsap.to(e.currentTarget.querySelector('.card-icon'), {
                   scale: 1.2,
                   duration: 0.3,
                   ease: "back.out(2)"
                 });
               }}
               onMouseLeave={(e) => {
                 gsap.to(e.currentTarget, {
                   y: 0,
                   scale: 1,
                   duration: 0.3,
                   ease: "power2.out"
                 });
                 gsap.to(e.currentTarget.querySelector('.card-icon'), {
                   scale: 1,
                   duration: 0.3,
                   ease: "power2.out"
                 });
               }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="card-icon w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center transition-transform duration-300">
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

          <div className="footer-card group p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl border-2 border-primary-500 dark:border-accent-500 shadow-2xl ring-2 ring-primary-500/20 dark:ring-accent-500/20 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden cursor-pointer"
               onMouseEnter={(e) => {
                 gsap.to(e.currentTarget, {
                   y: -8,
                   scale: 1.02,
                   duration: 0.3,
                   ease: "power2.out"
                 });
                 gsap.to(e.currentTarget.querySelector('.card-icon'), {
                   y: -4,
                   duration: 0.3,
                   ease: "back.out(2)"
                 });
               }}
               onMouseLeave={(e) => {
                 gsap.to(e.currentTarget, {
                   y: 0,
                   scale: 1,
                   duration: 0.3,
                   ease: "power2.out"
                 });
                 gsap.to(e.currentTarget.querySelector('.card-icon'), {
                   y: 0,
                   duration: 0.3,
                   ease: "power2.out"
                 });
               }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="card-icon w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center transition-all duration-300">
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
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl rounded-full border-2 border-primary-500 dark:border-accent-500 shadow-xl"
               onMouseEnter={(e) => {
                 gsap.to(e.currentTarget, {
                   scale: 1.05,
                   duration: 0.3,
                   ease: "back.out(2)"
                 });
               }}
               onMouseLeave={(e) => {
                 gsap.to(e.currentTarget, {
                   scale: 1,
                   duration: 0.3,
                   ease: "power2.out"
                 });
               }}>
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