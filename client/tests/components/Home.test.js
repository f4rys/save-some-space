import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../../src/components/Home";

jest.mock("axios");

describe("Home component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the basic elements", () => {
    render(<Home cookiesAccepted={true} />, { wrapper: MemoryRouter });

    expect(screen.getByText("save some space.")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("example.com")).toBeInTheDocument();
    expect(screen.getByText("shorten link")).toBeInTheDocument();
  });

  test("shows cookie message when cookies are not accepted", () => {
    render(<Home cookiesAccepted={false} />, { wrapper: MemoryRouter });

    fireEvent.submit(screen.getByTestId("url-form"));
    expect(
      screen.getByText("accept cookies to use the service.")
    ).toBeInTheDocument();
  });
});
