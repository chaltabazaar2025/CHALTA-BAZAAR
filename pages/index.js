import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import AddToCartButton from "../components/AddToCartButton";

export default function Home() {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <h1>Welcome to Chalta Bazaar</h1>
      <AddToCartButton productId={1} />
      <p>Cart items: {cart.length}</p>
    </div>
  );
}