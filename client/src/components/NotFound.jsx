import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

function NotFound() {
  return (
    <>
        <header className="text-center py-3 header">
          <Link to="/">
            <Logo />
          </Link>
          <h1 className="display-4 title">404.</h1>
        </header>

        <div className="container px-2 my-4">
          <div className="text-center display-4 my-2">
            The page was not found.
          </div>
          <div className="text-center display-6 my-2">
            Please check the URL and try again.
          </div>
        </div>
    </>
  );
}

export default NotFound;