// Snippets/PaymentForm.js

export const paymentFormSnippets = [
    {
      label: "Basic Payment Form",
      cssCode: `
        <form style="display: flex; flex-direction: column;">
          <label for="cardNumber">Card Number:</label>
          <input type="text" id="cardNumber" name="cardNumber" style="padding: 8px; margin-bottom: 8px;">
          <label for="expiryDate">Expiry Date:</label>
          <input type="text" id="expiryDate" name="expiryDate" style="padding: 8px; margin-bottom: 8px;">
          <label for="cvv">CVV:</label>
          <input type="text" id="cvv" name="cvv" style="padding: 8px; margin-bottom: 8px;">
          <button type="submit" style="padding: 8px 16px; background-color: #007bff; color: white; border: none; cursor: pointer;">Submit</button>
        </form>
      `,
      jsxCode: `
        <form className="flex flex-col">
          <label htmlFor="cardNumber">Card Number:</label>
          <input type="text" id="cardNumber" name="cardNumber" className="p-2 mb-2" />
          <label htmlFor="expiryDate">Expiry Date:</label>
          <input type="text" id="expiryDate" name="expiryDate" className="p-2 mb-2" />
          <label htmlFor="cvv">CVV:</label>
          <input type="text" id="cvv" name="cvv" className="p-2 mb-2" />
          <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-lg">Submit</button>
        </form>
      `,
    },
    {
      label: "Outlined Payment Form",
      cssCode: `
        <form style="display: flex; flex-direction: column;">
          <label for="cardNumber">Card Number:</label>
          <input type="text" id="cardNumber" name="cardNumber" style="padding: 8px; margin-bottom: 8px; border: 1px solid #007bff;">
          <label for="expiryDate">Expiry Date:</label>
          <input type="text" id="expiryDate" name="expiryDate" style="padding: 8px; margin-bottom: 8px; border: 1px solid #007bff;">
          <label for="cvv">CVV:</label>
          <input type="text" id="cvv" name="cvv" style="padding: 8px; margin-bottom: 8px; border: 1px solid #007bff;">
          <button type="submit" style="padding: 8px 16px; background-color: #007bff; color: #007bff; border: 1px solid #007bff; cursor: pointer;">Submit</button>
        </form>
      `,
      jsxCode: `
        <form className="flex flex-col">
          <label htmlFor="cardNumber">Card Number:</label>
          <input type="text" id="cardNumber" name="cardNumber" className="p-2 mb-2 border border-blue-500" />
          <label htmlFor="expiryDate">Expiry Date:</label>
          <input type="text" id="expiryDate" name="expiryDate" className="p-2 mb-2 border border-blue-500" />
          <label htmlFor="cvv">CVV:</label>
          <input type="text" id="cvv" name="cvv" className="p-2 mb-2 border border-blue-500" />
          <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-lg border border-blue-500">Submit</button>
        </form>
      `,
    },
    {
      label: "Gradient Payment Form",
      cssCode: `
        <form style="display: flex; flex-direction: column;">
          <label for="cardNumber">Card Number:</label>
          <input type="text" id="cardNumber" name="cardNumber" style="padding: 8px; margin-bottom: 8px; background-image: linear-gradient(to right, #4e54c8, #8f94fb); color: white;">
          <label for="expiryDate">Expiry Date:</label>
          <input type="text" id="expiryDate" name="expiryDate" style="padding: 8px; margin-bottom: 8px; background-image: linear-gradient(to right, #f12711, #f5af19); color: white;">
          <label for="cvv">CVV:</label>
          <input type="text" id="cvv" name="cvv" style="padding: 8px; margin-bottom: 8px; background-image: linear-gradient(to right, #f3904f, #3b4371); color: white;">
          <button type="submit" style="padding: 8px 16px; background-image: linear-gradient(to right, #4e54c8, #8f94fb); color: white; border: none; cursor: pointer;">Submit</button>
        </form>
      `,
      jsxCode: `
        <form className="flex flex-col">
          <label htmlFor="cardNumber">Card Number:</label>
          <input type="text" id="cardNumber" name="cardNumber" className="p-2 mb-2 bg-gradient-to-r from-purple-100 to-indigo-100 text-white" />
          <label htmlFor="expiryDate">Expiry Date:</label>
          <input type="text" id="expiryDate" name="expiryDate" className="p-2 mb-2 bg-gradient-to-r from-red-100 to-yellow-100 text-white" />
          <label htmlFor="cvv">CVV:</label>
          <input type="text" id="cvv" name="cvv" className="p-2 mb-2 bg-gradient-to-r from-orange-100 to-blue-100 text-white" />
          <button type="submit" className="py-2 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg">Submit</button>
        </form>
      `,
    },
  ];
  