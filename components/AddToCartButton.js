// components/AddToCartButton.js
import { useCart } from "../context/CartContext";

const AddToCartButton = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      style={{
        padding: "8px 16px",
        background: "#0070f3",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;