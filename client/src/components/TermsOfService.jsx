import "bootstrap/dist/css/bootstrap.min.css";
import "overlayscrollbars/overlayscrollbars.css";
import mainLogo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import Logo from "./Logo.jsx";

function TermsOfService() {
  return (
    <>
      <div className="container-big">
        <header className="text-center py-3 header2">
          <Link to="/">
            <Logo />
          </Link>
          <h1 className="display-4 title">terms of service.</h1>
        </header>

        <div className="px-2 my-2 scrollable-text-container">
          <OverlayScrollbarsComponent
            defer
            className="scrollable-content"
            options={{ scrollbars: { theme: "os-scrollbar" } }}
          >
            <h2>1. Acceptance of Terms</h2>
            <p>
              By using <i>save some space.</i> (the "Service"), you agree to be
              bound by these Terms of Service. If you do not agree to these
              terms, you may not use the Service.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              The Service allows you to shorten long URLs into shorter, more
              manageable links.
            </p>

            <h2>3. User Conduct</h2>
            <p>
              You agree not to use the Service for any illegal or unauthorized
              purpose. You are solely responsible for the content of the URLs
              you shorten and any consequences arising from their use.
              Prohibited activities include, but are not limited to:
            </p>
            <ul>
              <li>Distributing malware or phishing links</li>
              <li>
                Sharing content that infringes on intellectual property rights
              </li>
              <li>Engaging in hate speech or harassment</li>
            </ul>

            <h2>4. Disclaimer of Warranties</h2>
            <p>
              The Service is provided "as is" without any warranties, express or
              implied. We do not guarantee the availability, accuracy, or
              reliability of the Service.
            </p>

            <h2>5. Limitation of Liability</h2>
            <p>
              We shall not be liable for any direct, indirect, incidental,
              special, or consequential damages arising from the use or
              inability to use the Service.
            </p>

            <h2>6. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your access to the
              Service at any time, without notice, for any reason, including but
              not limited to a breach of these Terms of Service.
            </p>

            <h2>7. Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in
              accordance with the laws of Poland.
            </p>
          </OverlayScrollbarsComponent>
        </div>
      </div>
    </>
  );
}

export default TermsOfService;
