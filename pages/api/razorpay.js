import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { amount, productId } = req.body;

    try {
      const order = await razorpay.orders.create({
        amount: amount * 100, // paise में
        currency: "INR",
        receipt: `receipt_${productId}_${Date.now()}`,
      });

      return res.status(200).json(order);
    } catch (err) {
      console.error("Razorpay error:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}