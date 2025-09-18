// pages/api/upload.js
import { createClient } from "@supabase/supabase-js";
import formidable from "formidable";
import fs from "fs";

// Disable Next.js default body parser (क्योंकि हम file upload कर रहे हैं)
export const config = {
  api: {
    bodyParser: false,
  },
};

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Parse incoming form data (formidable से)
    const form = new formidable.IncomingForm();
    form.uploadDir = "/tmp"; // Temporary folder
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Form parse error:", err);
        return res.status(500).json({ error: "File parsing failed" });
      }

      const file = files.file;
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // File name generate
      const fileName = `${Date.now()}-${file.originalFilename}`;

      // File को Supabase storage में upload करो
      const { data, error } = await supabase.storage
        .from("product_images") // Bucket name
        .upload(fileName, fs.createReadStream(file.filepath), {
          contentType: file.mimetype,
        });

      if (error) {
        console.error("Supabase upload error:", error);
        return res.status(500).json({ error: "Upload to storage failed" });
      }

      // Public URL बनाओ
      const { data: publicData } = supabase.storage
        .from("product_images")
        .getPublicUrl(fileName);

      return res.status(200).json({ url: publicData.publicUrl });
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}