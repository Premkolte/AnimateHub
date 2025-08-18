export const couponSnippets = [
    {
      title: "Coupon Code Input",
      tags: ['coupon', 'form', 'input', 'button', 'cta'],
      jsxCode: `(props) => {
        const [couponCode, setCouponCode] = React.useState("");
  
        const handleCouponChange = (e) => {
          setCouponCode(e.target.value);
        };
  
        const applyCoupon = () => {
          console.log("Applying coupon:", couponCode);
        };
  
        return (
          <div>
            <input
              type="text"
              value={couponCode}
              onChange={handleCouponChange}
              placeholder="Enter coupon code"
              style={{
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                marginRight: "10px",
              }}
            />
            <button
              style={{
                backgroundColor: "#28a745",
                color: "white",
                padding: "10px 20px",
                margin:"10px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "background-color 0.3s, transform 0.3s",
              }}
              onClick={applyCoupon}
            >
              Apply Coupon
            </button>
          </div>
        );
      }`,
    },
  ];