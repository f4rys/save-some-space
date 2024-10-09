import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <nav className="navbar">
        <div className="container-fluid pt-5 px-5">
          <div className="nav-item ps-5">
          <Link to="/">
            <a className="nav-link assistant-semibold header-font">
              SAVE SOME SPACE.
            </a></Link>
          </div>

          <div className="d-flex pe-5">
            <div className="nav-item mx-5">
            <Link to="/about">
              <a className="nav-link assistant-semibold header-font">
                ABOUT
              </a>
              </Link>
            </div>
            <div className="nav-item mx-5">
            <Link to="/terms-of-service">
              <a className="nav-link assistant-semibold header-font">
                TERMS OF SERVICE
              </a>
              </Link>
            </div>
            <div className="nav-item mx-5">
              <Link to="/privacy-policy">
              <a className="nav-link assistant-semibold header-font">
                PRIVACY POLICY
              </a>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;