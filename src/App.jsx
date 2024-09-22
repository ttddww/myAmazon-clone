import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import necessary modules
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import CategoryDetail from "./pages/CategoryDetail/CategoryDetail";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import Payment from "./pages/Payment/Payment";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<CategoryDetail />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
