import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./global.css";
import { ProductProvider } from "./context/ProductContext";

import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <header>
          <h1>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Product Review
            </Link>
          </h1>
        </header>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
