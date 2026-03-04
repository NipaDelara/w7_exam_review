import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchOne = async () => {
      try {
        setError(null);
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data?.error || "Failed to fetch product");
        if (isMounted) setProduct(data);
      } catch (err) {
        if (isMounted) setError(err.message);
      }
    };

    fetchOne();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (error) return <p style={{ color: "crimson" }}>{error}</p>;
  if (!product) return <p>Loading...</p>;

  const s = product.supplier || {};

  return (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>
      <button onClick={() => navigate(-1)}>Back</button>

      <h2>{product.productName}</h2>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> €{Number(product.price).toFixed(2)}</p>
      <p><strong>Inventory:</strong> {product.inventoryCount}</p>

      <hr />

      <h3>Supplier</h3>
      <p><strong>Name:</strong> {s.name}</p>
      <p><strong>Email:</strong> {s.contactEmail}</p>
      <p><strong>Phone:</strong> {s.contactPhone}</p>
      <p><strong>Verified:</strong> {String(s.isVerified)}</p>
    </div>
  );
}