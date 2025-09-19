import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { amount } = req.body; // frontend se aayega total amount

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // paise mein convert
      currency: "INR",
      receipt: "order_rcptid_" + Math.floor(Math.random() * 10000),
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({ orderId: order.id });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
}