import { HashRouter, Routes, Route } from "react-router-dom";
import "./style.css";
import Purchases from "./pages/purchases/Purchases";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import ProductId from "./pages/productId/ProductId";
import NavBar from "./components/NavBar";
import LoadingScreen from "./components/LoadingScreen";
import { useSelector } from "react-redux";
import Cart from "./pages/cart/Cart";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <HashRouter>
      <NavBar />
      {isLoading && <LoadingScreen />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductId />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/purchases" element={<Purchases />} />
        </Route>
       
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>
  );
}

export default App;