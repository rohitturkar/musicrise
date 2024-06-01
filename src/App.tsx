import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import Store from "./Store/store";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header.tsx";
import Home from "./Pages/Home/Home.tsx";
import Cart from "./Pages/Cart/Cart.tsx";
import Checkout from "./Pages/Checkout/Checkout.tsx";
import WishList from "./Pages/WishList/WishList.tsx";
import Product from "./Pages/Product/Product.tsx";
import ProductDetails from "./Pages/Product/ProductDetail/productDetails.tsx";

const App: React.FC = () => {
  return (
    <div className="App overflow-hidden">
      <Provider store={Store}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
        </Routes>
      </Provider>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
