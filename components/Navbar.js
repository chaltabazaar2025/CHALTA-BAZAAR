import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{
      background: "#222",
      padding: "10px 20px",
      color: "white",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <h2>🛒 Chalta Bazaar</h2>
      <div>
        <Link href="/" style={{ margin: "0 15px", color: "white" }}>Home</Link>
        <Link href="/add-product" style={{ margin: "0 15px", color: "white" }}>Add Product</Link>
        <Link href="/products" style={{ margin: "0 15px", color: "white" }}>Products</Link>
        <Link href="/cart" style={{ margin: "0 15px", color: "white" }}>Cart</Link>
      </div>
    </nav>
  );
}