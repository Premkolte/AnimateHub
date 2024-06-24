// Assuming this is in a file named `socialMediaSnippets.js` or similar
export const socialMediaSnippets = [
    {
      label: "Facebook Button",
      cssCode: `
        <button style="background-color: #3b5998; color: white; padding: 10px; border-radius: 5px;">
          <i class="fab fa-facebook-f"></i>
        </button>`,
      jsxCode: `
        <>
          <button className="bg-[#3b5998] text-white py-2 px-4 rounded">
            <i className="fab fa-facebook-f"></i>
          </button>
        </>`,
    },
    {
      label: "X Button",
      cssCode: `
        <button style="background-color: #1DA1F2; color: white; padding: 10px; border-radius: 5px;">
          <i class="fab fa-x-twitter"></i>
        </button>`,
      jsxCode: `
        <>
          <button className="bg-[#121212] text-white py-2 px-4 rounded">
            <i className="fab fa-x-twitter"></i>
          </button>
        </>`,
    },
    {
      label: "Instagram Button",
      cssCode: `
        <button style="background: linear-gradient(45deg, #833ab4, #fd1d1d, #fcb045); color: white; padding: 10px; border-radius: 5px;">
          <i class="fab fa-instagram"></i>
        </button>`,
      jsxCode: `
        <>
          <button className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white py-2 px-4 rounded">
            <i className="fab fa-instagram"></i>
          </button>
        </>`,
    },
    {
      label: "LinkedIn Button",
      cssCode: `
        <button style="background-color: #0e76a8; color: white; padding: 10px; border-radius: 5px;">
          <i class="fab fa-linkedin-in"></i>
        </button>`,
      jsxCode: `
        <>
          <button className="bg-[#0e76a8] text-white py-2 px-4 rounded">
            <i className="fab fa-linkedin-in"></i>
          </button>
        </>`,
    },
  ];
  