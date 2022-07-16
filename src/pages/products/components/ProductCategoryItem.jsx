import React from "react";

import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ProductCategoryItem = ({ category }) => {
  return (
    <Link
      to={`${category._id}/${category.name}`}
      className="products-category-item"
    >
      <img src={category.imgUrl} alt={category.name} />
      <p>{category.name}</p>
      <ArrowForwardIosIcon className="arrow-icon" />
    </Link>
  );
};

export default ProductCategoryItem;
