import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function AddToCartButton({ productId }) {
  const { addToCart } = useContext(CartContext);

  return (
    <button onClick={() => addToCart(productId)}>
      Add to Cart
    </button>
  );
}