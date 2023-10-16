import React, { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import style from "./Wish.module.css";
import { useContext } from "react";
import { WishContext } from "../WishContext/WishContext";
import { cartContext } from "../CartContext/CartContext";
import toast from "react-hot-toast";

function WishList() {
  const { getProducts, deleteProduct } = useContext(WishContext);
  const { addToCart } = useContext(cartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const getAll = async () => {
    try {
      const { data } = await getProducts();
      setProducts(data?.data);
      console.log(data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const AddToCart = async (id) => {
    const { data } = await addToCart(id);
    if (data.status === "success") {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  const deleteWish = async (id) => {
    const { data } = await deleteProduct(id);
    if (data.status === "success") {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    await getAll();
  };

  useEffect(() => {
    getAll();
  }, []);
  return (
    <>
      <div className="container w-75 mt-5">
        <div className="fw-bold fs-2 mt-3 mb-4 d-flex gap-3 align-content-center align-items-center">
          <i class="fa-solid fa-clipboard-list fcolor"></i>
          <div className="fcolor"> Whishlist</div>
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
          products.map((item) => {
            const {
              _id,
              imageCover,
              category,
              title,
              description,
              ratingsAverage,
            } = item;
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
                        <span className="fcolor">{price}</span> EGP
                      </div>
                      <div className="d-flex flex-row gap-2 alig-content-center align-items-center">
                        <i className="fa-solid fa-star star-color"></i>
                        <div className="">{ratingsAverage}</div>
                      </div>
                    </div>
                    <div className=" d-flex my-4 flex-row  gap-3 justify-content-between ms-3 w-75 ">
                      <div className="d-flex flex-row gap-1 align-content-center align-items-center col-lg-3 col-md-3 col-sm-6 btn justify-content-center ">
                        <i class="fa-regular fa-trash-can fs-6 "></i>
                        <div
                          className={`text-center fs-6`}
                          onClick={() => {
                            deleteWish(_id);
                          }}
                        >
                          Remove
                        </div>
                      </div>
                      <div
                        className={` py-1 rounded-3 btn cur-pointer text-center`}
                        onClick={() => {
                          AddToCart(_id);
                        }}
                      >
                        Add to cart
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default WishList;
