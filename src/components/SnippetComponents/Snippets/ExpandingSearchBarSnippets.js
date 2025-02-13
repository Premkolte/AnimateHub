export const ExpandingSearchBarSnippets = [
    {
      title: "Expanding Search Bar",
      jsxCode: `<div class="search-container">
          <input type="text" class="search-input" placeholder="Search..." />
          <button class="search-button">
            <span>&#128269;</span>
          </button>
        </div>`,
      cssCode: `<style>
        .search-container {
          display: flex;
          align-items: center;
          border: 2px solid #6200ea;
          border-radius: 25px;
          padding: 5px;
          width: 40px;
          transition: width 0.3s ease-in-out;
          overflow: hidden;
        }
  
        .search-input {
          flex-grow: 1;
          border: none;
          outline: none;
          padding: 5px;
          font-size: 16px;
          transition: width 0.3s ease-in-out;
          width: 0px;
        }
  
        .search-button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 20px;
        }
  
        .search-container:focus-within {
          width: 200px;
        }
  
        .search-container:focus-within .search-input {
          width: 150px;
        }
      </style>`,
    },
  ];
  