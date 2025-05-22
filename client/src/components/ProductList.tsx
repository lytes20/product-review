import { useProducts } from "../context/ProductContext";
import Product from "./Product";
import "./style.css";

const categories = ["All", "Electronics", "Groceries", "Accessories"];

function ProductList() {
  const {
    products,
    isLoading,
    query,
    setQuery,
    category,
    setCategory,
    page,
    setPage,
    total,
    limit,
  } = useProducts();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1); // Reset to page 1
  };

  return (
    <>
      <div className="search-bar">
        <div>
          <input
            type="text"
            placeholder="Search by name..."
            value={query}
            onChange={handleSearchChange}
            style={{ marginRight: "1rem", padding: "0.5rem" }}
          />
        </div>

        <div className="category-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              className={category === cat ? "active" : ""}
              onClick={() => {
                setCategory(cat);
                setPage(1);
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="main">
        {isLoading && <span>Loading ...</span>}
        {!isLoading && products.length === 0 && <span>No products found.</span>}
        {products.map((product) => (
          <div key={product.id} className="product-container">
            <Product
              id={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              description={product.description}
              imageUrl={product.imageUrl}
              averageRating={product.averageRating}
            />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => setPage(Math.max(page - 1, 1))}
          disabled={page === 1}
          style={{ marginRight: "1rem" }}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage(page * limit < total ? page + 1 : page)}
          disabled={page * limit >= total}
          style={{ marginLeft: "1rem" }}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default ProductList;
