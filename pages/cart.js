import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={{ maxWidth: "900px", margin: "30px auto", padding: "20px" }}>
      <h1>🛒 Your Cart</h1>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((item) => (
              <li
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom: "1px solid #ddd"
                }}
              >
                <div>
                  <strong>{item.name}</strong> (x{item.qty})  
                  <br />₹{item.price * item.qty}
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "6px 10px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  ❌ Remove
                </button>
              </li>
            ))}
          </ul>
          <h3>Total: ₹{total}</h3>
          <button
            onClick={clearCart}
            style={{
              marginTop: "10px",
              padding: "8px 12px",
              background: "black",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}