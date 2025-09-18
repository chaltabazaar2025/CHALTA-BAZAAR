import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category_id: "",
    subcategory_id: "",
    image_url: "",
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (Array.isArray(data)) setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }
    fetchCategories();
  }, []);

  // Fetch subcategories
  useEffect(() => {
    async function fetchSubcategories() {
      try {
        const res = await fetch("/api/subcategories");
        const data = await res.json();
        if (Array.isArray(data)) setSubcategories(data);
      } catch (err) {
        console.error("Error fetching subcategories:", err);
      }
    }
    fetchSubcategories();
  }, []);

  // Fetch product details
  useEffect(() => {
    if (!id) return;
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (res.ok && data.product) {
          setForm({
            name: data.product.name || "",
            price: data.product.price || "",
            description: data.product.description || "",
            category_id: data.product.category_id || "",
            subcategory_id: data.product.subcategory_id || "",
            image_url: data.product.image_url || "",
          });
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Product updated successfully!");
        setTimeout(() => router.push("/admin"), 1500);
      } else {
        setMessage("❌ Error: " + data.error);
      }
    } catch (err) {
      console.error("Error updating product:", err);
      setMessage("❌ Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading product...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <br />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <br />

        {/* Category Dropdown */}
        <select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <br />

        {/* Subcategory Dropdown */}
        <select
          name="subcategory_id"
          value={form.subcategory_id}
          onChange={handleChange}
        >
          <option value="">-- Select Subcategory --</option>
          {subcategories
            .filter((sub) => sub.category_id === form.category_id)
            .map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
        </select>
        <br />

        <input
          name="image_url"
          placeholder="Image URL"
          value={form.image_url}
          onChange={handleChange}
        />
        <br />

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Update Product"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}