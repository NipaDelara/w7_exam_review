import { useState } from "react";
import { useNavigate } from "react-router-dom";

<<<<<<< HEAD

const AddProductPage = async () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [inventoryCount, setInventoryCount] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [supplierEmail, setSupplierEmail] = useState("");
  const [supplierPhone, setSupplierPhone] = useState("");
  const [supplierVerified, setSupplierVerified] = useState(false);

  const submitForm = (e) => {
    e.preventDefault()
    
=======
const AddProductPage = () => {
  const navigate = useNavigate();

  // Product fields
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [inventoryCount, setInventoryCount] = useState("");

  // Supplier fields
  const [supplierName, setSupplierName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [isVerified, setIsVerified] = useState("true");

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const postProduct = async (product) => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.error || "Failed to create product");
    return data;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const product = {
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

      await postProduct(product);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
>>>>>>> 6ab66a9 (feat(list-products): render product list via ProductListings)
  };
const navigate = useNavigate();

  const addProduct = async()=>{
    const res = await fetch("api/products",{
      method: "POST",
      headers :{
        "Content-Type": "application/json"},
        body: JSON.stringify(product)
    })
  }
  try{
     await addProduct(product);
    navigate("/")
  } catch(error){
    setError(error.message)
  

  }

  return (
    <div className="create">
      <h2>Add a New Product</h2>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <form onSubmit={submitForm}>
        <label>Product Name:</label>
<<<<<<< HEAD
        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
=======
        <input
          type="text"
          required
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

>>>>>>> 6ab66a9 (feat(list-products): render product list via ProductListings)
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
          <option value="Food">Food</option>
          <option value="Other">Other</option>
        </select>

        <label>Description:</label>
<<<<<<< HEAD
        <textarea required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <label>Price:</label>
        <input type="number" step="0.01" min="0" required value={price} onChange={(e) => setPrice(e.target.value)} />
        <label>Inventory Count:</label>
        <input type="number" min="0" required value={inventoryCount} onChange={(e) => setInventoryCount(e.target.value)} />
        <label>Supplier Name:</label>
        <input type="text" required value={supplierName} onChange={(e) => setSupplierName(e.target.value)} />
        <label>Supplier Email:</label>
        <input type="email" required value={supplierEmail} onChange={(e) => setSupplierEmail(e.target.value)} />
        <label>Supplier Phone:</label>
        <input type="text" required value={supplierPhone} onChange={(e) => setSupplierPhone(e.target.value)} />
        <label>Supplier Verified:</label>
        <select value={supplierVerified} onChange={(e) => setSupplierVerified(e.target.value === "true")}>
=======
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
>>>>>>> 6ab66a9 (feat(list-products): render product list via ProductListings)
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <button disabled={isSubmitting}>{isSubmitting ? "Adding..." : "Add Product"}</button>
      </form>
    </div>
  );
};

export default AddProductPage;