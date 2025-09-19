import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ background: "#222", padding: "10px 20px", display: "flex", justifyContent: "space-between" }}>
      <h2 style={{ color: "white" }}>🛒 Chalta Bazaar</h2>
      <div>
        <Link href="/" style={{ margin: "0 15px", color: "white" }}>Home</Link>
        <Link href="/cart" style={{ margin: "0 15px", color: "white" }}>Cart</Link>
        <Link href="/admin" style={{ margin: "0 15px", color: "white" }}>Admin Panel</Link>
      </div>
    </nav>
  );
}