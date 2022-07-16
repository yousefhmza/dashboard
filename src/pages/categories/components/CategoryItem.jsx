import { Link } from "react-router-dom";
import { useState } from "react";
import "./CategoryItem.scss";
import AppDialog from "../../../components/atoms/AppDialog/AppDialog";
import { useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "../../../utils/axios/axios";
import endPoints from "../../../utils/axios/end-points";

const CategoryItem = ({ category }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    () => {
      return axiosInstance.delete(endPoints.deleteCategory, {
        params: { id: category._id },
      });
    },
    {
      onSuccess: () => {
        closeDialog();
        queryClient.invalidateQueries("categories");
      },
    }
  );

  const [dialogIsOpen, setDialogISOpen] = useState(false);

  const showDialog = () => {
    setDialogISOpen(true);
  };

  const closeDialog = () => {
    setDialogISOpen(false);
  };

  return (
    <>
      <AppDialog
        isOpen={dialogIsOpen}
        isLoading={isLoading}
        title={`Are you sure you want to delete ${category.name} category?`}
        onCancel={closeDialog}
        onConfirm={mutate}
      />
      <div className="category-item">
        <div className="category-data-container">
          <img src={category.imgUrl} alt={category.name} />
          <div className="categ-name">
            <p>{category.name}</p>
          </div>
        </div>
        <div className="categ-actions">
          <Link
            to={`/categories/edit?id=${category._id}&name=${category.name}&imgUrl=${category.imgUrl}`}
            className="categ-action"
          >
            Edit
          </Link>
          <button className="categ-action delete" onClick={showDialog}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default CategoryItem;
