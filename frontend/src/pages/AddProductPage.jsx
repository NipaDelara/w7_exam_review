import { useState } from "react";
import { useNavigate } from "react-router-dom";


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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token =user ? user.token: null;

  const submitForm = (e) => {
    e.preventDefault()
    
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
        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
          <option value="Food">Food</option>
          <option value="Other">Other</option>
        </select>

        <label>Description:</label>
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
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <button disabled={isSubmitting}>{isSubmitting ? "Adding..." : "Add Product"}</button>
      </form>
    </div>
  );
};

export default AddProductPage;