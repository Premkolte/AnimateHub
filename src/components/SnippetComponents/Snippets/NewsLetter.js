// ./Snippets/Newsletter.js

export const newsletterSnippets = [
    {
      title: "Basic Newsletter Form",
      jsxCode: `(props) => {
        function handleSubscribe(event) {
          event.preventDefault();
          const email = document.getElementById('email').value;
          // Handle subscription logic here
          console.log('Subscribed with email:', email);
        }
        
        return (
          <form>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <button type="submit" onClick={handleSubscribe}>Subscribe</button>
          </form>
        );
      }`,
    },
    {
      title: "Styled Newsletter Form",
      jsxCode: `(props) => {
        function handleSubscribe(event) {
          event.preventDefault();
          const email = document.getElementById('email').value;
          // Handle subscription logic here
          console.log('Subscribed with email:', email);
        }
        
        return (
          <form style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <label htmlFor="email">Your Email:</label>
            <input type="email" id="email" name="email" style={{ padding: '8px', margin: '5px 0', width: '100%' }} required />
            <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px', border: 'none', cursor: 'pointer', borderRadius: '5px' }} onClick={handleSubscribe}>Subscribe</button>
          </form>
        );
      }`,
    },
  ];
  