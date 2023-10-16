import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { cartContext } from "../CartContext/CartContext";
import { BallTriangle } from "react-loader-spinner";
import style from "./Cart.module.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { getItems, deleteItems, updateItems, deleteAll } =
    useContext(cartContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const deleteProd = async (id) => {
    const { data } = await deleteItems(id);
    if (data.status === "success") {
      toast.success("Product is deleted Successfully");
    } else {
      toast.error("Product is not deleted");
    }
    setProducts(data?.data.products);
    setTotalPrice(data?.data.totalCartPrice);
  };
  const getCart = async () => {
    try {
      const { data } = await getItems();
      console.log(data?.data);
      setProducts(data?.data.products);
      setTotalPrice(data?.data.totalCartPrice);
    } catch (err) {}
  };

  const updateCartItem = async (id, count) => {
    const { data } = await updateItems(id, count);
    console.log(data?.data);
    if (count === 0) await deleteProd(id);
    else {
      setProducts(data?.data.products);
    }
    setTotalPrice(data?.data.totalCartPrice);
  };

  const clearCart = async () => {
    try {
      const { data } = await deleteAll();
      setProducts([]);
      setTotalPrice(0);
      console.log(data);
      if (data.message === "success")
        toast.success("The Cart is removed successfully");
    } catch (err) {}
  };

  useEffect(() => {
    setIsLoading(true);
    getCart();
    setIsLoading(false);
  }, []);
  return (
    <>
      <div className="container col-12 col-lg-9 col-sm-11 mt-5">
        <div className="d-flex flex-row mt-2 justify-content-between align-content-center align-items-center">
          <div className="fw-bold fs-2  mb-3 d-flex gap-3 align-content-center align-items-center">
            <i class="fa-solid fa-cart-shopping fcolor"></i>
            <div className="fcolor">Cart</div>
          </div>
          <div className="fw-bold fs-5  mb-3 d-flex gap-2 btn  align-content-center align-items-center">
            <i class="fa-regular fa-trash-can fs-6 "></i>
            <div className="" onClick={clearCart}>
              Clear Cart
            </div>
          </div>
        </div>
        <div className="fw-bold fs-5  mb-3 d-flex gap-3 align-content-center align-items-center">
          <div class="fcolor">Total Price</div>
          <div className="fw-bold ">{totalPrice} EGP</div>
        </div>
        {isLoading ? (
          <div className="py-5 my-5 d-flex justify-content-center align-items-center align-content-center ">
            <BallTriangle
              height={200}
              width={200}
              radius={5}
              color="#4fa94d"
              ariaLabel="ball-triangle-loading"
              wrapperClass={{}}
              wrapperStyle=""
              visible={true}
            />
          </div>
        ) : (
          <>
            {products.map((item) => {
              const {
                _id,
                imageCover,
                category,
                title,
                description,
                ratingsAverage,
              } = item.product;

              const { price, count } = item;

              return (
                <div
                  className={`container my-3 col-12 col-lg-10 col-md-11 ${style.card} pt-1 px-3 rounded-3`}
                >
                  <div className="my-2 row gap-3  ">
                    <div className="col-12 col-md-4 col-lg-3  mb-3 d-flex justify-content-center">
                      <div className="d-flex col-9 col-md-12 col-lg-12">
                        <img src={imageCover} alt={title} className="w-100" />
                      </div>
                    </div>

                    <div className="d-flex flex-column gap-2 col-12 col-lg-8 col-md-7 ">
                      <div className="fs-5  mb-2">{title}</div>
                      <div className="fs-6 fcolor mb-1">{category.name}</div>
                      <div className="fs-6 text-muted">{description}</div>

                      <div className="d-flex justify-content-between fs-6">
                        <div>
                          <span className="fcolor">{count * price}</span> EGP
                        </div>
                        <div className="d-flex flex-row gap-2 alig-content-center align-items-center">
                          <i className="fa-solid fa-star star-color"></i>
                          <div className="">{ratingsAverage}</div>
                        </div>
                      </div>
                      <div className="btns d-flex my-4 flex-row gap-3 justify-content-between w-75 ms-3 ">
                        <div className="d-flex flex-row align-content-center align-items-center col-lg-3 col-md-5 col-sm-6 btn justify-content-center">
                          <i class="fa-regular fa-trash-can fs-6 "></i>
                          <div
                            className={`text-center fs-6  px-1`}
                            onClick={() => {
                              deleteProd(_id);
                            }}
                          >
                            Delete
                          </div>
                        </div>

                        <div className="d-flex flex-row gap-2">
                          <div
                            className="btn rounded-3 fs-6"
                            onClick={() => {
                              updateCartItem(_id, count + 1);
                            }}
                          >
                            +
                          </div>
                          <div className="fs-5">{count}</div>
                          <div
                            onClick={() => {
                              updateCartItem(_id, count - 1);
                            }}
                            className="btn rounded-3  fs-6"
                          >
                            -
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {products.length > 0 && (
              <div className="fw-bold mt-5 mb-2 d-flex align-content-center align-items-center justify-content-center text-center">
                <div
                  className="btn px-5 fs-5"
                  onClick={() => navigate("/onlinePayment")}
                >
                  Payment
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
