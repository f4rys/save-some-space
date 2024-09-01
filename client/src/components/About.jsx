import "bootstrap/dist/css/bootstrap.min.css";
import mainLogo from "../assets/logo.png";

function About() {
  return (
    <>
      <div class="container-big">
        <header class="text-center py-3 header">
          <a href="/">
            <img src={mainLogo} alt="logo" class="mb-3 logo"></img>
          </a>
          <h1 class="display-4 title">about.</h1>
        </header>
      </div>
    </>
  );
}

export default About;
