import { useEffect, useState } from "react";
import Script from "next/script";

export default function AdminPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // products Supabase से fetch करो
    async function fetchProducts() {
      const res = await fetch("/api/products"); // मान लो तुमने यह API बनाई है
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  const startPayment = async (product) => {
    try {
      // Backend से Razorpay order create
      const orderRes = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: product.price }),
      });
      const order = await orderRes.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Chalta Bazaar",
        description: product.name,
        order_id: order.id,
        handler: function (response) {
          alert(`✅ ${product.name} purchased successfully!`);
          console.log("Payment success:", response);
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("❌ Payment failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <h1>Admin Panel</h1>
      {products.length === 0 ? (
        <p>No products yet</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id} style={{ margin: "15px 0" }}>
              <strong>{product.name}</strong> - ₹{product.price}
              <button
                style={{ marginLeft: 10 }}
                onClick={() => startPayment(product)}
              >
                Buy Now
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}