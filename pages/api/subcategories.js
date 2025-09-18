import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { category_id } = req.query;

      let query = supabase
        .from("subcategories")
        .select("id, name, category_id")
        .order("created_at", { ascending: true });

      // अगर category_id भेजा गया है तो filter करो
      if (category_id) {
        query = query.eq("category_id", category_id);
      }

      const { data, error } = await query;

      if (error) return res.status(500).json({ error: error.message });

      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}