import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, price, image_url, category_id, subcategory_id")
        .order("created_at", { ascending: false });

      if (error) return res.status(500).json({ error: error.message });

      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}