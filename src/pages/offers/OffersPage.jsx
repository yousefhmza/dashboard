import "./OffersPage.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery, useMutation } from "react-query";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../utils/axios/axios";
import { useQueryClient } from "react-query";
import { offersColumns } from "../../utils/datasource/offers-columns";
import { useState } from "react";
import SectionTitle from "../../components/molecules/SectionTitle/SectionTitle";
import endPoints from "../../utils/axios/end-points";
import AppDialog from "../../components/atoms/AppDialog/AppDialog";

const OffersPage = () => {
  const queryClient = useQueryClient();
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    selectedOfferId: null,
  });

  const { isLoading, data } = useQuery("offers", () =>
    axiosInstance.get(endPoints.fetchAllOffers)
  );

  const { mutate, isLoading: isDeleting } = useMutation(
    (id) => axiosInstance.delete(endPoints.deleteOffer, { params: { id } }),
    {
      onSuccess: () => {
        closeDialog();
        queryClient.invalidateQueries("offers");
      },
    }
  );

  const showDialog = (id) => {
    setDialogState({ isOpen: true, selectedOfferId: id });
  };

  const closeDialog = () => {
    setDialogState({ isOpen: false, selectedOfferId: null });
  };

  const offers = data?.data.data.map((offer) => {
    return {
      id: offer._id,
      name: offer.name,
      description: offer.description,
      price: offer.price,
      discount: offer.discount,
      image: offer.image,
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
              to={`edit-offer/${params.row.id}`}
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
        title="Are you sure you want to delete this offer ?"
        onCancel={closeDialog}
        onConfirm={() => mutate(dialogState.selectedOfferId)}
      />
      <SectionTitle title={"Offers"} pathToNew={"/offers/new-offer"} />
      <div className="datatable">
        <DataGrid
          className="offers-data-grid"
          loading={isLoading}
          rows={offers ?? []}
          columns={offersColumns.concat(actionColumn)}
          rowsPerPageOptions={[data?.data.data.length ?? 0]}
          pageSize={data?.data.data.length ?? 0}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </>
  );
};

export default OffersPage;
