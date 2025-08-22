// Assuming this is in a file named `formSnippets.js` or similar
export const formSnippets = [
  {
    label: "Checkout Form",
    tags: ['form', 'input', 'checkout', 'payment', 'button'],
    heading: "Checkout Form",
    theme: "light",
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
        <form className="bg-[#f7f7f7] dark:bg-[#222] p-5 rounded text-black dark:text-white">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" className="w-full p-2 my-2 bg-white dark:bg-[#333] text-black dark:text-white" />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" className="w-full p-2 my-2 bg-white dark:bg-[#333] text-black dark:text-white" />
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" className="w-full p-2 my-2 bg-white dark:bg-[#333] text-black dark:text-white" />
          <label htmlFor="card">Card Details:</label>
          <input type="text" id="card" name="card" className="w-full p-2 my-2 bg-white dark:bg-[#333] text-black dark:text-white" />
          <button type="submit" className="bg-[#4CAF50] dark:bg-[#388e3c] text-white p-2 rounded">Proceed to Checkout</button>
        </form>
      </>`,
  },
  {
    label: "Contact Form",
    tags: ['form', 'input', 'contact', 'message', 'button'],
    heading: "Contact Form",
    theme: "light",
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
        <form className="bg-[#f7f7f7] dark:bg-[#222] p-5 rounded text-black dark:text-white">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" className="w-full p-2 my-2 bg-white dark:bg-[#333] text-black dark:text-white" />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" className="w-full p-2 my-2 bg-white dark:bg-[#333] text-black dark:text-white" />
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" className="w-full p-2 my-2 bg-white dark:bg-[#333] text-black dark:text-white"></textarea>
          <button type="submit" className="bg-[#4CAF50] dark:bg-[#388e3c] text-white p-2 rounded">Send</button>
        </form>
      </>`,
  },
  {
    label: "Newsletter Signup",
    tags: ['form', 'input', 'newsletter', 'email', 'button'],
    heading: "Newsletter Signup",
    theme: "light",
    cssCode: `
      <form style="background-color: #f7f7f7; padding: 20px; border-radius: 5px;">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" style="width: 100%; padding: 10px; margin: 10px 0;"/>
        <button type="submit" style="background-color: #4CAF50; color: white; padding: 10px; border: none; border-radius: 5px;">Subscribe</button>
      </form>`,
    jsxCode: `
      <>
        <form className="bg-[#f7f7f7] dark:bg-[#222] p-5 rounded text-black dark:text-white">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" className="w-full p-2 my-2 bg-white dark:bg-[#333] text-black dark:text-white" />
          <button type="submit" className="bg-[#4CAF50] dark:bg-[#388e3c] text-white p-2 rounded">Subscribe</button>
        </form>
      </>`,
  },
  {
    label: "Feedback Form",
    tags: ['form', 'input', 'feedback', 'rating', 'button'],
    heading: "Feedback Form",
    theme: "light",
    cssCode: `
      <form style="background-color: #f7f7f7; padding: 20px; border-radius: 5px;">
        <label for="feedback">Your Feedback:</label>
        <textarea id="feedback" name="feedback" style="width: 100%; padding: 10px; margin: 10px 0;"></textarea>
        <label for="rating">Rating:</label>
        <select id="rating" name="rating" style="width: 100%; padding: 10px; margin: 10px 0;">
          <option value="5">Excellent</option>
          <option value="4">Good</option>
          <option value="3">Average</option>
          <option value="2">Poor</option>
          <option value="1">Terrible</option>
        </select>
        <button type="submit" style="background-color: #4CAF50; color: white; padding: 10px; border: none; border-radius: 5px;">Submit Feedback</button>
      </form>`,
    jsxCode: `
      <>
        <form className="bg-[#f7f7f7] dark:bg-[#222] p-5 rounded text-black dark:text-white">
          <label htmlFor="feedback">Your Feedback:</label>
          <textarea id="feedback" name="feedback" className="w-full p-2 my-2 bg-white dark:bg-[#333] text-black dark:text-white"></textarea>
          <label htmlFor="rating">Rating:</label>
          <select id="rating" name="rating" className="w-full p-2 my-2 bg-white dark:bg-[#333] text-black dark:text-white">
            <option value="5">Excellent</option>
            <option value="4">Good</option>
            <option value="3">Average</option>
            <option value="2">Poor</option>
            <option value="1">Terrible</option>
          </select>
          <button type="submit" className="bg-[#4CAF50] dark:bg-[#388e3c] text-white p-2 rounded">Submit Feedback</button>
        </form>
      </>`,
  },
  {
    label: "Survey Form",
    tags: ['form', 'input', 'survey', 'question', 'button'],
    heading: "Survey Form",
    theme: "light",
    cssCode: `
      <form style="background-color: #f7f7f7; padding: 20px; border-radius: 5px;">
        <label for="age">Age:</label>
        <input type="number" id="age" name="age" style="width: 100%; padding: 10px; margin: 10px 0;"/>
        <label for="gender">Gender:</label>
        <select id="gender" name="gender" style="width: 100%; padding: 10px; margin: 10px 0;">
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <label for="opinion">Your Opinion:</label>
        <textarea id="opinion" name="opinion" style="width: 100%; padding: 10px; margin: 10px 0;"></textarea>
        <button type="submit" style="background-color: #4CAF50; color: white; padding: 10px; border: none; border-radius: 5px;">Submit Survey</button>
      </form>`,
    jsxCode: `
      <>
        <form className="bg-[#f7f7f7] dark:bg-[#222] p-5 rounded text-black dark:text-white">
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="age" className="w-full p-2 my-2 bg-white dark:bg-[#333] text-black dark:text-white" />
          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender" className="w-full p-2 my-2 bg-white dark:bg-[#333] text-black dark:text-white">
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <label htmlFor="opinion">Your Opinion:</label>
          <textarea id="opinion" name="opinion" className="w-full p-2 my-2 bg-white dark:bg-[#333] text-black dark:text-white"></textarea>
          <button type="submit" className="bg-[#4CAF50] dark:bg-[#388e3c] text-white p-2 rounded">Submit Survey</button>
        </form>
      </>`,
  },
  {
    label: "Appointment Booking",
    tags: ['form', 'input', 'appointment', 'date', 'time', 'button'],
    heading: "Appointment Booking",
    theme: "light",
    cssCode: `
      <form style="background-color: #f7f7f7; padding: 20px; border-radius: 5px;">
        <label for="fullname">Full Name:</label>
        <input type="text" id="fullname" name="fullname" style="width: 100%; padding: 10px; margin: 10px 0;" />
        <label for="date">Date:</label>
        <input type="date" id="date" name="date" style="width: 100%; padding: 10px; margin: 10px 0;" />
        <label for="time">Time:</label>
        <input type="time" id="time" name="time" style="width: 100%; padding: 10px; margin: 10px 0;" />
        <button type="submit" style="background-color: #4CAF50; color: white; padding: 10px; border: none; border-radius: 5px;">Book Appointment</button>
      </form>`,
    jsxCode: `
      <>
        <form className="bg-[#f7f7f7] dark:bg-[#222] p-5 rounded text-black dark:text-white">
          <label htmlFor="fullname">Full Name:</label>
          <input type="text" id="fullname" name="fullname" className="w-full p-2 my-2 bg-white dark:bg-[#333] text-black dark:text-white" />
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" className="w-full p-2 my-2 bg-white dark:bg-[#333] text-black dark:text-white" />
          <label htmlFor="time">Time:</label>
          <input type="time" id="time" name="time" className="w-full p-2 my-2 bg-white dark:bg-[#333] text-black dark:text-white" />
          <button type="submit" className="bg-[#4CAF50] dark:bg-[#388e3c] text-white p-2 rounded">Book Appointment</button>
        </form>
      </>`,
  },
];