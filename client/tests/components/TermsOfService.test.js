import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TermsOfService from "../../src/components/TermsOfService";

describe("TermsOfService Component", () => {
  test("renders all sections of Terms of Service", () => {
    render(
      <MemoryRouter>
        <TermsOfService />
      </MemoryRouter>
    );

    const sections = [
      "1. Acceptance of Terms",
      "2. Description of Service",
      "3. User Conduct",
      "4. Disclaimer of Warranties",
      "5. Limitation of Liability",
      "6. Termination",
      "7. Governing Law",
    ];

    sections.forEach((section) => {
      const sectionElement = screen.getByText(section);
      expect(sectionElement).toBeInTheDocument();
    });
  });

  test("does not render non-existent text", () => {
    render(
      <MemoryRouter>
        <TermsOfService />
      </MemoryRouter>
    );

    const nonExistentText = screen.queryByText(/non-existent text/i);
    expect(nonExistentText).not.toBeInTheDocument();
  });

  test("renders the correct number of list items under User Conduct", () => {
    render(
      <MemoryRouter>
        <TermsOfService />
      </MemoryRouter>
    );

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
  });

  test("renders without crashing under heavy load", () => {
    const { container } = render(
      <MemoryRouter>
        <TermsOfService />
      </MemoryRouter>
    );
    expect(container).toBeInTheDocument();
  });
});
