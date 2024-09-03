import topImageSrc from "../assets/logo_front.png";
import bottomImageSrc from "../assets/logo_back.png";

function Logo() {
  return (
    <div className="image-container mb-3">
      <img src={bottomImageSrc} alt="Bottom Image" className="bottom-image"></img>
      <img src={topImageSrc} alt="Top Image" className="top-image"></img>
    </div>
  );
}

export default Logo;