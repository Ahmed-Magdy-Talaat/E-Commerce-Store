import React from "react";
import { useParams } from "react-router-dom";
import Products from "../Products/Products";

function Categoryproducts() {
  const { id } = useParams();

  return <Products id={id} />;
}

export default Categoryproducts;
