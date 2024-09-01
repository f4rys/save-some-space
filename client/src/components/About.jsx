import "bootstrap/dist/css/bootstrap.min.css";
import mainLogo from "../assets/logo.png";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <div class="container-big">
        <header class="text-center py-3 header">
          <Link to="/">
            <img src={mainLogo} alt="logo" class="mb-3 logo"></img>
          </Link>
          <h1 class="display-4 title">about.</h1>
        </header>
      </div>
    </>
  );
}

export default About;
