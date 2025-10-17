import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ProductDetail from "./components/ProductDetail";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SellerProductList from "./pages/SellerProductList";
import BecomeSellerPage from "./pages/BecomeSellerPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/my-products" element={<SellerProductList />} />
        <Route path="/become-seller" element={<BecomeSellerPage />} />
      </Routes>
    </Router>
  );
};

export default App;
