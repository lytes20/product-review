import { useEffect, useState } from "react";
import Product from "./Product";
import "./style.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setProducts(res.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="main">
      {isLoading && <span>Loading ...</span>}
      {products.map((product) => (
        <div className="product-container">
          <Product {...product} />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
