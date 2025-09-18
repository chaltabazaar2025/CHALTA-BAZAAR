import supabase from "@/lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, price, category_id, subcategory_id, image_url } = req.body;

    const { data, error } = await supabase.from("products").insert([
      {
        name,
        price,
        category_id,
        subcategory_id,
        image_url,
      },
    ]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(201).json(data);
  }

  return res.status(405).json({ error: "Method not allowed" });
}