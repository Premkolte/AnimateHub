export const countdownTimeSnippets = [
    {
      title: "Countdown Timer",
      tags: ['countdown', 'timer', 'time', 'date', 'javascript'],
      jsxCode: `(props) => {
        const calculateTimeLeft = () => {
          let difference = +new Date("2024-12-31") - +new Date();
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
            <span key={interval}>
              {timeLeft[interval]} {interval}{" "}
            </span>
          );
        });
    
        return (
          <div>
            <h1>Countdown to 2024</h1>
            <div>
              {timerComponents.length ? timerComponents : <span>Time's up!</span>}
            </div>
          </div>
        );
      }`
    }
  ];