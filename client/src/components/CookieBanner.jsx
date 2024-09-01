import React, { useState, useEffect } from 'react';

function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('cookiesAccepted') !== 'true') {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowBanner(false);
  };

  return (
    showBanner && (
      <div id="cookie-banner" className="cookie-banner d-flex justify-content-center">
        <div className="d-flex align-items-center mx-2">This website uses cookies, which are essential for the functionality of the service.</div>
        <div className="d-flex align-items-center mx-2">
          <a href="/privacy-policy">Privacy Policy</a> 
          <div className="mx-1">|</div> 
          <a href="/terms-of-service">Terms of Service</a>
        </div>
        <div className="d-flex align-items-center mx-2">
          <button className="btn btn-primary" id="accept-cookies" onClick={handleAccept}>Accept</button>
        </div>
      </div>
    )
  );
}

export default CookieBanner;