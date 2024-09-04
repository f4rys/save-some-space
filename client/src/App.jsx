import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home.jsx";
import TermsOfService from "./components/TermsOfService.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";
import About from "./components/About.jsx";
import CatchAll from "./components/CatchAll.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import CookieBanner from "./components/CookieBanner";
import { useState, useRef } from "react";
import Logo from "./components/Logo";
import { Link } from "react-router-dom";
import { LogoProvider } from "./components/LogoContext";

function App() {
  const [cookiesAccepted, setCookiesAccepted] = useState(
    localStorage.getItem("cookiesAccepted") === "true"
  );
  const [shortenedUrl, setShortenedUrl] = useState("");
  const fullUrlInputRef = useRef(null);
  const [showCookieMessage, setShowCookieMessage] = useState(false);

  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleLogoClick = () => {
    setShortenedUrl("");
    setShowCookieMessage(false);
    if (fullUrlInputRef.current) {
      fullUrlInputRef.current.value = "";
    }
      
  };

  return (
    <>
      <LogoProvider handleLogoClick={isHome ? handleLogoClick : null}>
        <div className="container-big d-flex flex-column">
          <div className="text-center pt-3 logo-header">
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
