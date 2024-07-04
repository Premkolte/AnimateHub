// Snippets/FooterSnippets.js
export const footerSnippets = [
    {
      title: "Simple Footer Snippet",
      jsxCode: `(props) => (
        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </div>
        </footer>
      )`,
      cssCode: `<footer style="background-color: #333; color: #fff; padding: 20px 0; text-align: center;">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>`,
    },
    {
      title: "Footer with Links Snippet",
      jsxCode: `(props) => (
        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
            <ul className="flex justify-center space-x-4 mt-4">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
        </footer>
      )`,
      cssCode: `<footer style="background-color: #333; color: #fff; padding: 20px 0; text-align: center;">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
        <ul style="list-style: none; padding: 0; display: flex; justify-content: center; margin-top: 10px;">
          <li style="margin: 0 10px;"><a href="#" style="color: #fff; text-decoration: none;">Home</a></li>
          <li style="margin: 0 10px;"><a href="#" style="color: #fff; text-decoration: none;">About</a></li>
          <li style="margin: 0 10px;"><a href="#" style="color: #fff; text-decoration: none;">Contact</a></li>
        </ul>
      </footer>`,
    },
  ];
  