import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import supabase from "../../lib/supabaseClient";

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProducts = async () => {
      setLoading(true);

      // Pehle category find karo
      const { data: categoryData, error: catError } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", slug)
        .single();

      // Agar category nahi mili to subcategory check karo
      let productsData = [];
      if (categoryData) {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("category_id", categoryData.id);

        if (!error) productsData = data;
      } else {
        const { data: subcategoryData, error: subError } = await supabase
          .from("subcategories")
          .select("id")
          .eq("slug", slug)
          .single();

        if (subcategoryData) {
          const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("subcategory_id", subcategoryData.id);

          if (!error) productsData = data;
        }
      }

      setProducts(productsData);
      setLoading(false);
    };

    fetchProducts();
  }, [slug]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px", textTransform: "capitalize" }}>
        {slug.replace("-", " ")}
      </h1>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                textAlign: "center",
              }}
            >
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              )}
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}