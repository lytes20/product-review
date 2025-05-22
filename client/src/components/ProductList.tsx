import { useEffect, useState } from "react";
import Product from "./Product";
import "./style.css";

interface ProductType {
  id: number;
  title: string;
  description: string;
  price: number;
}

function ProductList() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3030/api/products")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setProducts(res.products);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="main">
      {isLoading && <span>Loading ...</span>}
      {products.map((product) => (
        <div key={product.id} className="product-container">
          <Product {...product} />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
