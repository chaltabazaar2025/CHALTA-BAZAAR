import React, { useState } from "react";
import ImageUpload from "../components/ImageUpload";

export default function AddProduct() {
  const [imageUrl, setImageUrl] = useState("");

  function handleImageUpload(url) {
    setImageUrl(url);
  }

  return (
    <div>
      <h1>Add Product</h1>
      <ImageUpload onUpload={handleImageUpload} />

      {imageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Product" width="200" />
        </div>
      )}
    </div>
  );
}