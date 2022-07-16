import * as Yup from "yup";

export const ProductSchema = Yup.object({
  name_en: Yup.string().required("Required!!"),
  name_ar: Yup.string().required("Required!!"),
  desc_en: Yup.string().required("Required!!"),
  desc_ar: Yup.string().required("Required!!"),
  price: Yup.number().nullable().required("Required!!"),
  images: Yup.array().min(1, "Please upload at least 1 image!!"),
  sizes: Yup.array(
    Yup.object({
      name_en: Yup.string().nullable().required("required"),
      name_ar: Yup.string().nullable().required("required"),
      price: Yup.number().nullable().required("required"),
    })
  ),
});
