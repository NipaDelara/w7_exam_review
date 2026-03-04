import ProductListing from "./ProductListing";

const ProductListings = ({ products }) => {
  if (!products || products.length === 0) return <p>No products yet.</p>;

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductListing key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductListings;