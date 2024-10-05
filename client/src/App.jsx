import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import TermsOfService from "./components/TermsOfService.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";
import About from "./components/About.jsx";
import CatchAll from "./components/CatchAll.jsx";

function App() {
  return (
    <>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/about" element={<About />} />
            <Route path="/:shortUrl" element={<CatchAll />} />
          </Routes>
    </>
  );
}

export default App;
