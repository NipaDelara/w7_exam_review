import { useEffect, useState } from "react";
import ProductListings from "../components/ProductListings";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setError(null);
        const res = await fetch("/api/products");
        const data = await res.json();

        if (!res.ok) throw new Error(data?.error || "Failed to fetch products");

        if (isMounted) setProducts(data);
      } catch (err) {
        if (isMounted) setError(err.message);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>
      <h2>Products</h2>
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      <ProductListings products={products} />
    </div>
  );
}