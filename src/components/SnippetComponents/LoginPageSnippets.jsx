import { useRef } from "react";
import FavoriteButton from "../Favorites/FavoriteButton";

export default function LoginPageSnippets() {
  const formRef = useRef(null);
  const loginRef = useRef(null);

  const formSnippets = [
    {
      label: 'Login Form 1',
      jsxCode: '<div>...</div>',
      cssCode: 'div { ... }',
      index: 1,
    },
    {
      label: 'Login Form 2',
      jsxCode: '<form>...</form>',
      cssCode: 'form { ... }',
      index: 2,
    }
  ];

  return (
    <div
      ref={formRef}
      className="relative w-full max-w-md mx-auto mt-20 bg-white rounded shadow-lg overflow-hidden transition-all duration-300"
    >
      {/* Login Panel */}
      <div ref={loginRef} className="p-8">
        <h1 className="text-xl font-bold text-blue-500 mb-6">Account Login</h1>
        
        {/* Always render FavoriteButton in the snippet list */}
        {formSnippets.map((snippet, index) => (
  <div
    key={index}
    className="mb-4 flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200"
    style={{ minHeight: 48 }}
  >
    <span className="font-medium">{snippet.label}</span>
    <FavoriteButton
      snippet={{
        type: 'loginpage',
        index: index,
        title: snippet.label,
        jsxCode: snippet.jsxCode,
        cssCode: snippet.cssCode,
      }}
      size="md"
    />
  </div>
))}

        <form>
          <div className="mb-4">
            <label
              htmlFor="login-username"
              className="text-xs font-semibold uppercase block mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="login-username"
              className="w-full p-3 rounded bg-gray-100 outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="login-password"
              className="text-xs font-semibold uppercase block mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="login-password"
              className="w-full p-3 rounded bg-gray-100 outline-none"
              required
            />
          </div>
          <div className="flex items-center justify-between text-sm mb-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-blue-500" />
              <span>Remember Me</span>
            </label>
            <a href="#" className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded"
          >
            Log In
          </button>
        </form>
      </div>

      {/* Side Lines */}
      <span className="absolute top-16 left-[6%] w-[2px] h-8 bg-white/30"></span>
      <span className="absolute top-16 left-[10%] w-[2px] h-8 bg-white/30"></span>
    </div>
  );
}