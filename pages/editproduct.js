import { useState, useEffect } from "react";

export default function EditProduct({ productId }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image_url: "",
  });

  useEffect(() => {
    // fetch product by ID
    async function fetchProduct() {
      const res = await fetch(`/api/products?id=${productId}`);
      const data = await res.json();
      if (data && data.length > 0) {
        setForm(data[0]);
      }
    }
    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(data.message || "Product updated!");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ display: "block", margin: "10px 0", width: "100%" }}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          style={{ display: "block", margin: "10px 0", width: "100%" }}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image_url}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          style={{ display: "block", margin: "10px 0", width: "100%" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Save Changes
        </button>
      </form>
    </div>
  );
}