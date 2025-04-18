import React from "react";
import PropTypes from "prop-types";
import "./iframe.css";
const YoutubeIFrame = ({ embedId }) => (
  <div className="video-responsive">
    <iframe
      width="100%"
      height="480px"
      src={`https://www.youtube.com/embed/${embedId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeIFrame.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeIFrame;
