import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    }
    loadProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛍️ Product Catalog</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {products.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <img src={p.image_url} alt={p.name} width="150" />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <small>
              {p.categories?.name} → {p.subcategories?.name}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}