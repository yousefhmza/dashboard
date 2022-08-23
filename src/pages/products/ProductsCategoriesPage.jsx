import React from "react";
import SectionTitle from "../../components/molecules/SectionTitle/SectionTitle";
import "./ProductsCategoriesPage.scss";
import ProductCategoryItem from "./components/ProductCategoryItem";
import { useQuery } from "react-query";
import endPoints from "../../utils/axios/end-points";
import { axiosInstance } from "../../utils/axios/axios";
import LoadingSpinner from "../../components/atoms/LoadingSpinner/LoadingSpinner";

const ProductsCategoriesPage = () => {
  const { isLoading, isError, data } = useQuery("categories", () =>
    axiosInstance.get(endPoints.fetchAllCategories)
  );

  return (
    <>
      <SectionTitle title={"Products categories"} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && !isError && (
        <div className="categs-grid">
          {data?.data.data.map((category) => (
            <ProductCategoryItem key={category._id} category={category} />
          ))}
        </div>
      )}
      {isError && <p>An error occurred, please reload the page!!</p>}
    </>
  );
};

export default ProductsCategoriesPage;
