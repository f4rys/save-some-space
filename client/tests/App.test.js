import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../src/App";

jest.mock("../src/components/Home.jsx", () => {
  const Home = () => <div>Home Component</div>;
  Home.displayName = "Home";
  return Home;
});

jest.mock("../src/components/TermsOfService.jsx", () => {
  const TermsOfService = () => <div>Terms of Service Component</div>;
  TermsOfService.displayName = "TermsOfService";
  return TermsOfService;
});

jest.mock("../src/components/PrivacyPolicy.jsx", () => {
  const PrivacyPolicy = () => <div>Privacy Policy Component</div>;
  PrivacyPolicy.displayName = "PrivacyPolicy";
  return PrivacyPolicy;
});

jest.mock("../src/components/About.jsx", () => {
  const About = () => <div>About Component</div>;
  About.displayName = "About";
  return About;
});

jest.mock("../src/components/CatchAll.jsx", () => {
  const CatchAll = () => <div>CatchAll Component</div>;
  CatchAll.displayName = "CatchAll";
  return CatchAll;
});

jest.mock("../src/components/CookieBanner", () => {
  const PropTypes = require('prop-types');

  const CookieBanner = ({ onAccept }) => (
    <button onClick={onAccept}>Accept Cookies</button>
  );

  CookieBanner.propTypes = {
    onAccept: PropTypes.func.isRequired,
  };

  CookieBanner.displayName = "CookieBanner";
  return CookieBanner;
});


describe("App Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders Home component when cookies are accepted", () => {
    localStorage.setItem("cookiesAccepted", "true");

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Home Component")).toBeInTheDocument();
  });

  test("renders Home component when cookies are not accepted", () => {
    localStorage.setItem("cookiesAccepted", "false");

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Home Component")).toBeInTheDocument();
  });

  test("renders Terms of Service component", () => {
    render(
      <MemoryRouter initialEntries={["/terms-of-service"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Terms of Service Component")).toBeInTheDocument();
  });

  test("renders Privacy Policy component", () => {
    render(
      <MemoryRouter initialEntries={["/privacy-policy"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Privacy Policy Component")).toBeInTheDocument();
  });

  test("renders About component", () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("About Component")).toBeInTheDocument();
  });

  test("renders CatchAll component for unknown routes", () => {
    render(
      <MemoryRouter initialEntries={["/unknown-route"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("CatchAll Component")).toBeInTheDocument();
  });
});
