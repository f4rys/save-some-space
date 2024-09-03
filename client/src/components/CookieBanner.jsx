import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function CookieBanner({ onAccept }) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('cookiesAccepted') !== 'true') {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowBanner(false);
    onAccept();
  };

  return (
    showBanner && (
      <div id="cookie-banner" className="cookie-banner d-flex justify-content-center">
        <div className="d-flex align-items-center mx-2">This website uses cookies, which are essential for the functionality of the service.</div>
        <div className="d-flex align-items-center mx-2">
        <Link to="/privacy-policy">Privacy Policy</Link>
          <div className="mx-2">|</div> 
          <Link to="/terms-of-service">Terms of Service</Link>
        </div>
        <div className="d-flex align-items-center mx-2">
          <button className="btn btn-primary" id="accept-cookies" onClick={handleAccept}>Accept</button>
        </div>
      </div>
    )
  );
}

CookieBanner.propTypes = {
  onAccept: PropTypes.func.isRequired,
};

export default CookieBanner;