import axios from "axios";
import React from "react";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { useContext } from "react";
import { cartContext } from "../CartContext/CartContext";
import toast from "react-hot-toast";

function ProductDetails() {
  const { addToCart } = useContext(cartContext);

  const AddToCart = async (id) => {
    const { data } = await addToCart(id);
    if (data.status === "success") {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const { id } = useParams();
  const getProduct = async () => {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  };
  const { isLoading, isError, data } = useQuery("specific", getProduct);

  if (isLoading) {
    return (
      <div className="container mt-5 d-flex justify-content-center">
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
      </div>
    );
  }

  if (isError) {
    // Handle the error state here
    return <div>Error loading product details</div>;
  }

  const { images, title, description, category, price, ratingsAverage } =
    data?.data.data;

  return (
    <div className="container mt-5 ">
      <div className="mt-5 row justify-content-between ">
        <div className="col-md-3 mb-5 ">
          <Slider {...settings}>
            {images.map((img) => {
              return <img src={img} alt={title} className="w-100" />;
            })}
          </Slider>
        </div>

        <div className="d-flex flex-column gap-2 col-md-8 bgColor pt-5 px-4 rounded-3">
          <div className="fs-4 mb-3">{title}</div>
          <div className="fs-5 fcolor mb-1">{category.name}</div>
          <div className="fs-6 text-muted">{description}</div>
          <div className="d-flex flex-row justify-content-between"></div>

          <div className="d-flex justify-content-between fs-5">
            <div>
              <span className="fcolor">{price}</span> EGP
            </div>
            <div className="d-flex flex-row gap-2 alig-content-center align-items-center">
              <i className="fa-solid fa-star star-color"></i>
              <div className="">{ratingsAverage}</div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div
              className={`my-5 py-1 rounded-3 text-center w-50 text-light btn `}
              onClick={() => {
                AddToCart(id);
              }}
            >
              Add to cart
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
