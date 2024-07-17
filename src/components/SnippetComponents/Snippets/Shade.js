export const shapedSnippets = [
    {
      title: "Circle Shape",
      jsxCode: `(props) => (
        <div style={{ 
          width: '100px', 
          height: '100px', 
          backgroundColor: '#3498db', 
          borderRadius: '50%' 
        }}></div>
      )`,
      cssCode: `div {
        width: 100px;
        height: 100px;
        background-color: #3498db;
        border-radius: 50%;
      }`
    },
    {
      title: "Square Shape",
      jsxCode: `(props) => (
        <div style={{ 
          width: '100px', 
          height: '100px', 
          backgroundColor: '#e74c3c' 
        }}></div>
      )`,
      cssCode: `div {
        width: 100px;
        height: 100px;
        background-color: #e74c3c;
      }`
    },
    {
      title: "Triangle Shape",
      jsxCode: `(props) => (
        <div style={{ 
          width: '0', 
          height: '0', 
          borderLeft: '50px solid transparent', 
          borderRight: '50px solid transparent', 
          borderBottom: '100px solid #2ecc71' 
        }}></div>
      )`,
      cssCode: `div {
        width: 0;
        height: 0;
        border-left: 50px solid transparent;
        border-right: 50px solid transparent;
        border-bottom: 100px solid #2ecc71;
      }`
    },
    {
      title: "Oval Shape",
      jsxCode: `(props) => (
        <div style={{ 
          width: '150px', 
          height: '100px', 
          backgroundColor: '#f1c40f', 
          borderRadius: '50%' 
        }}></div>
      )`,
      cssCode: `div {
        width: 150px;
        height: 100px;
        background-color: #f1c40f;
        border-radius: 50%;
      }`
    }
  ];
  