import React from "react";
import "./Category.scss";

import { useFormik } from "formik";
import * as Yup from "yup";
import CardWrapper from "../../components/atoms/CardWrapper/CardWrapper";
import TextInput from "../../components/atoms/TextInput/TextInput";
import { useMutation } from "react-query";
import LoadingSpinner from "../../components/atoms/LoadingSpinner/LoadingSpinner";
import { axiosInstance } from "../../utils/axios/axios";
import endPoints from "../../utils/axios/end-points";
import { useNavigate } from "react-router-dom";
import ImgPreview from "../../components/molecules/ImgPreview/ImgPreview";

const initialValues = {
  name_en: "",
  name_ar: "",
  img: null,
};

const validationSchema = Yup.object({
  name_ar: Yup.string().required("Required!!"),
  name_en: Yup.string().required("Required!!"),
  img: Yup.mixed().required("Please upload an image!!"),
});

const NewCategory = () => {
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation(
    (data) => axiosInstance.post(endPoints.addCategory, data),
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
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      let formData = new FormData();
      formData.append("img", values.img);
      formData.append("name_en", values.name_en);
      formData.append("name_ar", values.name_ar);
      mutate(formData);
    },
  });

  return (
    <>
      <CardWrapper>
        <h2 className="title">Add new Category</h2>
      </CardWrapper>
      <CardWrapper>
        <ImgPreview
          image={formik.values.img}
          error={
            formik.errors.img && formik.touched.img ? formik.errors.img : null
          }
        />
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
              Add
            </button>
          )}
        </form>
      </CardWrapper>
    </>
  );
};

export default NewCategory;
