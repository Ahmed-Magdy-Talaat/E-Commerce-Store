import axios from "axios";
import React, { useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import style from "./Category.module.css";
import { useNavigate } from "react-router-dom";

function CategoryPage() {
  const navigate = useNavigate();
  const getCategories = async () => {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  };

  const { data, isLoading, isError } = useQuery("CategoryPage", getCategories);
  console.log(data);
  return (
    <div className="container  me-2 mt-5">
      <div className="fw-bold fs-2 mt-3 mb-3 d-flex gap-3 align-content-center align-items-center">
        <i class="fa-solid fa-puzzle-piece fcolor"></i>
        <div className="fcolor"> Categories</div>
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
        <div className="row g-3">
          {data?.data.data.map((item) => {
            const { image, name, _id } = item;
            return (
              <div
                className="d-flex flex-column justify-content-center align-content-center  col-12 col-lg-4 col-md-6"
                onClick={() => {
                  navigate(`/categories/${_id}`);
                }}
              >
                <div
                  className={`w-75 ${style.contain}  position-relative overflow-hidden rounded-3`}
                >
                  <div className={`w-100 text-center`}>
                    <img
                      src={image}
                      alt={name}
                      className={`w-100 ${style.image}`}
                    />
                  </div>
                  <div
                    className={`${style.cat} position-absolute d-flex justify-content-center align-content-center align-items-center`}
                  >
                    <div className="fw-bold fs-4 text-white">{name}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
