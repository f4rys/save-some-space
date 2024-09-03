import React from "react";
import { render, screen } from "@testing-library/react";
import PrivacyPolicy from "../../src/components/PrivacyPolicy";
import { MemoryRouter } from "react-router-dom";

describe("PrivacyPolicy Component", () => {
  test("renders information collected section", () => {
    render(
      <MemoryRouter>
        <PrivacyPolicy />
      </MemoryRouter>
    );
    const sectionElement = screen.getByText(/information collected/i);
    expect(sectionElement).toBeInTheDocument();
  });

  test("renders contact email", () => {
    render(
      <MemoryRouter>
        <PrivacyPolicy />
      </MemoryRouter>
    );
    const emailElement = screen.getByText(
      /wojciech.michal.bartoszek@gmail.com/i
    );
    expect(emailElement).toBeInTheDocument();
  });

  test("does not render non-existent section", () => {
    render(
      <MemoryRouter>
        <PrivacyPolicy />
      </MemoryRouter>
    );
    const nonExistentElement = screen.queryByText(/non-existent section/i);
    expect(nonExistentElement).not.toBeInTheDocument();
  });

  test("renders all sections correctly", () => {
    render(
      <MemoryRouter>
        <PrivacyPolicy />
      </MemoryRouter>
    );
    const sections = [
      "1. Information Collected",
      "2. How Your Information Is Used",
      "3. Sharing Your Information",
      "4. Your Rights",
      "5. Contact",
    ];
    sections.forEach((section) => {
      expect(screen.getByText(section)).toBeInTheDocument();
    });
  });

  test("renders links correctly", () => {
    render(
      <MemoryRouter>
        <PrivacyPolicy />
      </MemoryRouter>
    );
    const linkElement = screen.getByRole("link", {
      name: /wojciech.michal.bartoszek@gmail.com/i,
    });
    expect(linkElement).toHaveAttribute(
      "href",
      "mailto:wojciech.michal.bartoszek@gmail.com"
    );
  });
});
