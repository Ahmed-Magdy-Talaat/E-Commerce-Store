import React from "react";
import Products from "../../components/Products/Products";
import Categories from "../../components/CategorySlider/CategorySlider";
import MainSlider from "../../components/MainSlider/MainSlider";

function Home() {
  return (
    <div className="overflow-hidden">
      <MainSlider />
      <Categories />
      <Products />
    </div>
  );
}

export default Home;
