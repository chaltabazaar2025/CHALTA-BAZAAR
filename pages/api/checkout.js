// pages/api/checkout.js
import Razorpay from "razorpay";
import { supabase } from "../../lib/supabaseClient";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { amount, userId, productId } = req.body;

      // Razorpay order create
      const options = {
        amount: amount * 100, // paise me
        currency: "INR",
        receipt: "receipt_" + Date.now(),
      };

      const order = await razorpay.orders.create(options);

      // Supabase me order save karo
      const { data, error } = await supabase.from("orders").insert([
        {
          user_id: userId,
          product_id: productId,
          amount: amount,
          status: "created",
          razorpay_order_id: order.id,
        },
      ]);

      if (error) {
        console.error("Supabase error:", error);
        return res.status(500).json({ error: error.message });
      }

      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}