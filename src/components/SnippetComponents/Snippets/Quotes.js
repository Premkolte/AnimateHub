export const quoteSlideshowSnippets = [
    {
      title: "Simple Quote Slideshow with Navigation",
      jsxCode: `(props) => {
        const quotes = [
          "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
          "The way to get started is to quit talking and begin doing. - Walt Disney",
          "Your time is limited, so don't waste it living someone else's life. - Steve Jobs",
          "If life were predictable it would cease to be life, and be without flavor. - Eleanor Roosevelt"
        ];
        
        const [currentIndex, setCurrentIndex] = React.useState(0);
  
        const prevQuote = () => {
          setCurrentIndex((prevIndex) => (prevIndex === 0 ? quotes.length - 1 : prevIndex - 1));
        };
  
        const nextQuote = () => {
          setCurrentIndex((prevIndex) => (prevIndex === quotes.length - 1 ? 0 : prevIndex + 1));
        };
  
        return (
          <div className="quote-slideshow">
            <blockquote className="quote">{quotes[currentIndex]}</blockquote>
            <div className="navigation">
              <button className="nav-button next  py-2 px-4 rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-purple-600" onClick={nextQuote}>Next</button>
            </div>
          </div>
        );
      }`,
      cssCode: `.quote-slideshow {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 250px;
        background-color: #f0f0f0;
        border-radius: 10px;
        padding: 20px;
        position: relative;
      }
  
      .quote {
        font-size: 1.5em;
        font-style: italic;
        text-align: center;
        color: #333;
        margin-bottom: 20px;
      }
  
      .navigation {
        display: flex;
        gap: 10px;
      }
  
      .nav-button {
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
        font-size: 1em;
      }
  
      .nav-button.prev {
        background-color: #2196F3;
      }
  
      .nav-button.next {
        background-color: #FF5722;
      }
  
      .nav-button:hover {
        opacity: 0.8;
      }`
    },
    {
      title: "Fading Quote Slideshow with Navigation",
      jsxCode: `(props) => {
        const quotes = [
          "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
          "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
          "Keep your face always toward the sunshine—and shadows will fall behind you. - Walt Whitman",
          "The best way to predict the future is to create it. - Peter Drucker"
        ];
        
        const [currentIndex, setCurrentIndex] = React.useState(0);
  
        const prevQuote = () => {
          setCurrentIndex((prevIndex) => (prevIndex === 0 ? quotes.length - 1 : prevIndex - 1));
        };
  
        const nextQuote = () => {
          setCurrentIndex((prevIndex) => (prevIndex === quotes.length - 1 ? 0 : prevIndex + 1));
        };
  
        React.useEffect(() => {
          const interval = setInterval(() => {
            nextQuote();
          }, 3000);
  
          return () => clearInterval(interval);
        }, []);
  
        return (
          <div className="quote-slideshow">
            <blockquote className="quote fade">{quotes[currentIndex]}</blockquote>
            <div className="navigation">
              <button className="nav-button next  py-2 px-4 rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-purple-600" onClick={nextQuote}>Next</button>
            </div>
          </div>
        );
      }`,
      cssCode: `.quote-slideshow {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 250px;
        background-color: #f0f0f0;
        border-radius: 10px;
        padding: 20px;
        position: relative;
      }
  
      .quote {
        font-size: 1.5em;
        font-style: italic;
        text-align: center;
        color: #333;
        opacity: 0;
        position: absolute;
        transition: opacity 1s ease-in-out;
      }
  
      .quote.fade {
        opacity: 1;
      }
  
      .navigation {
        display: flex;
        gap: 10px;
        margin-top: 20px;
      }
  
      .nav-button {
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
        font-size: 1em;
      }
  
      .nav-button.prev {
        background-color: #2196F3;
      }
  
      .nav-button.next {
        background-color: #FF5722;
      }
  
      .nav-button:hover {
        opacity: 0.8;
      }`
    }
  ];
  