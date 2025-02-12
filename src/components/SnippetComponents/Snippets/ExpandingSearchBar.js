// Snippets/ExpandingSearchBar.js

export const expandingSearchBarSnippet = [
    {
      title: "Expanding Search Bar",
      jsxCode: `(props) => (
        <input type="text" className="expanding-search" placeholder="Search..." />
      )`,
      cssCode: `<style>
        .expanding-search {
          width: 50px;
          padding: 10px;
          transition: width 0.3s ease-in-out;
        }
        .expanding-search:focus {
          width: 200px;
        }
      </style>`,
    },
  ];
  