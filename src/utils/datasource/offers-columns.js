export const offersColumns = [
  { field: "id", headerName: "Id", width: 250 },
  {
    field: "offer",
    headerName: "Offer",
    width: 350,
    renderCell: (params) => {
      return (
        <div className="cell-with-img">
          <img
            src={params.row.image}
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
];
