import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        if (res.ok && data.product) {
          setProduct(data.product);

          // fetch product images
          const imgRes = await fetch(`/api/product-images?product_id=${id}`);
          const imgData = await imgRes.json();
          if (imgRes.ok) setImages(imgData.images || []);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartMessage("✅ Added to cart!");
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{product.name}</h1>
      <h2>₹{product.price}</h2>
      <p>{product.description}</p>
      <p>
        <strong>Category:</strong> {product.category_name || "—"} <br />
        <strong>Subcategory:</strong> {product.subcategory_name || "—"}
      </p>

      {/* Image Gallery */}
      <div style={{ display: "flex", gap: "10px", overflowX: "auto" }}>
        {images.length > 0 ? (
          images.map((img) => (
            <img
              key={img.id}
              src={img.image_url}
              alt={product.name}
              width="200"
            />
          ))
        ) : product.image_url ? (
          <img src={product.image_url} alt={product.name} width="200" />
        ) : (
          <p>No Images</p>
        )}
      </div>

      <br />
      <button onClick={handleAddToCart}>Add to Cart</button>
      {cartMessage && <p>{cartMessage}</p>}
    </div>
  );
}