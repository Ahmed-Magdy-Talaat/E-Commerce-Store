import React from "react";
import Slider from "react-slick";
import img1 from "../../Images/slider-image-1.jpeg";
import img2 from "../../Images/slider-image-2.jpeg";
import img3 from "../../Images/slider-image-3.jpeg";
import main from "../../Images/slider-2.jpeg";
import img4 from "../../Images/grocery-banner.png";
import img5 from "../../Images/grocery-banner-2.jpeg";
import style from "./MainSlider.module.css";
function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="container mb-5">
      <Slider {...settings}>
        <div className="d-flex flex-row gap-0 align-content-center align-items-center">
          <div className="col-8">
            <img src={img1} alt="item" className={`${style.imgMain} w-100`} />
          </div>
          <div className="col-4">
            <div className="w-100">
              <img
                src={img2}
                className={`${style.imgContain} w-100`}
                alt="item"
              />
            </div>
            <div className="w-100">
              <img
                src={img3}
                alt="item"
                className={`${style.imgContain} w-100`}
              />
            </div>
          </div>
        </div>
        <div className="d-flex flex-row gap-0 align-content-center align-items-center">
          <div className="col-8">
            <img src={main} alt="item" className={`${style.imgMain} w-100`} />
          </div>
          <div className="col-4">
            <div className="w-100">
              <img
                src={img4}
                className={`${style.imgContain} w-100`}
                alt="item"
              />
            </div>
            <div className="w-100">
              <img
                src={img5}
                className={`${style.imgContain} w-100`}
                alt="item"
              />
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default MainSlider;
