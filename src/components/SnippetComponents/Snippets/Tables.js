// Snippets/Tables.js

export const tableSnippets = [
    {
      title: 'Simple Table',
      jsxCode: `(props) => (
        <table className="border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2">Header 1</th>
              <th className="border border-gray-200 px-4 py-2">Header 2</th>
              <th className="border border-gray-200 px-4 py-2">Header 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Data 1</td>
              <td className="border border-gray-200 px-4 py-2">Data 2</td>
              <td className="border border-gray-200 px-4 py-2">Data 3</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Data 4</td>
              <td className="border border-gray-200 px-4 py-2">Data 5</td>
              <td className="border border-gray-200 px-4 py-2">Data 6</td>
            </tr>
          </tbody>
        </table>
      )`,
      cssCode: `<table style="border-collapse: collapse; border: 1px solid #ccc;">
        <thead>
          <tr>
            <th style="border: 1px solid #ccc; padding: 0.5rem;">Header 1</th>
            <th style="border: 1px solid #ccc; padding: 0.5rem;">Header 2</th>
            <th style="border: 1px solid #ccc; padding: 0.5rem;">Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ccc; padding: 0.5rem;">Data 1</td>
            <td style="border: 1px solid #ccc; padding: 0.5rem;">Data 2</td>
            <td style="border: 1px solid #ccc; padding: 0.5rem;">Data 3</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ccc; padding: 0.5rem;">Data 4</td>
            <td style="border: 1px solid #ccc; padding: 0.5rem;">Data 5</td>
            <td style="border: 1px solid #ccc; padding: 0.5rem;">Data 6</td>
          </tr>
        </tbody>
      </table>`
    },
    {
      title: 'Striped Table',
      jsxCode: `(props) => (
        <table className="border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2">Item Name</th>
              <th className="border border-gray-200 px-4 py-2">Quantity</th>
              <th className="border border-gray-200 px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-100">
              <td className="border border-gray-200 px-4 py-2">Item 1</td>
              <td className="border border-gray-200 px-4 py-2">2</td>
              <td className="border border-gray-200 px-4 py-2">$10</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Item 2</td>
              <td className="border border-gray-200 px-4 py-2">1</td>
              <td className="border border-gray-200 px-4 py-2">$5</td>
            </tr>
          </tbody>
        </table>
      )`,
      cssCode: `<table style="border-collapse: collapse; border: 1px solid #ccc;">
        <thead>
          <tr>
            <th style="border: 1px solid #ccc; padding: 0.5rem;">Item Name</th>
            <th style="border: 1px solid #ccc; padding: 0.5rem;">Quantity</th>
            <th style="border: 1px solid #ccc; padding: 0.5rem;">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr style="background-color: #f0f0f0;">
            <td style="border: 1px solid #ccc; padding: 0.5rem;">Item 1</td>
            <td style="border: 1px solid #ccc; padding: 0.5rem;">2</td>
            <td style="border: 1px solid #ccc; padding: 0.5rem;">$10</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ccc; padding: 0.5rem;">Item 2</td>
            <td style="border: 1px solid #ccc; padding: 0.5rem;">1</td>
            <td style="border: 1px solid #ccc; padding: 0.5rem;">$5</td>
          </tr>
        </tbody>
      </table>`
    }
  ];
  