import React,{useEffect} from "react";
import "./App.css";
import { Provider } from "react-redux";
import Store from "./Store/store";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./Components/Header/Header.tsx";
import Home from "./Pages/Home/Home.tsx";
import Cart from "./Pages/Cart/Cart.tsx";
import Checkout from "./Pages/Checkout/Checkout.tsx";
import WishList from "./Pages/WishList/WishList.tsx";
import Product from "./Pages/Product/Product.tsx";
import ProductDetails from "./Pages/Product/ProductDetail/productDetails.tsx";
import Signin from "./Pages/Auth/Signin.js";
import Signup from "./Pages/Auth/Signup.tsx";
import { analytics } from "./firbase.tsx";  
import { logEvent } from "firebase/analytics";


const App: React.FC = () => {
  const location = useLocation();
  const hideHeader = ["/signin", "/signup"].includes(location.pathname);

  useEffect(() => {
    
    logEvent(analytics, 'page_view', {
      page_path: location.pathname,
      page_title: document.title,
    });
  }, [location.pathname]);

  return (
    <div className="App overflow-hidden">
      <Provider store={Store}>
        {!hideHeader && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Provider>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
