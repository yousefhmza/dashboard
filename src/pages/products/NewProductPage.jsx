import { useFormik } from "formik";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../utils/axios/axios";
import { newProductInitValues } from "../../utils/formik/init-values";
import { ProductSchema } from "../../utils/formik/validation-schemas";
import CardWrapper from "../../components/atoms/CardWrapper/CardWrapper";
import LoadingSpinner from "../../components/atoms/LoadingSpinner/LoadingSpinner";
import TextInput from "../../components/atoms/TextInput/TextInput";
import endPoints from "../../utils/axios/end-points";
import MultipleImagesPreview from "./components/MultipleImagesPreview";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./ProductPage.scss";

const NewProductPage = () => {
  const { categoryId, categoryName } = useParams();
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation(
    (data) => axiosInstance.post(endPoints.addProduct, data),
    {
      onSuccess: (data) => navigate(-1),
    }
  );

  const formik = useFormik({
    initialValues: newProductInitValues,
    validationSchema: ProductSchema,
    onSubmit: (values) => {
      let formdata = new FormData();
      formdata.append("categoryId", categoryId);
      formdata.append("name_en", values.name_en);
      formdata.append("name_ar", values.name_ar);
      formdata.append("description_en", values.desc_en);
      formdata.append("description_ar", values.desc_ar);
      formdata.append("price", values.price);
      formdata.append("discount", values.discount);
      formdata.append("isFeatured", values.isFeatured);
      for (var image of values.images) {
        formdata.append(`images`, image);
      }
      values.sizes.map((size, index) => {
        formdata.append(`size[${index}][name_en]`, size.name_en);
        formdata.append(`size[${index}][name_ar]`, size.name_ar);
        formdata.append(`size[${index}][price]`, size.price);
        return null;
      });
      mutate(formdata);
    },
  });

  return (
    <>
      <CardWrapper>
        <h2 className="title">Add new product in {categoryName}</h2>
      </CardWrapper>
      <CardWrapper>
        <MultipleImagesPreview
          images={formik.values.images}
          error={
            formik.errors.images && formik.touched.images
              ? formik.errors.images
              : null
          }
        />
        <form className="product-form" onSubmit={formik.handleSubmit}>
          <label className="upload-img">
            <p>Upload image</p>
            <input
              type={"file"}
              multiple={true}
              onChange={(event) => {
                const filesArray = Array.from(event.target.files);
                const imgsArray = formik.values.images.concat(filesArray);
                formik.setFieldValue("images", imgsArray);
              }}
            />
          </label>
          <div className="names-container">
            <TextInput
              id="name_en"
              name="name_en"
              label="English name"
              placeholder="Grilled"
              value={formik.values.name_en}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.name_en && formik.touched.name_en
                  ? formik.errors.name_en
                  : null
              }
            />
            <TextInput
              id="name_ar"
              name="name_ar"
              label="Arabic name"
              placeholder="مشويات"
              value={formik.values.name_ar}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.name_ar && formik.touched.name_ar
                  ? formik.errors.name_ar
                  : null
              }
            />
          </div>
          <div className="desc-container">
            <div className="txt-area-container">
              <textarea
                id="desc_en"
                name="desc_en"
                placeholder="Product description"
                value={formik.values.desc_en}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.desc_en && formik.touched.desc_en && (
                <p>{formik.errors.desc_en}</p>
              )}
            </div>
            <div className="txt-area-container">
              <textarea
                id="desc_ar"
                name="desc_ar"
                placeholder="وصف المنتج"
                value={formik.values.desc_ar}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.desc_ar && formik.touched.desc_ar && (
                <p>{formik.errors.desc_ar}</p>
              )}
            </div>
          </div>
          <div className="price-container">
            <TextInput
              id="price"
              name="price"
              label="Price"
              placeholder="250"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.price && formik.touched.price
                  ? formik.errors.price
                  : null
              }
            />
            <TextInput
              id="discount"
              name="discount"
              label="Discount"
              placeholder="50"
              type="number"
              value={formik.values.discount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="isfeatured-container">
            <input
              id="isFeatured"
              name="isFeatured"
              type="checkbox"
              value={formik.values.isFeatured}
              onChange={() => {
                formik.values.isFeatured = !formik.values.isFeatured;
              }}
            />
            <label htmlFor="isFeatured">Is featured</label>
          </div>
          {formik.values.sizes.map((size, index) => (
            <div key={index} className="size-box">
              <TextInput
                id={`name_en-field-${index}`}
                name={`sizes[${index}].name_en`}
                label="English name"
                value={formik.values.sizes[index].name_en}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.errors.sizes && formik.touched.sizes
                    ? formik.errors.sizes[index]?.name_en
                    : null
                }
              />
              <TextInput
                id={`name_ar-field-${index}`}
                name={`sizes[${index}].name_ar`}
                label="Arabic name"
                value={formik.values.sizes[index].name_ar}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.errors.sizes && formik.touched.sizes
                    ? formik.errors.sizes[index]?.name_ar
                    : null
                }
              />
              <TextInput
                id={`price-field-${index}`}
                name={`sizes[${index}].price`}
                label="Price"
                type="number"
                value={formik.values.sizes[index].price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.errors.sizes && formik.touched.sizes
                    ? formik.errors.sizes[index]?.price
                    : null
                }
              />
              <DeleteIcon
                className="delete-icon"
                onClick={() => {
                  formik.setFieldValue(
                    "sizes",
                    formik.values.sizes.filter((size, i) => i !== index)
                  );
                }}
              />
            </div>
          ))}
          <div
            className="add-size-btn"
            onClick={() => {
              formik.setFieldValue("sizes", [
                ...formik.values.sizes,
                { name_en: "", name_ar: "", price: null },
              ]);
            }}
          >
            <AddCircleOutlineIcon />
            <p>Add Size</p>
          </div>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <button className="submit-btn" type={"submit"}>
              Add
            </button>
          )}
        </form>
      </CardWrapper>
    </>
  );
};

export default NewProductPage;
