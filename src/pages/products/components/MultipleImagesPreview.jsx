import React from "react";
import ErrorIcon from "@mui/icons-material/Error";

const MultipleImagesPreview = ({ images, error }) => {
  return (
    <div className="product-imgs-container">
      {images.length !== 0 ? (
        images.map((img, index) => {
          return (
            <img
              key={index}
              src={typeof img === "string" ? img : URL.createObjectURL(img)}
              alt="img"
            />
          );
        })
      ) : (
        <img
          src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
          alt="img"
        />
      )}
      {error && (
        <div className="no-images">
          <ErrorIcon />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default MultipleImagesPreview;
