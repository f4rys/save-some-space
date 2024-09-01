import "bootstrap/dist/css/bootstrap.min.css";
import mainLogo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function Home({ cookiesAccepted }) {
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [showCookieMessage, setShowCookieMessage] = useState(false);
  const fullUrlInputRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!cookiesAccepted) {
      setShowCookieMessage(true);
      return;
    }

    setShowCookieMessage(false);

    const fullUrl = event.target.fullUrl.value;

    try {
      const response = await axios.post("http://localhost:8080/shortUrls", {
        fullUrl: fullUrl,
      });
      setShortenedUrl(response.data.shortUrl);
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(`savesome.space/${shortenedUrl}`);

      const copyButton = document.getElementById("copyButton");
      copyButton.textContent = "copied to clipboard";
    } catch (error) {
      const copyButton = document.getElementById("copyButton");
      copyButton.textContent = "failed to copy. try again";
    }
  };

  const handleLogoClick = () => {
    setShortenedUrl("");
    if (fullUrlInputRef.current) {
      fullUrlInputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="container-big">
        <header className="text-center py-3 header">
          <a onClick={handleLogoClick}>
            <img src={mainLogo} alt="logo" className="mb-3 logo"></img>
          </a>
          <h1 className="display-4 title">save some space.</h1>
        </header>

        <div className="container px-2 my-5">
          <form id="url-form" onSubmit={handleSubmit}>
            <input
              type="url"
              className="form-control mb-3"
              id="fullUrl"
              name="fullUrl"
              placeholder="example.com"
              required
              ref={fullUrlInputRef}
            ></input>
            <div className="d-grid">
              <button
                className="btn btn-primary btn-lg"
                id="submitButton"
                type="submit"
              >
                shorten link
              </button>
            </div>
          </form>

          {shortenedUrl && (
            <div
              className="text-center h4 shortened-url-display"
              id="shortenedUrlDisplay"
            >
              <div id="shortenedUrl" className="mb-2 mt-4 shortened-url">
                <a
                  href={`/${shortenedUrl}`}
                  target="_blank"
                >{`savesome.space/${shortenedUrl}`}</a>
              </div>
              <div className="mt-3">
                <button
                  id="copyButton"
                  className="btn btn-primary shortened-url-button"
                  onClick={handleCopyClick}
                >
                  copy to clipboard
                </button>
              </div>
            </div>
          )}

          {showCookieMessage && (
            <div className="text-body-tertiary mb-2 mt-5 text-center h4">
              accept cookies to use the service.
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <div className="h2 bottom-text">
          read more about the <Link to="/about"> project</Link>.
        </div>
      </div>
    </>
  );
}

export default Home;
