import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./global.css";

import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1> Product Review</h1>
      </header>{" "}
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
