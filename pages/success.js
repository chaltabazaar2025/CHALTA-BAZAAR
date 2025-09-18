import { useEffect } from "react";

export default function SuccessPage() {
  useEffect(() => {
    localStorage.removeItem("cart"); // empty cart after success
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>✅ Payment Successful</h1>
      <p>Thank you for your order!</p>
      <a href="/">Go back to Home</a>
    </div>
  );
}