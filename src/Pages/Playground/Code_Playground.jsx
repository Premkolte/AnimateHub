import { useState, useEffect } from "react";

export default function Playground() {
  const [html, setHtml] = useState("<h1>Welcome to AnimateHub</h1>");
  const [css, setCss] = useState("h1 { color: Blue; text-align: center; }");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>${html}</body>
        </html>
      `);
    }, 300);

    return () => clearTimeout(timeout);
  }, [html, css]);

  return (
    <div className="h-screen flex flex-col bg-blue-200 text-white dark:bg-gray-900">
      <header className="py-6 px-4 text-center font-bold text-2xl bg-white text-black dark:bg-gray-800 dark:text-white shadow-md">
        🌐 React HTML & CSS Playground
      </header>

     <div className="flex flex-1 p-3 gap-3 bg-blue-200 dark:bg-gray-900">
  {/* HTML Editor */}
  <div className="flex flex-col w-1/2">
    <h2 className="mb-2 font-semibold text-lg text-black dark:text-white">HTML</h2>
    <textarea
      value={html}
      onChange={(e) => setHtml(e.target.value)}
      className="flex-1 p-3 rounded-lg bg-gray-800 text-green-300 font-mono text-sm resize-none"
      placeholder="Write HTML here..."
    />
  </div>

  {/* CSS Editor */}
  <div className="flex flex-col w-1/2">
    <h2 className="mb-2 font-semibold text-lg text-black dark:text-white">CSS</h2>
    <textarea
      value={css}
      onChange={(e) => setCss(e.target.value)}
      className="flex-1 p-3 rounded-lg bg-gray-800 text-blue-300 font-mono text-sm resize-none"
      placeholder="Write CSS here..."
    />
  </div>
</div>


      <div className="flex-1 bg-white rounded-lg m-3 shadow-lg overflow-hidden">
        <iframe
          srcDoc={srcDoc}
          sandbox="allow-scripts"
          title="output"
          className="w-full h-full"
        />
      </div>

      <footer className="p-2 text-center text-xs bg-gray-800">
        Built with ❤️ in React
      </footer>
    </div>
  );
}
