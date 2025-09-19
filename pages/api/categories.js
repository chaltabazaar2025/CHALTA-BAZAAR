import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, subcategories(id, name)");

  if (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ error: error.message });
  }

  console.log("Fetched categories:", data); // ✅ Debugging
  res.status(200).json(data);
}