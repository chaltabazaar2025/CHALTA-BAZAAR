// pages/api/categories.js
import supabase from "../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        console.error("Supabase error:", error.message);
        return res.status(500).json({ error: error.message });
      }

      console.log("Categories Data:", data); // 👈 Debug log
      return res.status(200).json(data || []);
    } catch (err) {
      console.error("Server error:", err.message);
      return res.status(500).json({ error: "Server error" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}