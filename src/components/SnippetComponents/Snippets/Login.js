// Snippets/Logins.js

export const loginSnippets = [
    {
      title: 'Simple Login Form',
      tags: ['login', 'form', 'input', 'authentication', 'basic'],
      jsxCode: `(props) => (
        <form className="flex flex-col space-y-4">
          <input type="text" placeholder="Username" className="border p-2 rounded-lg" />
          <input type="password" placeholder="Password" className="border p-2 rounded-lg" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">Login</button>
        </form>
      )`,
      cssCode: `<form style="display: flex; flex-direction: column; gap: 1rem;">
        <input type="text" placeholder="Username" style="border: 1px solid #ccc; padding: 0.5rem; border-radius: 5px;" />
        <input type="password" placeholder="Password" style="border: 1px solid #ccc; padding: 0.5rem; border-radius: 5px;" />
        <button type="submit" style="background-color: #007bff; color: white; padding: 0.5rem; border: none; border-radius: 5px;">Login</button>
      </form>`
    },
    {
      title: 'Customized Login Form',
      tags: ['login', 'form', 'input', 'authentication', 'checkbox'],
      jsxCode: `(props) => (
        <form className="flex flex-col space-y-4">
          <input type="text" placeholder="Email" className="border p-2 rounded-lg" />
          <input type="password" placeholder="Password" className="border p-2 rounded-lg" />
          <div className="flex items-center space-x-4">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="bg-green-500 text-white p-2 rounded-lg">Sign In</button>
        </form>
      )`,
      cssCode: `<form style="display: flex; flex-direction: column; gap: 1rem;">
        <input type="text" placeholder="Email" style="border: 1px solid #ccc; padding: 0.5rem; border-radius: 5px;" />
        <input type="password" placeholder="Password" style="border: 1px solid #ccc; padding: 0.5rem; border-radius: 5px;" />
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <input type="checkbox" id="remember-me" />
          <label for="remember-me">Remember me</label>
        </div>
        <button type="submit" style="background-color: #28a745; color: white; padding: 0.5rem; border: none; border-radius: 5px;">Sign In</button>
      </form>`
    }
  ];