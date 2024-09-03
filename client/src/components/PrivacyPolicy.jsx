import "bootstrap/dist/css/bootstrap.min.css";
import "overlayscrollbars/overlayscrollbars.css";
import { Link } from "react-router-dom";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import Logo from "./Logo.jsx";

function PrivacyPolicy() {
  return (
    <>
      <div className="container-big">
        <header className="text-center py-3 header2">
          <Link to="/">
            <Logo />
          </Link>
          <h1 className="display-4 title">privacy policy.</h1>
        </header>

        <div className="px-2 my-2 scrollable-text-container">
          <OverlayScrollbarsComponent
            defer
            className="scrollable-content"
            options={{ scrollbars: { theme: "os-scrollbar" } }}
          >
            <h2>1. Information Collected</h2>
            <p>
              The following information may be collected when you use the
              Service:
            </p>
            <ul>
              <li>
                <strong>IP address:</strong> Your IP address is used in the
                process of creating and managing session cookies, which are
                essential for the functionality of the Service.
              </li>
              <li>
                <strong>Cookies:</strong> Session cookies are used to provide
                you the basic functionalities of the Service. These cookies are
                temporary and are deleted when you close your browser.
              </li>
            </ul>

            <h2>2. How Your Information Is Used</h2>
            <p>
              The collected information is used to temporarily store newly
              created shortened links in cookies, in order to provide the basic
              functionalities of the Service.
            </p>

            <h2>3. Sharing Your Information</h2>
            <p>
              Your personal information is not shared with any third parties,
              except for the technical storage of shortened links in MongoDB
              Atlas, a cloud database service.
            </p>

            <h2>4. Your Rights</h2>
            <p>
              You have the right to access, rectify, and erase your personal
              data. You can also object to the processing of your data or
              request its portability. To exercise these rights, please contact
              me at the provided email address.
            </p>

            <h2>5. Contact</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy,
              please contact me at{" "}
              <a href="mailto:wojciech.michal.bartoszek@gmail.com">
                wojciech.michal.bartoszek@gmail.com
              </a>
            </p>
          </OverlayScrollbarsComponent>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy;