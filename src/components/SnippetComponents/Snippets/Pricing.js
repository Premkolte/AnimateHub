// Snippets/Pricing.js

export const pricingSnippets = [
    {
      title: 'Basic Plan',
      jsxCode: `(props) => (
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Basic Plan</h3>
          <p className="text-gray-600 mb-2">Includes basic features</p>
          <p className="text-green-500 font-bold">$9.99/month</p>
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg mt-2">Subscribe</button>
        </div>
      )`,
      cssCode: `<div style="padding: 1rem; background-color: #f0f0f0; border-radius: 10px;">
        <h3 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.5rem;">Basic Plan</h3>
        <p style="color: #666; margin-bottom: 0.5rem;">Includes basic features</p>
        <p style="color: #28a745; font-weight: bold;">$9.99/month</p>
        <button style="background-color: #28a745; color: white; padding: 0.5rem 1rem; border: none; border-radius: 5px; margin-top: 0.5rem;">Subscribe</button>
      </div>`
    },
    {
      title: 'Pro Plan',
      jsxCode: `(props) => (
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Pro Plan</h3>
          <p className="text-gray-600 mb-2">Includes advanced features</p>
          <p className="text-blue-500 font-bold">$19.99/month</p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2">Subscribe</button>
        </div>
      )`,
      cssCode: `<div style="padding: 1rem; background-color: #f0f0f0; border-radius: 10px;">
        <h3 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.5rem;">Pro Plan</h3>
        <p style="color: #666; margin-bottom: 0.5rem;">Includes advanced features</p>
        <p style="color: #007bff; font-weight: bold;">$19.99/month</p>
        <button style="background-color: #007bff; color: white; padding: 0.5rem 1rem; border: none; border-radius: 5px; margin-top: 0.5rem;">Subscribe</button>
      </div>`
    },
    // Add more snippets as needed
  ];
  