import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit");

  const handlePayment = (e) => {
    e.preventDefault();
    alert("Payment processed successfully!");
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6">
      <BackButton/>
        <div className="bg-slate-900 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Payment Details</h2>
          <form onSubmit={handlePayment}>
            <div className="mb-4">
              <label className="block text-white">Card Holder Name</label>
              <input
                type="text"
                className="w-full mt-2 p-2 border border-gray-300 rounded bg-gray-800 text-white"
                placeholder="John Doe"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Card Number</label>
              <input
                type="text"
                className="w-full mt-2 p-2 border border-gray-300 rounded bg-gray-800 text-white"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>
            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
                <label className="block text-white">Expiry Date</label>
                <input
                  type="text"
                  className="w-full mt-2 p-2 border border-gray-300 rounded bg-gray-800 text-white"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-white">CVV</label>
                <input
                  type="password"
                  className="w-full mt-2 p-2 border border-gray-300 rounded bg-gray-800 text-white"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-white">Payment Method</label>
              <select
                className="w-full mt-2 p-2 border border-gray-300 rounded bg-gray-800 text-white"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
