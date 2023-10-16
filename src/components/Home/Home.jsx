import React from "react";
import Products from "../Products/Products";
import Categories from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";

function Home() {
  return (
    <div className="overflow-hidden">
      <MainSlider />
      <Categories />
      <Products id={""} />
    </div>
  );
}

export default Home;
