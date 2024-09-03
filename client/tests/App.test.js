import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../src/App";

jest.mock("../src/components/Home.jsx", () => () => <div>Home Component</div>);
jest.mock("../src/components/TermsOfService.jsx", () => () => (
  <div>Terms of Service Component</div>
));
jest.mock("../src/components/PrivacyPolicy.jsx", () => () => (
  <div>Privacy Policy Component</div>
));
jest.mock("../src/components/About.jsx", () => () => (
  <div>About Component</div>
));
jest.mock("../src/components/CatchAll.jsx", () => () => (
  <div>CatchAll Component</div>
));
jest.mock("../src/components/CookieBanner", () => ({ onAccept }) => (
  <button onClick={onAccept}>Accept Cookies</button>
));

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
