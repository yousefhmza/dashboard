import "./CategoryProductsPage.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../utils/axios/axios";
import { columns } from "../../utils/datasource/columns";
import AppDialog from "../../components/atoms/AppDialog/AppDialog";
import SectionTitle from "../../components/molecules/SectionTitle/SectionTitle";
import endPoints from "../../utils/axios/end-points";

const CategoryProductsPage = () => {
  const queryClient = useQueryClient();
  const { categoryId, categoryName } = useParams();
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    selectedProductId: null,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const showDialog = (id) => {
    setDialogState({ isOpen: true, selectedProductId: id });
  };

  const closeDialog = () => {
    setDialogState({ isOpen: false, selectedProductId: null });
  };

  const { isLoading, isError, data } = useQuery(
    `category-products-${categoryId}-${currentPage}`,
    () =>
      axiosInstance.get(endPoints.fetchProducts, {
        params: { page: currentPage, categoryId },
      })
  );

  const { mutate, isLoading: isDeleting } = useMutation(
    (id) => axiosInstance.delete(endPoints.deleteProduct, { params: { id } }),
    {
      onSuccess: () => {
        closeDialog();
        queryClient.invalidateQueries(
          `category-products-${categoryId}-${currentPage}`
        );
      },
    }
  );

  const products = data?.data.data.map((product) => {
    return {
      id: product._id,
      name: product.name,
      imgUrl: product.images[0],
      price: product.price,
      discount: product.discount,
      isFeatured: product.isFeatured,
      category: product.category.name,
    };
  });

  const actionColumn = [
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellActions">
            <Link
              to={`edit-product/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Edit</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => {
                showDialog(params.row.id);
              }}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <AppDialog
        isOpen={dialogState.isOpen}
        isLoading={isDeleting}
        onCancel={closeDialog}
        onConfirm={() => mutate(dialogState.selectedProductId)}
        title="Are you sure you want to delete this product?"
      />
      {isError && (
        <p className="center-content">Error occurred, please reload!!</p>
      )}
      <SectionTitle title={categoryName} pathToNew={"new-product"} />
      <div className="datatable">
        <DataGrid
          className="products-data-grid"
          loading={isLoading}
          rows={products ? products : []}
          columns={columns.concat(actionColumn)}
          rowCount={data ? data.data.totalDocs : 0}
          rowsPerPageOptions={[10]}
          pagination
          page={currentPage - 1}
          pageSize={10}
          paginationMode="server"
          onPageChange={(page) => setCurrentPage(page + 1)}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </>
  );
};

export default CategoryProductsPage;
