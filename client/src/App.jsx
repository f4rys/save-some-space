import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { LogoProvider } from "./components/LogoContext";
import Home from "./components/Home.jsx";
import TermsOfService from "./components/TermsOfService.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";
import About from "./components/About.jsx";
import CatchAll from "./components/CatchAll.jsx";
import CookieBanner from "./components/CookieBanner";
import Logo from "./components/Logo";

function App() {
  const [cookiesAccepted, setCookiesAccepted] = useState(
    localStorage.getItem("cookiesAccepted") === "true"
  );
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fullUrlInputRef = useRef(null);
  const [showCookieMessage, setShowCookieMessage] = useState(false);
  const [expireAfterEnabled, setExpireAfterEnabled] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [qrEnabled, setQrEnabled] = useState(false);
  const [expirationDays, setExpirationDays] = useState("");

  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleLogoClick = () => {
    setShortenedUrl("");
    setShowCookieMessage(false);
    setErrorMessage("");
    setExpireAfterEnabled(false);
    setExpirationDays("");
    setCustomUrl("");
    setQrEnabled(false);

    if (fullUrlInputRef.current) {
      fullUrlInputRef.current.value = "";
    }
  };

  return (
    <>
      <LogoProvider handleLogoClick={isHome ? handleLogoClick : null}>
        <div className="container-big d-flex flex-column">
          <div className="text-center pt-3">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  cookiesAccepted={cookiesAccepted}
                  fullUrlInputRef={fullUrlInputRef}
                  setShortenedUrl={setShortenedUrl}
                  shortenedUrl={shortenedUrl}
                  showCookieMessage={showCookieMessage}
                  setShowCookieMessage={setShowCookieMessage}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                  expireAfterEnabled={expireAfterEnabled}
                  setExpireAfterEnabled={setExpireAfterEnabled}
                  customUrl={customUrl}
                  setCustomUrl={setCustomUrl}
                  qrEnabled={qrEnabled}
                  setQrEnabled={setQrEnabled}
                  expirationDays={expirationDays}
                  setExpirationDays={setExpirationDays}
                />
              }
            />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/about" element={<About />} />
            <Route path="/:shortUrl" element={<CatchAll />} />
          </Routes>
        </div>
        <CookieBanner onAccept={() => setCookiesAccepted(true)} />
      </LogoProvider>
    </>
  );
}

export default App;
