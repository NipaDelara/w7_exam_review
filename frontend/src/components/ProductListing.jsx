import { Link } from "react-router-dom";

export default function ProductListing({ product }) {
  return (
    <article>
      <h3>
        <Link to={`/products/${product._id}`}>{product.productName}</Link>
      </h3>

      <p>
        <strong>Category:</strong> {product.category}
      </p>

      <p>
        <strong>Price:</strong> €{Number(product.price).toFixed(2)}
      </p>

      <p>{product.description}</p>
    </article>
  );
}