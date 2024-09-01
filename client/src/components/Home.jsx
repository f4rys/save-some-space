import "bootstrap/dist/css/bootstrap.min.css";
import mainLogo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div class="container-big">
        <header class="text-center py-3 header">
          <Link to="/">
            <img src={mainLogo} alt="logo" class="mb-3 logo"></img>
          </Link>
          <h1 class="display-4 title">save some space.</h1>
        </header>

        <div class="container px-2 my-5">
          <form id="url-form" action="/shortUrls" method="POST">
            <input
              type="url"
              class="form-control mb-3"
              id="fullUrl"
              name="fullUrl"
              placeholder="example.com"
              required
            ></input>
            <div class="d-grid">
              <button
                class="btn btn-primary btn-lg"
                id="submitButton"
                type="submit"
              >
                shorten link
              </button>
            </div>
          </form>

          <div
            id="shortenedUrlDisplay"
            class="text-center h4 shortened-url-display"
          ></div>
        </div>
      </div>

      <div class="text-center">
        <div class="h2 bottom-text">
          read more about the <Link to="/about"> project</Link>.
        </div>
      </div>
    </>
  );
}

export default Home;
