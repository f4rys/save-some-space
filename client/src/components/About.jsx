import "bootstrap/dist/css/bootstrap.min.css";
import "overlayscrollbars/overlayscrollbars.css";
import { Link } from "react-router-dom";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import Logo from "./Logo.jsx";

function About() {
  return (
    <>
      <div className="container-big">
        <header className="text-center py-3 header2">
          <Link to="/">
            <Logo />
          </Link>
          <h1 className="display-4 title">about.</h1>
        </header>

        <div className="px-2 my-2 scrollable-text-container">
          <OverlayScrollbarsComponent
            defer
            className="scrollable-content"
            options={{ scrollbars: { theme: "os-scrollbar" } }}
          >
            <h2>
              What is <i>save some space.</i> ?
            </h2>

            <p>
              This service is a straightforward URL shortening service designed
              to make your long, unwieldy links more manageable and shareable.
              Whether you&apos;re sharing links on social media, in emails, or
              anywhere else, a shortened link can save space, look cleaner, and
              make your content more discoverable.
            </p>

            <h2>Built with Modern Technologies</h2>

            <p>This project is built using the following technologies:</p>

            <ul>
              <li>
                <strong>Frontend:</strong> React, a popular JavaScript library
                for building user interfaces, combined with Vite for fast
                development and efficient bundling.
              </li>
              <li>
                <strong>Backend:</strong> Express.js, a minimalist and flexible
                Node.js web application framework, handles the server-side logic
                and API endpoints.
              </li>
              <li>
                <strong>Database:</strong> MongoDB Atlas, a cloud-based database
                service, stores the shortened URLs and associated data.
              </li>
            </ul>

            <h2>Key Features</h2>

            <ul>
              <li>URL Shortening: Quickly and easily shorten any valid URL.</li>
              <li>
                User-Friendly Interface: A clean and intuitive interface makes
                the service easy to use.
              </li>
            </ul>

            <h2>Privacy and Security</h2>

            <ul>
              <li>
                Minimal Data Collection: The service only collects essential
                information, such as IP addresses and session cookies, to
                provide the service and ensure its security.
              </li>
              <li>
                No Personal Data Sharing: We do not sell or rent your personal
                information to third parties.
              </li>
              <li>
                Secure Storage: Your shortened links are stored securely in
                MongoDB Atlas.
              </li>
              <li>
                Transparent Policies: Our Privacy Policy and Terms of Service
                clearly outline our data practices and your rights.
              </li>
            </ul>

            <h2>Open Source</h2>

            <p>
              This project is open source and available on{" "}
              <a href="https://github.com/f4rys/Save-some-space">GitHub</a>.
              Feel free to contribute, report issues, or suggest improvements.
            </p>

            <h2>About the Developer</h2>

            <p>
              Hi, I&apos;m Wojciech Bartoszek, the creator of <i>save some space.</i> I&apos;m
              passionate about building web applications and exploring new
              technologies. This project was a fun way to learn more about
              React, Express.js, and MongoDB.
            </p>

            <h2>Feedback and Contact</h2>

            <p>
              I welcome your feedback and suggestions. If you have any questions
              or encounter any issues, please feel free to contact me at{" "}
              <a href="mailto:wojciech.michal.bartoszek@gmail.com">
                wojciech.michal.bartoszek@gmail.com
              </a>
              .
            </p>

            <h2>Credits</h2>
            <ul>
              <li>
                Background image photo was taken by{" "}
                <a href="https://www.pexels.com/@harrison-candlin-1279336/">
                  Harrison Candlin
                </a>{" "}
                and published here on{" "}
                <a href="https://www.pexels.com/photo/close-up-photo-of-blue-background-2441454/">
                  Pexels
                </a>.
              </li>
              <li>
                Base icon for the logo was created by{" "}
                <a href="https://www.iconfinder.com/visualpharm">Ivan Boyko</a>{" "}
                and published here on{" "}
                <a href="https://www.iconfinder.com/icons/309055/link_chain_connection_url_hyperlink_icon">
                  Iconfinder
                </a>.
              </li>
            </ul>
            <p></p>
          </OverlayScrollbarsComponent>
        </div>
      </div>
    </>
  );
}

export default About;