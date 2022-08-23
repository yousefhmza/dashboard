import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import DeleteIcon from "@mui/icons-material/Delete";

const MultipleImagesPreview = ({ formik }) => {
  return (
    <div className="product-imgs-container">
      {formik.values.images.length !== 0 ? (
        formik.values.images.map((img, index) => {
          return (
            <div className="img-container">
              <DeleteIcon
                className="delete-icon"
                onClick={() => {
                  formik.setFieldValue(
                    "images",
                    formik.values.images.filter((image, i) => i !== index)
                  );
                }}
              />
              <img
                key={index}
                src={typeof img === "string" ? img : URL.createObjectURL(img)}
                alt="img"
              />
            </div>
          );
        })
      ) : (
        <img
          src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
          alt="img"
        />
      )}
      {formik.errors.images && formik.touched.images && (
        <div className="no-images">
          <ErrorIcon />
          <p>{formik.errors.images}</p>
        </div>
      )}
    </div>
  );
};

export default MultipleImagesPreview;
