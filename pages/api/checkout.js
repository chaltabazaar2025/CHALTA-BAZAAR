import { useState } from "react";

export default function Checkout() {
  const [loading, setLoading] = useState(false);

  const startPayment = async () => {
    setLoading(true);
    try {
      // 1. Create order from backend
      const orderRes = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 500 }), // test ₹500
      });
      const order = await orderRes.json();

      // 2. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Chalta Bazaar",
        description: "Test Transaction",
        order_id: order.id,
        handler: function (response) {
          alert("Payment successful! ✅");
          console.log("Payment response:", response);
        },
        prefill: {
          name: "Narender",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed ❌");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Checkout Page</h1>
      <button onClick={startPayment} disabled={loading}>
        {loading ? "Processing..." : "Pay ₹500"}
      </button>
    </div>
  );
}