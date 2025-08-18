// Assuming this is in a file named `formSnippets.js` or similar
export const formSnippets = [
    {
      label: "Checkout Form",
      tags: ['form', 'input', 'checkout', 'payment', 'button'],
      heading: "Contact Form",
      cssCode: `
        <form style="background-color: #f7f7f7; padding: 20px; border-radius: 5px;">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" style="width: 100%; padding: 10px; margin: 10px 0;"/>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" style="width: 100%; padding: 10px; margin: 10px 0;"/>
          <label for="address">Address:</label>
          <input type="text" id="address" name="address" style="width: 100%; padding: 10px; margin: 10px 0;"/>
          <label for="card">Card Details:</label>
          <input type="text" id="card" name="card" style="width: 100%; padding: 10px; margin: 10px 0;"/>
          <button type="submit" style="background-color: #4CAF50; color: white; padding: 10px; border: none; border-radius: 5px;">Proceed to Checkout</button>
        </form>`,
      jsxCode: `
        <>
          <form className="bg-[#f7f7f7] p-5 rounded">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" className="w-full p-2 my-2" />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" className="w-full p-2 my-2" />
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" name="address" className="w-full p-2 my-2" />
            <label htmlFor="card">Card Details:</label>
            <input type="text" id="card" name="card" className="w-full p-2 my-2" />
            <button type="submit" className="bg-[#4CAF50] text-white p-2 rounded">Proceed to Checkout</button>
          </form>
        </>`,
    },
    {
      label: "Contact Form",
      tags: ['form', 'input', 'contact', 'message', 'button'],
      cssCode: `
        <form style="background-color: #f7f7f7; padding: 20px; border-radius: 5px;">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" style="width: 100%; padding: 10px; margin: 10px 0;"/>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" style="width: 100%; padding: 10px; margin: 10px 0;"/>
          <label for="message">Message:</label>
          <textarea id="message" name="message" style="width: 100%; padding: 10px; margin: 10px 0;"></textarea>
          <button type="submit" style="background-color: #4CAF50; color: white; padding: 10px; border: none; border-radius: 5px;">Send</button>
        </form>`,
      jsxCode: `
        <>
          <form className="bg-[#f7f7f7] p-5 rounded">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" className="w-full p-2 my-2" />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" className="w-full p-2 my-2" />
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" className="w-full p-2 my-2"></textarea>
            <button type="submit" className="bg-[#4CAF50] text-white p-2 rounded">Send</button>
          </form>
        </>`,
    },
  ];