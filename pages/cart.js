import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartPage() {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map((item, i) => <div key={i}>{item.name}</div>)
      )}
    </div>
  );
}