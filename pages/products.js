import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortOption, setSortOption] = useState("newest");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // कितने products एक page पर दिखेंगे

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  // Subcategories fetch
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

  // Products fetch
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();

      let filtered = data;

      // Category filter
      if (selectedCategory) {
        filtered = filtered.filter((p) => p.category_id === selectedCategory);
      }

      // Subcategory filter
      if (selectedSubcategory) {
        filtered = filtered.filter((p) => p.subcategory_id === selectedSubcategory);
      }

      // Search filter
      if (search.trim() !== "") {
        filtered = filtered.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Price filter
      filtered = filtered.filter(
        (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
      );

      // Sorting
      if (sortOption === "low-high") {
        filtered = [...filtered].sort((a, b) => a.price - b.price);
      } else if (sortOption === "high-low") {
        filtered = [...filtered].sort((a, b) => b.price - a.price);
      } else if (sortOption === "newest") {
        filtered = [...filtered].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      }

      setProducts(filtered);
      setCurrentPage(1); // filter बदलते ही page reset हो जाएगा
    }
    fetchProducts();
  }, [selectedCategory, selectedSubcategory, search, priceRange, sortOption]);

  // Pagination Logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div style={{ maxWidth: "1100px", margin: "30px auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Our Products</h1>

      {/* Filters + Sorting */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "20px" }}>
        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: "1", padding: "8px" }}
        />

        {/* Category */}
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedSubcategory("");
          }}
        >
          <option value="">-- All Categories --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        {/* Subcategory */}
        {selectedCategory && (
          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
          >
            <option value="">-- All Subcategories --</option>
            {subcategories.map((sub) => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
            ))}
          </select>
        )}

        {/* Price Range */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label>₹</label>
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            style={{ width: "80px", padding: "5px" }}
          />
          <span>-</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            style={{ width: "80px", padding: "5px" }}
          />
        </div>

        {/* Sorting */}
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>

      {/* Products Grid */}
      {currentProducts.length === 0 ? (
        <p style={{ textAlign: "center" }}>No products found</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}>
          {currentProducts.map((p) => (
            <div key={p.id} style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "8px",
              background: "#fff",
              textAlign: "center"
            }}>
              {p.image_url && (
                <img
                  src={p.image_url}
                  alt={p.name}
                  style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "5px" }}
                />
              )}
              <h3>{p.name}</h3>
              <p style={{ fontWeight: "bold", color: "#0070f3" }}>₹{p.price}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            style={{ margin: "0 5px", padding: "8px 12px" }}
          >
            ⬅ Prev
          </button>
          <span> Page {currentPage} of {totalPages} </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            style={{ margin: "0 5px", padding: "8px 12px" }}
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
}