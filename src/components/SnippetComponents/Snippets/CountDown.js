export const countdownTimeSnippets = [
  {
    title: "Customizable Countdown Timer",
    tags: ['countdown', 'timer', 'time', 'date', 'javascript', 'customizable'],
    cssCode: `
      <div style="padding: 16px; width: 100%; margin: 0 auto; background: #f8f9fa; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #e9ecef;">
        <div style="margin-bottom: 12px;">
          <input type="text" placeholder="Event Title" style="width: 100%; padding: 6px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 6px; font-size: clamp(12px, 3vw, 14px);" />
          <input type="datetime-local" style="width: 100%; padding: 6px; border: 1px solid #ddd; border-radius: 4px; font-size: clamp(12px, 3vw, 14px);" />
        </div>
        <h1 style="font-size: clamp(14px, 4vw, 16px); font-weight: bold; margin-bottom: 12px; text-align: center; color: #212529;">New Year Countdown</h1>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <span style="padding: 6px; background: #212529; color: white; border-radius: 4px; text-align: center;">
            <span style="font-weight: bold; font-size: clamp(16px, 5vw, 18px); display: block;">5</span>
            <span style="font-size: clamp(8px, 2.5vw, 10px);">days</span>
          </span>
          <span style="padding: 6px; background: #212529; color: white; border-radius: 4px; text-align: center;">
            <span style="font-weight: bold; font-size: clamp(16px, 5vw, 18px); display: block;">12</span>
            <span style="font-size: clamp(8px, 2.5vw, 10px);">hrs</span>
          </span>
          <span style="padding: 6px; background: #212529; color: white; border-radius: 4px; text-align: center;">
            <span style="font-weight: bold; font-size: clamp(16px, 5vw, 18px); display: block;">30</span>
            <span style="font-size: clamp(8px, 2.5vw, 10px);">min</span>
          </span>
          <span style="padding: 6px; background: #212529; color: white; border-radius: 4px; text-align: center;">
            <span style="font-weight: bold; font-size: clamp(16px, 5vw, 18px); display: block;">45</span>
            <span style="font-size: clamp(8px, 2.5vw, 10px);">sec</span>
          </span>
        </div>
      </div>`,
    jsxCode: `(props) => {
      const [targetDate, setTargetDate] = React.useState("2024-12-31T23:59:59");
      const [title, setTitle] = React.useState("Countdown to New Year");

      const calculateTimeLeft = () => {
        let difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          };
        }

        return timeLeft;
      };

      const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

      React.useEffect(() => {
        const timer = setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
      });

      const timerComponents = [];

      Object.keys(timeLeft).forEach(interval => {
        if (!timeLeft[interval]) {
          return;
        }
        timerComponents.push(
          <span key={interval} className="mx-1 sm:mx-2 p-1 sm:p-2 bg-blue-100 rounded">
            <span className="font-bold text-lg sm:text-2xl">{timeLeft[interval]}</span>
            <span className="text-xs sm:text-sm block">{interval}</span>
          </span>
        );
      });

      return (
        <div className="p-3 sm:p-6 w-full max-w-md mx-auto bg-white rounded-xl shadow-lg">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Countdown Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-1.5 sm:p-2 border rounded mb-2 text-sm sm:text-base"
            />
            <input
              type="datetime-local"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full p-1.5 sm:p-2 border rounded text-sm sm:text-base"
            />
          </div>
          <h1 className="text-lg sm:text-xl font-bold mb-4 text-center">{title}</h1>
          <div className="flex justify-center flex-wrap">
            {timerComponents.length ? timerComponents : 
              <span className="text-xl sm:text-2xl font-bold text-red-500">Time's up! 🎉</span>
            }
          </div>
        </div>
      );
    }`
  },
  {
    title: "Circular Progress Countdown",
    tags: ['countdown', 'timer', 'circular', 'progress', 'visual'],
    cssCode: `
      <div style="padding: 16px; width: 100%; margin: 0 auto; background: #f8f9fa; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #e9ecef;">
        <div style="margin-bottom: 12px;">
          <input type="text" placeholder="Event Name" style="width: 100%; padding: 6px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 6px; color: #212529; font-size: clamp(12px, 3vw, 14px);" />
          <input type="datetime-local" style="width: 100%; padding: 6px; border: 1px solid #ddd; border-radius: 4px; color: #212529; font-size: clamp(12px, 3vw, 14px);" />
        </div>
        <h1 style="font-size: clamp(14px, 4vw, 16px); font-weight: bold; margin-bottom: 12px; text-align: center; color: #212529;">New Year Event</h1>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; text-align: center;">
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="width: clamp(27px, 7vw, 35px); height: clamp(27px, 7vw, 35px); border: 2px solid #dc3545; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: rgba(33,37,41,0.05);">
              <div style="text-align: center;">
                <span style="font-size: clamp(8px, 2.5vw, 10px); font-weight: bold; display: block; color: #212529;">5</span>
              </div>
            </div>
            <span style="font-size: clamp(6px, 2vw, 8px); margin-top: 2px; color: #6c757d;">Days</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="width: clamp(27px, 7vw, 35px); height: clamp(27px, 7vw, 35px); border: 2px solid #ffc107; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: rgba(33,37,41,0.05);">
              <div style="text-align: center;">
                <span style="font-size: clamp(8px, 2.5vw, 10px); font-weight: bold; display: block; color: #212529;">12</span>
              </div>
            </div>
            <span style="font-size: clamp(6px, 2vw, 8px); margin-top: 2px; color: #6c757d;">Hrs</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="width: clamp(27px, 7vw, 35px); height: clamp(27px, 7vw, 35px); border: 2px solid #28a745; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: rgba(33,37,41,0.05);">
              <div style="text-align: center;">
                <span style="font-size: clamp(8px, 2.5vw, 10px); font-weight: bold; display: block; color: #212529;">30</span>
              </div>
            </div>
            <span style="font-size: clamp(6px, 2vw, 8px); margin-top: 2px; color: #6c757d;">Min</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="width: clamp(27px, 7vw, 35px); height: clamp(27px, 7vw, 35px); border: 2px solid #007bff; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: rgba(33,37,41,0.05);">
              <div style="text-align: center;">
                <span style="font-size: clamp(8px, 2.5vw, 10px); font-weight: bold; display: block; color: #212529;">45</span>
              </div>
            </div>
            <span style="font-size: clamp(6px, 2vw, 8px); margin-top: 2px; color: #6c757d;">Sec</span>
          </div>
        </div>
      </div>`,
    jsxCode: `(props) => {
      const [targetDate, setTargetDate] = React.useState("2024-12-31T23:59:59");
      const [eventName, setEventName] = React.useState("New Year");

      const calculateTimeLeft = () => {
        let difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};
        let totalSeconds = 0;

        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          };
          totalSeconds = Math.floor(difference / 1000);
        }

        return { timeLeft, totalSeconds };
      };

      const [time, setTime] = React.useState(calculateTimeLeft());

      React.useEffect(() => {
        const timer = setTimeout(() => {
          setTime(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
      });

      const CircularProgress = ({ value, max, children, color = "blue" }) => {
        const percentage = max > 0 ? (value / max) * 100 : 0;
        const strokeDasharray = 2 * Math.PI * 45;
        const strokeDashoffset = strokeDasharray - (percentage / 100) * strokeDasharray;
        
        return (
          <div className="relative w-16 h-16 sm:w-24 sm:h-24">
            <svg className="block w-full h-full" viewBox="0 0 100 100">
              <g transform="rotate(-90 50 50)">
                <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="8" fill="none" className="text-gray-200" />
                <circle
                  cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="8" fill="none"
                  className={\`text-\${color}-500\`}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </g>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                {children}
              </div>
            </div>
          </div>
        );
      };

      return (
        <div className="p-3 sm:p-6 w-full max-w-lg mx-auto bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl shadow-lg text-white">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full p-1.5 sm:p-2 border rounded mb-2 text-black dark:text-white text-sm sm:text-base"
            />
            <input
              type="datetime-local"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full p-1.5 sm:p-2 border rounded text-black dark:text-white text-sm sm:text-base"
            />
          </div>
          <h1 className="text-lg sm:text-2xl font-bold mb-6 text-center">Countdown to {eventName}</h1>
          {time.totalSeconds > 0 ? (
            <div className="grid grid-cols-2 gap-2 sm:gap-4 text-center scale-75 sm:scale-90">
              <CircularProgress value={time.timeLeft.days} max={365} color="red">
                <span className="text-sm sm:text-lg font-bold">{time.timeLeft.days}</span>
                <span className="text-xs block">Days</span>
              </CircularProgress>
              <CircularProgress value={time.timeLeft.hours} max={24} color="yellow">
                <span className="text-sm sm:text-lg font-bold">{time.timeLeft.hours}</span>
                <span className="text-xs block">Hours</span>
              </CircularProgress>
              <CircularProgress value={time.timeLeft.minutes} max={60} color="green">
                <span className="text-sm sm:text-lg font-bold">{time.timeLeft.minutes}</span>
                <span className="text-xs block">Min</span>
              </CircularProgress>
              <CircularProgress value={time.timeLeft.seconds} max={60} color="blue">
                <span className="text-sm sm:text-lg font-bold">{time.timeLeft.seconds}</span>
                <span className="text-xs block">Sec</span>
              </CircularProgress>
            </div>
          ) : (
            <div className="text-center text-xl sm:text-2xl font-bold">
              🎉 {eventName} is here! 🎉
            </div>
          )}
        </div>
      );
    }`
  },
  {
    title: "Minimalist Flip Clock Countdown",
    tags: ['countdown', 'timer', 'flip', 'clock', 'minimalist', 'animation'],
    cssCode: `
      <div style="padding: 20px; width: 100%; margin: 0 auto; background: #f3f4f6; border-radius: 12px; box-shadow: 0 8px 16px rgba(0,0,0,0.1);">
        <div style="margin-bottom: 16px;">
          <input type="text" placeholder="Event Description" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 6px; margin-bottom: 8px; text-align: center; font-size: clamp(12px, 3vw, 14px);" />
          <input type="datetime-local" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 6px; text-align: center; font-size: clamp(12px, 3vw, 14px);" />
        </div>
        <h2 style="font-size: clamp(16px, 4vw, 18px); font-weight: 300; text-align: center; margin-bottom: 20px; color: #374151;">Until New Year</h2>
        <div style="display: flex; justify-content: center; gap: clamp(8px, 3vw, 12px);">
          <div style="text-align: center;">
            <div style="width: clamp(40px, 10vw, 50px); height: clamp(48px, 12vw, 60px); background: black; color: white; display: flex; align-items: center; justify-content: center; font-size: clamp(16px, 5vw, 20px); font-family: monospace; font-weight: bold; border-radius: 6px; box-shadow: 0 4px 8px rgba(0,0,0,0.2); position: relative;">
              05
              <div style="position: absolute; left: 0; right: 0; height: 1px; background: #374151; top: 50%;"></div>
            </div>
            <span style="font-size: clamp(9px, 2.5vw, 11px); margin-top: 6px; color: #6b7280; font-weight: 600; text-transform: uppercase; display: block;">Days</span>
          </div>
          <div style="text-align: center;">
            <div style="width: clamp(40px, 10vw, 50px); height: clamp(48px, 12vw, 60px); background: black; color: white; display: flex; align-items: center; justify-content: center; font-size: clamp(16px, 5vw, 20px); font-family: monospace; font-weight: bold; border-radius: 6px; box-shadow: 0 4px 8px rgba(0,0,0,0.2); position: relative;">
              12
              <div style="position: absolute; left: 0; right: 0; height: 1px; background: #374151; top: 50%;"></div>
            </div>
            <span style="font-size: clamp(9px, 2.5vw, 11px); margin-top: 6px; color: #6b7280; font-weight: 600; text-transform: uppercase; display: block;">Hours</span>
          </div>
          <div style="text-align: center;">
            <div style="width: clamp(40px, 10vw, 50px); height: clamp(48px, 12vw, 60px); background: black; color: white; display: flex; align-items: center; justify-content: center; font-size: clamp(16px, 5vw, 20px); font-family: monospace; font-weight: bold; border-radius: 6px; box-shadow: 0 4px 8px rgba(0,0,0,0.2); position: relative;">
              30
              <div style="position: absolute; left: 0; right: 0; height: 1px; background: #374151; top: 50%;"></div>
            </div>
            <span style="font-size: clamp(9px, 2.5vw, 11px); margin-top: 6px; color: #6b7280; font-weight: 600; text-transform: uppercase; display: block;">Min</span>
          </div>
          <div style="text-align: center;">
            <div style="width: clamp(40px, 10vw, 50px); height: clamp(48px, 12vw, 60px); background: black; color: white; display: flex; align-items: center; justify-content: center; font-size: clamp(16px, 5vw, 20px); font-family: monospace; font-weight: bold; border-radius: 6px; box-shadow: 0 4px 8px rgba(0,0,0,0.2); position: relative;">
              45
              <div style="position: absolute; left: 0; right: 0; height: 1px; background: #374151; top: 50%;"></div>
            </div>
            <span style="font-size: clamp(9px, 2.5vw, 11px); margin-top: 6px; color: #6b7280; font-weight: 600; text-transform: uppercase; display: block;">Sec</span>
          </div>
        </div>
      </div>`,
    jsxCode: `(props) => {
      const [targetDate, setTargetDate] = React.useState("2024-12-31T23:59:59");
      const [description, setDescription] = React.useState("Until the New Year");

      const calculateTimeLeft = () => {
        let difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          };
        }

        return timeLeft;
      };

      const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());
      const [prevTime, setPrevTime] = React.useState(calculateTimeLeft());

      React.useEffect(() => {
        const timer = setTimeout(() => {
          setPrevTime(timeLeft);
          setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
      });

      const FlipCard = ({ current, previous, label }) => {
        const hasChanged = current !== previous;
        
        return (
          <div className="relative">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className={\`w-12 h-16 sm:w-16 sm:h-20 bg-black text-white flex items-center justify-center text-lg sm:text-2xl font-mono font-bold rounded-lg shadow-lg \${hasChanged ? 'animate-pulse' : ''}\`}>
                  {String(current).padStart(2, '0')}
                </div>
                <div className="absolute inset-x-0 h-0.5 bg-gray-700 top-1/2 transform -translate-y-0.5"></div>
              </div>
              <span className="text-xs mt-2 text-gray-600 font-semibold uppercase tracking-wider">{label}</span>
            </div>
          </div>
        );
      };

      const hasTimeLeft = Object.keys(timeLeft).length > 0 && Object.values(timeLeft).some(val => val > 0);

      return (
        <div className="p-4 sm:p-8 w-full max-w-2xl mx-auto bg-gray-100 rounded-2xl shadow-xl">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Countdown Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 sm:p-3 border rounded-lg mb-3 text-center text-sm sm:text-lg"
            />
            <input
              type="datetime-local"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full p-2 sm:p-3 border rounded-lg text-center text-sm sm:text-base"
            />
          </div>
          
          <h2 className="text-xl sm:text-2xl font-light text-center mb-8 text-gray-700">{description}</h2>
          
          {hasTimeLeft ? (
            <div className="flex justify-center items-center flex-col">
              <div className="flex items-center gap-2 sm:gap-4">
                <FlipCard 
                  current={timeLeft.days} 
                  previous={prevTime.days} 
                  label="Days" 
                />
                <FlipCard 
                  current={timeLeft.hours || 0} 
                  previous={prevTime.hours || 0} 
                  label="Hours" 
                />
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <FlipCard 
                  current={timeLeft.minutes || 0} 
                  previous={prevTime.minutes || 0} 
                  label="Minutes" 
                />
                <FlipCard 
                  current={timeLeft.seconds || 0} 
                  previous={prevTime.seconds || 0} 
                  label="Seconds" 
                />
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-4xl sm:text-6xl mb-4">🎊</div>
              <div className="text-2xl sm:text-3xl font-light text-gray-700">The moment has arrived!</div>
            </div>
          )}
        </div>
      );
    }`
  }
];