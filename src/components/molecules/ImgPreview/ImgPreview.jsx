import "./ImgPreview.scss";

const ImgPreview = ({ image, error }) => {
  return (
    <div className="img-container center-content">
      <img
        src={
          image
            ? URL.createObjectURL(image)
            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
        }
        alt="img"
      />
      {error && <p>{error}</p>}
    </div>
  );
};

export default ImgPreview;
