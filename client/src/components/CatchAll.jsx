import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";
import axios from "axios";
import Logo from "./Logo.jsx";

function CatchAll() {
  const { shortUrl } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchComplete, setFetchComplete] = useState(false);

  useEffect(() => {
    const fetchFullUrl = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/${shortUrl}`);
        window.location.href = response.data.url;
      } catch (error) {
        console.error("Error fetching full URL:", error);
        setError(error);
      } finally {
        setIsLoading(false);
        setFetchComplete(true);
      }
    };

    fetchFullUrl();
  }, [shortUrl, navigate]);
  if (error && fetchComplete) {
    return <NotFound />;
  }
  return (
    <>
      <div className="container-big">
        <header className="text-center py-3 header">
          <Link to="/">
          <Logo />
          </Link>
          <h1 className="display-4 title">save some space.</h1>
        </header>

        <div className="container px-2 my-4">
          <div className="text-center display-4 my-2">Redirecting...</div>
        </div>
      </div>
    </>
  );
}

export default CatchAll;
