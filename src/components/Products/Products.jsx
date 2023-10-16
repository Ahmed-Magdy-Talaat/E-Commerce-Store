import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import style from "./Products.module.css";
import { useNavigate } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import { cartContext } from "../CartContext/CartContext";
import { Helmet } from "react-helmet";
import { WishContext } from "../WishContext/WishContext";
import toast from "react-hot-toast";

function Products({ id }) {
  const { addToCart } = useContext(cartContext);
  const { addProduct, deleteProduct } = useContext(WishContext);
  const [wishlist, setWishlist] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const getItems = async () => {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  };

  const AddToCart = async (id) => {
    const { data } = await addToCart(id);
    if (data.status === "success") {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  const addWish = async (id) => {
    const { data } = await addProduct(id);
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
  };

  const toggleWish = async (id) => {
    try {
      if (wishlist.includes(id)) {
        // Remove the item from the wishlist immediately
        setWishlist((prevWishlist) =>
          prevWishlist.filter((item) => item !== id)
        );
        await deleteWish(id);
      } else {
        // Add the item to the wishlist immediately
        setWishlist((prevWishlist) => [...prevWishlist, id]);
        await addWish(id);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const { isLoading, data } = useQuery("products", getItems);
  let products = data?.data.data;
  if (id !== "") {
    products = data?.data.data.filter((item) => {
      return item.category._id === id;
    });
  }

  // if (products !== undefined) setFilteredProducts(products);

  console.log(filteredProducts);

  const handleChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase()); // Convert search term to lowercase
  };

  useEffect(() => {
    let prod = [];
    if (data?.data.data) {
      prod = products.filter((item) =>
        item.title.toLowerCase().includes(searchTerm)
      );
    }
    setFilteredProducts(prod);
  }, [products, searchTerm, data?.data.data]);
  return (
    <>
      <Helmet>
        <title>FreshCart</title>
      </Helmet>
      <div className="container m-auto mt-5">
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
          <div className="row g-3">
            <div className="d-flex justify-content-center align-content-center align-items-center flex-row mt-3 mb-2 ">
              <div className="col-9">
                <input
                  className="form-control rounded-4"
                  name="search"
                  placeholder="search..."
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item, indx) => {
                const {
                  price,
                  imageCover,
                  category,
                  title,
                  _id,
                  ratingsAverage,
                } = item;
                return (
                  <div
                    className={`${style.product} mt-3 col-lg-3 col-md-6 col-sm-1  p-4`}
                    key={indx}
                  >
                    <div className={`d-flex flex-column gap-1 `}>
                      <div
                        className="img-contain"
                        onClick={() => navigate(`/product/${_id}`)}
                      >
                        <img
                          src={imageCover}
                          className="w-100"
                          alt="img-cover"
                        />
                      </div>
                      <div className="details d-flex flex-column gap-1">
                        <div className={`fcolor`}>{category.name}</div>
                        <div className="d-flex flex-row justify-content-between align-content-center align-items-center">
                          <div className={`${style.fsl}`}>
                            {title.split(" ").slice(0, 2).join(" ")}
                          </div>
                          <div>
                            <i
                              onClick={() => {
                                toggleWish(_id);
                              }}
                              className={`fa-solid fa-heart fs-5  ${
                                !wishlist.includes(_id) ? `heart` : `fcolor`
                              }`}
                            ></i>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-row justify-content-between  mt-1 text-muted">
                        <div className="fs-6 ">{price} EGP</div>
                        <div className="d-flex flex-row gap-2 alig-content-center align-items-center">
                          <i className="fa-solid fa-star star-color"></i>
                          <div className="">{ratingsAverage}</div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-1 d-flex flex-row justify-content-center">
                      <div
                        className={`my-3 py-1 rounded-3 ${style.butn} cur-pointer text-center w-75 text-light `}
                        onClick={() => {
                          AddToCart(_id);
                        }}
                      >
                        Add to cart
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="my-5 py-5">
                <div className="fw-bold my-5 py-3 text-center fs-1 fs-md-3 fs-sm-4  fcolor">
                  No Products are found
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Products;
