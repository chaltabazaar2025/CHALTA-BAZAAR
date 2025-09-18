import formidable from "formidable";
import fs from "fs";
import supabase from "@/lib/supabaseClient";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: "Form parsing error" });
      }

      const file = files.image[0];
      const fileData = fs.readFileSync(file.filepath);

      const { data, error } = await supabase.storage
        .from("product-images")
        .upload(file.originalFilename, fileData, {
          contentType: file.mimetype,
        });

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      const { data: publicUrlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(data.path);

      return res.status(200).json({ url: publicUrlData.publicUrl });
    });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}