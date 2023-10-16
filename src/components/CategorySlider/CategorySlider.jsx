import React from "react";
import Slider from "react-slick";
import axios from "axios";
import { useQuery } from "react-query";
import style from "./Categories.module.css";
function Categories() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const getCategories = async () => {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  };
  const { data, isLoading, isError } = useQuery("categories", getCategories);
  console.log(data?.data.data);
  return (
    <div className="container">
      <Slider {...settings}>
        {data?.data.data.map((item) => {
          return (
            <div className="d-flex flex-column gap-1" key={item._id}>
              <div>
                <img
                  src={item.image}
                  className={`w-100 ${style.imgMain}`}
                  alt={item.name}
                />
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default Categories;
