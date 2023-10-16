import axios from "axios";
import { createContext } from "react";

export let cartContext = createContext();
export default function CartContextProvider(props) {
  const baseUrl = `https://ecommerce.routemisr.com`;
  const Headers = { token: localStorage.getItem("userToken") };

  async function addToCart(id) {
    return axios.post(
      `${baseUrl}/api/v1/cart`,
      { productId: id },
      { headers: Headers }
    );
  }

  async function getItems() {
    return axios.get(`${baseUrl}/api/v1/cart`, { headers: Headers });
  }

  async function deleteItems(id) {
    return axios.delete(`${baseUrl}/api/v1/cart/${id}`, { headers: Headers });
  }

  async function updateItems(id, count) {
    return axios.put(
      `${baseUrl}/api/v1/cart/${id}`,
      { count: count },
      { headers: Headers }
    );
  }

  async function payment(id, obj) {
    return axios.post(
      `${baseUrl}/api/v1/orders/checkout-session/${id}`,
      {
        shippingAddress: obj,
      },
      {
        headers: Headers,
      }
    );
  }

  async function deleteAll() {
    return axios.delete(`${baseUrl}/api/v1/cart`, { headers: Headers });
  }

  return (
    <cartContext.Provider
      value={{
        addToCart,
        getItems,
        deleteItems,
        updateItems,
        payment,
        deleteAll,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
