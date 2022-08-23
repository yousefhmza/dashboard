import "./SelectedProducts.scss";
import Select, { components } from "react-select";
import { useQuery } from "react-query";
import { axiosInstance } from "../../../utils/axios/axios";
import endPoints from "../../../utils/axios/end-points";

const Option = (props) => {
  return (
    <components.Option {...props}>
      <div className="option">
        <img src={props.data.img} alt="img" />
        <p>{props.data.label}</p>
      </div>
    </components.Option>
  );
};

const SelectedProducts = ({ formik, defaultvalues, isEditing }) => {
  let timer = null;
  let searchText = "";

  const { isFetching, data, refetch } = useQuery(
    ["search", searchText],
    () =>
      axiosInstance.get(endPoints.fetchProducts, {
        params: { name: searchText },
      }),
    {
      enabled: false,
      cacheTime: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const handleInputChange = (value) => {
    searchText = value;
    if (timer) clearTimeout(timer);
    if (value.length !== 0) {
      timer = setTimeout(() => {
        searchText = value;
        refetch(searchText);
      }, 500);
    }
  };

  const handleChange = (values) => {
    const productsIds = values.map((selectedProduct) => selectedProduct.value);
    formik.values.productsIds = productsIds;
  };

  const options = data
    ? data.data.data.map((product) => {
        return {
          value: product._id,
          label: product.name,
          img: product.images[0],
        };
      })
    : [];

  return (
    <>
      <Select
        className="select"
        isMulti={true}
        isDisabled={isEditing}
        isSearchable={true}
        maxMenuHeight={200}
        escapeClearsValue={false}
        closeMenuOnSelect={false}
        isLoading={isFetching}
        defaultValue={defaultvalues}
        loadingMessage={() => "Loading..."}
        options={options}
        components={{ Option }}
        onMenuClose={() => {
          options.length = 0;
        }}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
      {formik.errors.productsIds && formik.touched.productsIds && (
        <p className="error">{formik.errors.productsIds}</p>
      )}
    </>
  );
};

export default SelectedProducts;
