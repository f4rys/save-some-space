import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import gearIcon from "../assets/gear.png";
import qrIcon from "../assets/qr.png";
import clockIcon from "../assets/clock.png";
import fileIcon from "../assets/file.png";

function Home({
  cookiesAccepted,
  fullUrlInputRef,
  setShortenedUrl,
  shortenedUrl,
  showCookieMessage,
  setShowCookieMessage,
  errorMessage,
  setErrorMessage,
  expireAfterEnabled,
  setExpireAfterEnabled,
  customUrl,
  setCustomUrl,
  qrEnabled,
  setQrEnabled,
  expirationDays,
  setExpirationDays,
}) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const handleExpireAfterToggle = () => {
    setExpireAfterEnabled(!expireAfterEnabled);
  };

  const handleQrToggle = () => {
    setQrEnabled(!qrEnabled);
  };

  const handleExpirationDaysChange = (event) => {
    setExpirationDays(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!cookiesAccepted) {
      setShowCookieMessage(true);
      return;
    }

    setShowCookieMessage(false);
    setErrorMessage("");

    const fullUrl = event.target.fullUrl.value;

    try {
      const response = await axios.post(`${apiUrl}/shortUrls`, {
        fullUrl: fullUrl,
      });
      setShortenedUrl(response.data.shortUrl);
    } catch (error) {
      console.error("Error shortening URL:", error);
      setErrorMessage("failed to shorten the URL. please try again.");
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

  const toggleAdvancedOptions = () => {
    setShowAdvancedOptions(!showAdvancedOptions);
  };

  return (
    <>
      <div className="text-center header">
        <h1 className="display-4 title">save some space.</h1>
      </div>

      <div className="flex-fill">
        <form id="url-form" onSubmit={handleSubmit} data-testid="url-form">
          <div className="input-group mb-3">
            <input
              type="url"
              className="form-control"
              id="fullUrl"
              name="fullUrl"
              placeholder="example.com"
              required
              ref={fullUrlInputRef}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="advancedOptionsButton"
              onClick={toggleAdvancedOptions}
            >
              <img src={gearIcon} alt="Settings" className="gear-icon"></img>
            </button>
          </div>

          {showAdvancedOptions && (
            <div className="advanced-options d-flex mb-3">
              <div className="d-flex align-items-center">
                <img src={qrIcon} alt="QR Code" className="settings-icon"></img>
                <label className="mx-2">QR code</label>
                <div className="form-switch">
                  <input
                    className="form-check-input mx-1"
                    type="checkbox"
                    checked={qrEnabled}
                    onChange={handleQrToggle}
                  />
                </div>
              </div>
              <div className="vertical-line"></div>
              <div className="expiry d-flex align-items-start">
                <div className="d-flex align-items-center">
                  <img
                    src={clockIcon}
                    alt="Clock"
                    className="settings-icon"
                  ></img>
                  <label className="mx-2">expires in:</label>
                  <input
                    className="form-control advanced-settings-input expire-form"
                    placeholder="days"
                    min="1"
                    disabled={expireAfterEnabled}
                    value={expirationDays}
                    onChange={handleExpirationDaysChange}
                  />
                </div>
                <div className="form-switch d-flex expiry-container">
                  <input
                    className="form-check-input expiry-switch"
                    type="checkbox"
                    checked={expireAfterEnabled}
                    onChange={handleExpireAfterToggle}
                  />
                  <label className="form-check-label">never</label>
                </div>
              </div>
              <div className="vertical-line"></div>
              <div className="d-flex align-items-center">
                <img src={fileIcon} alt="File" className="settings-icon"></img>
                <label className="mx-1 text-blue">savesome.space/</label>
                <input
                  type="text"
                  className="form-control advanced-settings-input custom-url-form"
                  placeholder="custom-url"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                />
              </div>
            </div>
          )}

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
          <div className="text-center h4" id="shortenedUrlDisplay">
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

        {errorMessage && (
          <div className="text-danger mb-2 mt-5 text-center h4">
            {errorMessage}
          </div>
        )}

        {showCookieMessage && (
          <div className="text-body-tertiary mb-2 mt-5 text-center h4">
            accept cookies to use the service.
          </div>
        )}
      </div>

      <div className="text-center mb-4">
        <div className="h2 bottom-text ">
          read more about the <Link to="/about"> project</Link>.
        </div>
      </div>
    </>
  );
}

Home.propTypes = {
  cookiesAccepted: PropTypes.bool.isRequired,
  fullUrlInputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  setShortenedUrl: PropTypes.func.isRequired,
  shortenedUrl: PropTypes.string,
  showCookieMessage: PropTypes.bool.isRequired,
  setShowCookieMessage: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  setErrorMessage: PropTypes.func.isRequired,
  expireAfterEnabled: PropTypes.bool.isRequired,
  setExpireAfterEnabled: PropTypes.func.isRequired,
  customUrl: PropTypes.string.isRequired,
  setCustomUrl: PropTypes.func.isRequired,
  qrEnabled: PropTypes.bool.isRequired,
  setQrEnabled: PropTypes.func.isRequired,
  expirationDays: PropTypes.string.isRequired,
  setExpirationDays: PropTypes.func.isRequired,
};

export default Home;
