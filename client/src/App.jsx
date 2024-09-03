import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/Home.jsx";
import TermsOfService from "./components/TermsOfService.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";
import About from "./components/About.jsx";
import CatchAll from "./components/CatchAll.jsx";
import { Routes, Route } from "react-router-dom";
import CookieBanner from "./components/CookieBanner";
import { useState } from "react";

function App() {
  const [cookiesAccepted, setCookiesAccepted] = useState(
    localStorage.getItem("cookiesAccepted") === "true"
  );

  return (
    <>
      <div className="container-big">
        <Routes>
          <Route
            path="/"
            element={<Home cookiesAccepted={cookiesAccepted} />}
          />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<About />} />
          <Route path="/:shortUrl" element={<CatchAll />} />
        </Routes>
      </div>
      <CookieBanner onAccept={() => setCookiesAccepted(true)} />
    </>
  );
}

export default App;
