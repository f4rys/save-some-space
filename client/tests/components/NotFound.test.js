import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "../../src/components/NotFound";

describe("NotFound Component", () => {
  test("renders the NotFound component correctly", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText(/404./i)).toBeInTheDocument();
    expect(screen.getByText(/The page was not found./i)).toBeInTheDocument();
    expect(
      screen.getByText(/Please check the URL and try again./i)
    ).toBeInTheDocument();
  });

  test("contains a link to the home page", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const logoLink = screen.getByRole("link");
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute("href", "/");
  });

  test("does not render incorrect text", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.queryByText(/This page exists/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Go back/i)).not.toBeInTheDocument();
  });

  test("does not contain any other links except the home link", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const links = screen.getAllByRole("link");
    expect(links.length).toBe(1);
  });
});
