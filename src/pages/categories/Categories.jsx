import SectionTitle from "../../components/molecules/SectionTitle/SectionTitle";
import "./Categories.scss";
import CategoryItem from "./components/CategoryItem";
import { useQuery } from "react-query";
import { axiosInstance } from "../../utils/axios/axios";
import LoadingSpinner from "../../components/atoms/LoadingSpinner/LoadingSpinner";
import endPoints from "../../utils/axios/end-points";

const Categories = () => {
  const { isLoading, data, isError } = useQuery("categories", () =>
    axiosInstance.get(endPoints.fetchAllCategories)
  );

  return (
    <>
      <SectionTitle title={"Categories"} pathToNew={"/categories/new"} />
      {isLoading && <LoadingSpinner />}
      {isError && (
        <p className="center-content">Error occurred, please reload!!</p>
      )}
      {data && (
        <div className="categories-grid">
          {data?.data.data.map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </div>
      )}
    </>
  );
};

export default Categories;
