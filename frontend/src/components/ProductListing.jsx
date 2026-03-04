export default function ProductListing({ product }) {
  return (
    <article style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <h3 style={{ margin: 0 }}>{product.productName}</h3>
      <p style={{ margin: "6px 0" }}>
        <strong>Category:</strong> {product.category}
      </p>
      <p style={{ margin: "6px 0" }}>
        <strong>Price:</strong> €{Number(product.price).toFixed(2)}
      </p>
      <p style={{ margin: "6px 0" }}>{product.description}</p>
    </article>
  );
}