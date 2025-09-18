// pages/api/test-upload.js
import { createClient } from "@supabase/supabase-js";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // body parser disable क्योंकि हम formidable यूज़ कर रहे हैं
  },
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ error: "Form parsing failed" });
    }

    try {
      const file = files.file?.[0]; // सिर्फ एक file
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const fileData = fs.readFileSync(file.filepath);

      const { data, error } = await supabase.storage
        .from("product_images") // ✅ ध्यान रहे bucket का नाम बिल्कुल यही होना चाहिए
        .upload(`test/${file.originalFilename}`, fileData, {
          contentType: file.mimetype,
          upsert: true,
        });

      if (error) {
        console.error("Upload error:", error);
        return res.status(400).json({ error: error.message });
      }

      return res.status(200).json({ success: true, data });
    } catch (e) {
      console.error("Server error:", e);
      return res.status(500).json({ error: "Server error" });
    }
  });
}