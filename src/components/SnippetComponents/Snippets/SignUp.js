// Snippets/Signup.js

export const signupSnippets = [
    {
      title: 'Simple Signup Form',
      jsxCode: `(props) => (
        <form className="flex flex-col space-y-4">
          <input type="text" placeholder="Name" className="border p-2 rounded-lg" />
          <input type="email" placeholder="Email" className="border p-2 rounded-lg" />
          <input type="password" placeholder="Password" className="border p-2 rounded-lg" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">Sign Up</button>
        </form>
      )`,
      cssCode: `<form style="display: flex; flex-direction: column; gap: 1rem;">
        <input type="text" placeholder="Name" style="border: 1px solid #ccc; padding: 0.5rem; border-radius: 5px;" />
        <input type="email" placeholder="Email" style="border: 1px solid #ccc; padding: 0.5rem; border-radius: 5px;" />
        <input type="password" placeholder="Password" style="border: 1px solid #ccc; padding: 0.5rem; border-radius: 5px;" />
        <button type="submit" style="background-color: #007bff; color: white; padding: 0.5rem; border: none; border-radius: 5px;">Sign Up</button>
      </form>`
    },
    {
      title: 'Customized Signup Form',
      jsxCode: `(props) => (
        <form className="flex flex-col space-y-4">
          <input type="text" placeholder="Full Name" className="border p-2 rounded-lg" />
          <input type="email" placeholder="Email Address" className="border p-2 rounded-lg" />
          <input type="password" placeholder="Create Password" className="border p-2 rounded-lg" />
          <div className="flex items-center space-x-4">
            <input type="checkbox" id="terms-agree" />
            <label htmlFor="terms-agree">I agree to the terms and conditions</label>
          </div>
          <button type="submit" className="bg-green-500 text-white p-2 rounded-lg">Join Now</button>
        </form>
      )`,
      cssCode: `<form style="display: flex; flex-direction: column; gap: 1rem;">
        <input type="text" placeholder="Full Name" style="border: 1px solid #ccc; padding: 0.5rem; border-radius: 5px;" />
        <input type="email" placeholder="Email Address" style="border: 1px solid #ccc; padding: 0.5rem; border-radius: 5px;" />
        <input type="password" placeholder="Create Password" style="border: 1px solid #ccc; padding: 0.5rem; border-radius: 5px;" />
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <input type="checkbox" id="terms-agree" />
          <label for="terms-agree">I agree to the terms and conditions</label>
        </div>
        <button type="submit" style="background-color: #28a745; color: white; padding: 0.5rem; border: none; border-radius: 5px;">Join Now</button>
      </form>`
    }
  ];
  