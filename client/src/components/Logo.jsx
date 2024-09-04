import topImageSrc from "../assets/logo_front.png";
import bottomImageSrc from "../assets/logo_back.png";
import { useLogoClick } from "./LogoContext";

function Logo() {
  const handleClick = useLogoClick();

  return (
    <div
      className="image-container mb-3"
      onClick={handleClick}
      style={{ cursor: handleClick ? "pointer" : "default" }}
    >
      <img src={bottomImageSrc} alt="Bottom Image" className="bottom-image" />
      <img src={topImageSrc} alt="Top Image" className="top-image" />
    </div>
  );
}

export default Logo;
