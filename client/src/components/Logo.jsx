import React from "react";
import topImageSrc from "../assets/logo_front.png";
import bottomImageSrc from "../assets/logo_back.png";

function Logo() {
  return (
    <div class="image-container mb-3">
      <img src={bottomImageSrc} alt="Bottom Image" class="bottom-image"></img>
      <img src={topImageSrc} alt="Top Image" class="top-image"></img>
    </div>
  );
};

export default Logo;
