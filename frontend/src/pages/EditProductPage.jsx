import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [inventoryCount, setInventoryCount] = useState("");

  const [supplierName, setSupplierName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [isVerified, setIsVerified] = useState("true");

  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadProduct = async () => {
      try {
        setError(null);
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data?.error || "Failed to load product");
        if (!isMounted) return;

        setProductName(data.productName || "");
        setCategory(data.category || "Electronics");
        setDescription(data.description || "");
        setPrice(String(data.price ?? ""));
        setInventoryCount(String(data.inventoryCount ?? ""));

        const s = data.supplier || {};
        setSupplierName(s.name || "");
        setContactEmail(s.contactEmail || "");
        setContactPhone(s.contactPhone || "");
        setIsVerified(String(Boolean(s.isVerified)));
      } catch (err) {
        if (isMounted) setError(err.message);
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      const updatedProduct = {
        productName,
        category,
        description,
        price: Number(price),
        inventoryCount: Number(inventoryCount),
        supplier: {
          name: supplierName,
          contactEmail,
          contactPhone,
          isVerified: isVerified === "true",
        },
      };

      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Failed to update product");

      navigate(`/products/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="create">
      <h2>Update Product</h2>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <form onSubmit={submitForm}>
        <label>Product Name:</label>
        <input
          type="text"
          required
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
          <option value="Food">Food</option>
          <option value="Other">Other</option>
        </select>

        <label>Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Price:</label>
        <input
          type="number"
          step="0.01"
          min="0"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label>Inventory Count:</label>
        <input
          type="number"
          min="0"
          required
          value={inventoryCount}
          onChange={(e) => setInventoryCount(e.target.value)}
        />

        <label>Supplier Name:</label>
        <input
          type="text"
          required
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
        />

        <label>Supplier Email:</label>
        <input
          type="email"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />

        <label>Supplier Phone:</label>
        <input
          type="text"
          required
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />

        <label>Supplier Verified:</label>
        <select value={isVerified} onChange={(e) => setIsVerified(e.target.value)}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <button disabled={isSaving}>{isSaving ? "Saving..." : "Save Changes"}</button>
      </form>
    </div>
  );
};

export default EditProductPage;