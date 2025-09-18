import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { productId, paymentId, amount } = req.body;

    try {
      // Save order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([{ product_id: productId, amount, payment_id: paymentId, status: "success" }])
        .select()
        .single();

      if (orderError) throw orderError;

      // Reduce stock
      const { data: product, error: stockError } = await supabase
        .from("products")
        .update({ stock: supabase.raw("stock - 1") })
        .eq("id", productId)
        .select()
        .single();

      if (stockError) throw stockError;

      return res.status(200).json({ order, product });
    } catch (err) {
      console.error("Payment success error:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}