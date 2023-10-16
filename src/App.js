import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/signup/SignUp";
import SignIn from "./components/signin/SignIn";
import Home from "./components/Home/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Cart from "./components/Cart/Cart";
import { useEffect, useState } from "react";
import userContext from "./components/Mycontext/userContext";
import Products from "./components/Products/Products";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NotFound from "./components/notfound/NotFound";
import SignAndRegRoute from "./components/SignAndRegRoute/SignAndRegRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import { Offline } from "react-detect-offline";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import CategoryPage from "./components/CategoryPage/CategoryPage";
import { Toaster } from "react-hot-toast";
import CartContextProvider from "./components/CartContext/CartContext";
import Categoryproducts from "./components/ProdCategory/Categoryproducts";
import WishList from "./components/WishList/WishList";
import WishContextProvider from "./components/WishContext/WishContext";
import OnlinePayment from "./components/OnlinePayment/OnlinePayment";
import AllOrders from "./components/AllOrders/AllOrders";

function App() {
  const [token, setToken] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("userToken"))
      setToken(localStorage.getItem("userToken"));
  }, []);

  return (
    <>
      <BrowserRouter>
        <CartContextProvider>
          <WishContextProvider>
            <userContext.Provider value={{ token, setToken }}>
              <Navbar />

              <Offline>
                <div className="wifi">
                  <i class="fa-solid fa-wifi icon"></i>
                </div>
              </Offline>
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                      <Footer />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <SignAndRegRoute>
                      <SignUp />
                    </SignAndRegRoute>
                  }
                />
                <Route
                  path="/signin"
                  element={
                    <SignAndRegRoute>
                      <SignIn />
                    </SignAndRegRoute>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <ProtectedRoute>
                      <Products id={""} />
                      <Footer />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/categories"
                  element={
                    <ProtectedRoute>
                      <CategoryPage />
                      <Footer />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/forgetPassword"
                  element={
                    <SignAndRegRoute>
                      <ForgetPassword />
                    </SignAndRegRoute>
                  }
                />

                <Route
                  path="/resetPass"
                  element={
                    <SignAndRegRoute>
                      <ResetPassword />
                    </SignAndRegRoute>
                  }
                />

                <Route
                  path="/Product/:id"
                  element={
                    <ProtectedRoute>
                      <ProductDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/onlinePayment"
                  element={
                    <ProtectedRoute>
                      <OnlinePayment />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/wishlist"
                  element={
                    <ProtectedRoute>
                      <WishList />
                    </ProtectedRoute>
                  }
                />
                <Route path="/categories/:id" element={<Categoryproducts />} />
                <Route
                  path="/allorders"
                  element={
                    <ProtectedRoute>
                      <AllOrders />{" "}
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>

              <Toaster />
            </userContext.Provider>
          </WishContextProvider>
        </CartContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
