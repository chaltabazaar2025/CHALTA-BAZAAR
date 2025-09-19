import { useCart } from "../context/CartContext";
import Script from "next/script";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = async () => {
    if (total === 0) {
      alert("Your cart is empty!");
      return;
    }

    // 1. Backend से order बनवाओ
    const res = await fetch("/api/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total }),
    });

    const data = await res.json();

    if (!data.orderId) {
      alert("Error creating order");
      return;
    }

    // 2. Razorpay options
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: total * 100,
      currency: "INR",
      name: "Chalta Bazaar",
      description: "Order Payment",
      order_id: data.orderId, // backend से मिला orderId
      handler: function (response) {
        alert("Payment successful! ID: " + response.razorpay_payment_id);
        clearCart();
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: { color: "#0070f3" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ padding: "20px" }}>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <h1>🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((item, i) => (
              <li key={i}>
                {item.name} - ₹{item.price}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h2>Total: ₹{total}</h2>
          <button onClick={handlePayment}>Pay with Razorpay</button>
        </>
      )}
    </div>
  );
}