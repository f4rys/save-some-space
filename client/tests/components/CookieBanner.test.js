import { render, screen, fireEvent } from "@testing-library/react";
import CookieBanner from "../../src/components/CookieBanner";
import { MemoryRouter } from "react-router-dom";

describe("CookieBanner Component", () => {
  const mockOnAccept = jest.fn();

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("renders the cookie banner if cookies are not accepted", () => {
    render(
      <MemoryRouter>
        <CookieBanner onAccept={mockOnAccept} />
      </MemoryRouter>
    );

    expect(screen.getByText(/This website uses cookies/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Accept/i })).toBeInTheDocument();
    expect(screen.getByText(/Privacy Policy/)).toBeInTheDocument();
    expect(screen.getByText(/Terms of Service/)).toBeInTheDocument();
  });

  test("does not render the cookie banner if cookies are already accepted", () => {
    localStorage.setItem("cookiesAccepted", "true");
    render(
      <MemoryRouter>
        <CookieBanner onAccept={mockOnAccept} />
      </MemoryRouter>
    );

    expect(
      screen.queryByText(/This website uses cookies/)
    ).not.toBeInTheDocument();
  });

  test("accepts cookies when the accept button is clicked", () => {
    render(
      <MemoryRouter>
        <CookieBanner onAccept={mockOnAccept} />
      </MemoryRouter>
    );

    const acceptButton = screen.getByRole("button", { name: /Accept/i });
    fireEvent.click(acceptButton);

    expect(localStorage.getItem("cookiesAccepted")).toBe("true");
    expect(
      screen.queryByText(/This website uses cookies/)
    ).not.toBeInTheDocument();
    expect(mockOnAccept).toHaveBeenCalledTimes(1);
  });

  test("links to privacy policy and terms of service", () => {
    render(
      <MemoryRouter>
        <CookieBanner onAccept={mockOnAccept} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Privacy Policy/)).toHaveAttribute(
      "href",
      "/privacy-policy"
    );
    expect(screen.getByText(/Terms of Service/)).toHaveAttribute(
      "href",
      "/terms-of-service"
    );
  });
});
