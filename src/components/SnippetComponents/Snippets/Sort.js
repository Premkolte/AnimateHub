export const sortSnippets = [
    {
      title: "Sort Words Alphabetically",
      jsxCode: `(props) => {
        const [words, setWords] = React.useState(["banana", "apple", "cherry", "date"]);
  
        const sortWords = () => {
          const sortedWords = [...words].sort();
          setWords(sortedWords);
        };
  
        return (
          <div>
            <ul>
              {words.map((word, index) => (
                <li key={index}>{word}</li>
              ))}
            </ul>
            <button
              style={{
                backgroundColor: "#4a90e2",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                marginTop: "10px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "background-color 0.3s, transform 0.3s",
              }}
              onClick={sortWords}
            >
              Sort Alphabetically
            </button>
          </div>
        );
      }`,
    },
  ];
  