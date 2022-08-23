import React from "react";

import "./OfferPage.scss";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../utils/axios/axios";
import { newOfferInitValues } from "../../utils/formik/init-values";
import { offerSchema } from "../../utils/formik/validation-schemas";
import CardWrapper from "../../components/atoms/CardWrapper/CardWrapper";
import ImgPreview from "../../components/molecules/ImgPreview/ImgPreview";
import TextInput from "../../components/atoms/TextInput/TextInput";
import SelectedProducts from "./components/SelectedProducts";
import endPoints from "../../utils/axios/end-points";
import LoadingSpinner from "../../components/atoms/LoadingSpinner/LoadingSpinner";

const EditOfferPage = () => {
  const { offerId } = useParams();
  const navigate = useNavigate();

  const { isLoading, data } = useQuery(
    `offer-${offerId}`,
    () => axiosInstance.get(endPoints.fetchOffer, { params: { id: offerId } }),
    {
      cacheTime: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const { isLoading: isPatching, mutate } = useMutation(
    (data) => axiosInstance.put(endPoints.editOffer, data),
    {
      onSuccess: () => navigate(-1),
    }
  );

  const defaultValues = data?.data.data.products.map((product) => {
    return {
      value: product._id,
      label: product.name_en,
      img: product.images[0],
    };
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data
      ? {
          name_en: data.data.data.name_en,
          name_ar: data.data.data.name_ar,
          desc_en: data.data.data.description_en,
          desc_ar: data.data.data.description_ar,
          price: data.data.data.price,
          discount: data.data.data.discount,
          img: data.data.data.image,
          productsIds: data.data.data.products.map((product) => product._id),
        }
      : newOfferInitValues,
    validationSchema: offerSchema,
    onSubmit: (values) => {
      let formdata = new FormData();
      console.log("values values values", values.productsIds);
      formdata.append("id", offerId);
      formdata.append("name_en", values.name_en);
      formdata.append("name_ar", values.name_ar);
      formdata.append("description_en", values.desc_en);
      formdata.append("description_ar", values.desc_ar);
      formdata.append("price", values.price);
      formdata.append("discount", values.discount);
      formdata.append("img", values.img);
      mutate(formdata);
    },
  });

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {data && (
        <CardWrapper>
          <ImgPreview
            image={formik.values.img}
            error={
              formik.errors.img && formik.touched.img ? formik.errors.img : null
            }
          />
          <form className="offer-form" onSubmit={formik.handleSubmit}>
            <label className="upload-img">
              <p>Upload image</p>
              <input
                type={"file"}
                onChange={(event) =>
                  formik.setFieldValue("img", event.target.files[0])
                }
              />
            </label>
            <div className="names-container">
              <TextInput
                id="name_en"
                name="name_en"
                label="English name"
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
                  placeholder="Offer description"
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
                  placeholder="وصف العرض"
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
                min={0}
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
                min={1}
                value={formik.values.discount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.errors.discount && formik.touched.discount
                    ? formik.errors.discount
                    : null
                }
              />
            </div>
            <SelectedProducts
              formik={formik}
              defaultvalues={defaultValues}
              isEditing={true}
            />
            {isPatching ? (
              <LoadingSpinner />
            ) : (
              <button className="submit-btn" type={"submit"}>
                Edit
              </button>
            )}
          </form>
        </CardWrapper>
      )}
    </>
  );
};

export default EditOfferPage;
