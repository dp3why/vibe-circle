import React from "react";
import PropTypes from "prop-types";
import { Gallery } from "react-grid-gallery";

const captionStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  maxHeight: "240px",
  overflow: "hidden",
  position: "absolute",
  bottom: "0",
  width: "100%",
  color: "white",
  padding: "2px",
  fontSize: "90%",
};

const wrapperStyle = {
  display: "block",
  minHeight: "1px",
  width: "100%",
  border: "1px solid #ddd",
  overflow: "auto",
};

const PhotoGallery = ({ images }) => {
  const imageArr = images.map((image) => {
    return {
      ...image,
      customOverlay: (
        <div style={captionStyle}>
          <div>{`${image.user}: ${image.caption}`}</div>
        </div>
      ),
    };
  });

  return (
    <div style={wrapperStyle}>
      <Gallery
        images={imageArr}
        enableImageSelection={false}
        backdropClosesModal={true}
      />
    </div>
  );
};

PhotoGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.string,
      caption: PropTypes.string,
      src: PropTypes.string,
      thumbnail: PropTypes.string,
      thumbnailWidth: PropTypes.number,
      thumbnailHeight: PropTypes.number,
    }).isRequired
  ),
};

export default PhotoGallery;
