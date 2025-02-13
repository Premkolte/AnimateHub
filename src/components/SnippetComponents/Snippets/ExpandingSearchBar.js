export const ExpandingSearchBarSnippets = [
  {
    title: "Expanding Search Bar",
    jsxCode: `(props) => {
      const [isExpanded, setIsExpanded] = React.useState(false);

      return (
        <div className="relative flex items-center">
          <input
            type="text"
            className="expanding-input"
            placeholder="Search..."
            onFocus={() => setIsExpanded(true)}
            onBlur={() => setIsExpanded(false)}
            style={{ width: isExpanded ? "200px" : "100px" }}
          />
        </div>
      );
    }`,
    cssCode: `<style>
      .expanding-input {
        transition: width 0.3s ease-in-out;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 8px;
        outline: none;
        font-size: 16px;
      }
    </style>`,
  },
];
