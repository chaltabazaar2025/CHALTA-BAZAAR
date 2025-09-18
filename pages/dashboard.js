import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Dashboard() {
  const [categories, setCategories] = useState([]);

  // Supabase से categories fetch करना
  useEffect(() => {
    const fetchCategories = async () => {
      let { data, error } = await supabase.from("categories").select("*");
      if (error) {
        console.error("Error fetching categories:", error.message);
      } else {
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <h2>Categories</h2>

      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <ul>
          {categories.map((cat) => (
            <li key={cat.id}>
              <strong>{cat.name}</strong> — {cat.description || "No description"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}