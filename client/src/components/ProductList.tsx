import { useEffect, useState } from "react";
import Product from "./Product";
import "./style.css";

interface ProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  averageRating: number;
}

const categories = ["All", "Electronics", "Groceries", "Accessories"]; // example categories

function ProductList() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const fetchProducts = () => {
    setIsLoading(true);

    const params = new URLSearchParams();
    if (query) params.append("q", query);

    if (category) {
      if (category != "All") {
        params.append("category", category);
      }
    }
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    fetch(`http://localhost:3030/api/products/search?${params.toString()}`)
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.results || []);
        setTotal(res.total || 0);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [query, category, page]);

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
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          style={{ marginRight: "1rem" }}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() =>
            setPage((prev) => (page * limit < total ? prev + 1 : prev))
          }
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
