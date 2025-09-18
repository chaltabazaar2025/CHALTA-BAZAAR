import { useEffect, useState } from "react";

export default function TestAPI() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    async function fetchSubcategories() {
      if (selectedCategory) {
        const res = await fetch(`/api/subcategories?category_id=${selectedCategory}`);
        const data = await res.json();
        setSubcategories(data);
      } else {
        setSubcategories([]);
      }
    }
    fetchSubcategories();
  }, [selectedCategory]);

  // Fetch products when category or subcategory changes
  useEffect(() => {
    async function fetchProducts() {
      let url = "/api/products";
      const res = await fetch(url);
      const data = await res.json();

      let filtered = data;
      if (selectedCategory) {
        filtered = filtered.filter((p) => p.category_id === selectedCategory);
      }
      if (selectedSubcategory) {
        filtered = filtered.filter((p) => p.subcategory_id === selectedSubcategory);
      }

      setProducts(filtered);
    }
    fetchProducts();
  }, [selectedCategory, selectedSubcategory]);

  return (
    <div style={{ maxWidth: "1000px", margin: "30px auto", padding: "20px" }}>
      <h1>API Test Page with Filters</h1>

      {/* Category Filter */}
      <div style={{ marginBottom: "20px" }}>
        <label>Category: </label>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedSubcategory(""); // reset subcategory
          }}
        >
          <option value="">-- All Categories --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory Filter */}
      {selectedCategory && (
        <div style={{ marginBottom: "20px" }}>
          <label>Subcategory: </label>
          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
          >
            <option value="">-- All Subcategories --</option>
            {subcategories.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Products */}
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "8px",
                textAlign: "center",
                background: "#fff",
              }}
            >
              {p.image_url && (
                <img
                  src={p.image_url}
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
              )}
              <h3>{p.name}</h3>
              <p style={{ fontWeight: "bold", color: "#0070f3" }}>₹{p.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}