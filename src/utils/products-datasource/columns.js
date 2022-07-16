import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";

export const columns = [
  { field: "id", headerName: "Id", width: 250 },
  {
    field: "product",
    headerName: "Product",
    width: 350,
    renderCell: (params) => {
      return (
        <div className="cell-with-img">
          <img
            src={params.row.imgUrl}
            alt={params.row.name}
            className="cell-img"
          />
          <p>{params.row.name}</p>
        </div>
      );
    },
  },
  { field: "price", headerName: "Price", width: 100 },
  { field: "discount", headerName: "Discount", width: 100 },
  {
    field: "isFeatured",
    headerName: "Featured",
    width: 100,
    renderCell: (params) => {
      return (
        <div
          className={`featured-icon center-content ${params.row.isFeatured}`}
        >
          {params.row.isFeatured ? <CheckCircleOutlineIcon /> : <CancelIcon />}
        </div>
      );
    },
  },
  { field: "category", headerName: "Category", width: 250 },
];
