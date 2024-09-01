import "bootstrap/dist/css/bootstrap.min.css";
import mainLogo from "../assets/logo.png";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <div className="container-big">
        <header className="text-center py-3 header">
          <Link to="/">
            <img src={mainLogo} alt="logo" className="mb-3 logo"></img>
          </Link>
          <h1 className="display-4 title">about.</h1>
        </header>
      </div>
    </>
  );
}

export default About;
