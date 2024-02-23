import React, { useState } from "react";
import PropTypes from "prop-types";
import { Gallery } from "react-grid-gallery";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Captions } from "yet-another-react-lightbox/plugins";
import { Typography } from "antd";

const { Title } = Typography;
const captionStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  maxHeight: "300px",
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
  const [index, setIndex] = useState(-1);

  const slides = images.map(({ src, user, caption }) => ({
    src,
    title: (
      <div style={{ alignItems: "center" }}>
        <Title
          level={3}
          style={{
            color: "white",
          }}
          align="center"
        >
          {user}
        </Title>
      </div>
    ),
    description: (
      <Title level={3} align="center" style={{ color: "white" }}>
        {caption}
      </Title>
    ),
  }));

  const handleClick = (index, item) => setIndex(index);

  // add subtitle to each image
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
        onClick={handleClick}
      />
      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Captions]}
      />
    </div>
  );
};

PhotoGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      postId: PropTypes.string,
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
