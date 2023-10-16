import axios from "axios";
import { createContext } from "react";

export let WishContext = createContext();

export default function WishContextProvider(props) {
  const usertoken = localStorage.getItem("userToken");
  const Headers = {
    token: usertoken,
  };
  const baseUrl = `https://ecommerce.routemisr.com`;
  async function getProducts() {
    return await axios.get(`${baseUrl}/api/v1/wishlist`, {
      headers: Headers,
    });
  }

  async function addProduct(id) {
    return await axios.post(
      `${baseUrl}/api/v1/wishlist`,
      { productId: id },
      { headers: Headers }
    );
  }

  async function deleteProduct(id) {
    return await axios.delete(`${baseUrl}/api/v1/wishlist/${id}`, {
      headers: Headers,
    });
  }
  return (
    <WishContext.Provider value={{ getProducts, addProduct, deleteProduct }}>
      {props.children}
    </WishContext.Provider>
  );
}
