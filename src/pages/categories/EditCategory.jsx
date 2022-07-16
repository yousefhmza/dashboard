import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { axiosInstance } from "../../utils/axios/axios";
import endPoints from "../../utils/axios/end-points";
import CardWrapper from "../../components/atoms/CardWrapper/CardWrapper";
import TextInput from "../../components/atoms/TextInput/TextInput";
import LoadingSpinner from "../../components/atoms/LoadingSpinner/LoadingSpinner";

const validationSchema = Yup.object({
  name_ar: Yup.string().required("Required!!"),
  name_en: Yup.string().required("Required!!"),
});

const EditCategory = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation(
    (data) => axiosInstance.put(endPoints.editCategory, data),
    {
      onSuccess: (data) => {
        navigate(-1);
      },
      onError: () => {
        console.log("error");
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      name_en: queryParams.get("name"),
      name_ar: queryParams.get("name"),
      img: null,
      imgUrl: queryParams.get("imgUrl"),
    },
    validationSchema,
    onSubmit: (values) => {
      let formData = new FormData();
      formData.append("id", queryParams.get("id"));
      formData.append("img", values.img);
      formData.append("name_en", values.name_en);
      formData.append("name_ar", values.name_ar);
      mutate(formData);
    },
  });

  return (
    <>
      <CardWrapper>
        <h2 className="title">Edit Category</h2>
      </CardWrapper>
      <CardWrapper>
        <div className="categ-img-container center-content">
          <img
            src={
              formik.values.img
                ? URL.createObjectURL(formik.values.img)
                : queryParams.get("imgUrl")
            }
            alt="img"
          />
          {formik.errors.img && formik.touched.img && (
            <p>{formik.errors.img}</p>
          )}
        </div>
        <form className="categ-form-container" onSubmit={formik.handleSubmit}>
          <label className="upload-img">
            <p>Upload image</p>
            <input
              type={"file"}
              onChange={(event) => {
                formik.setFieldValue("img", event.target.files[0]);
              }}
            />
          </label>
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
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <button className="submit-btn" type={"submit"}>
              Confirm
            </button>
          )}
        </form>
      </CardWrapper>
    </>
  );
};

export default EditCategory;
