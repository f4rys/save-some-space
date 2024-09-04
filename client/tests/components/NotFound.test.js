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

  test("does not render incorrect text", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.queryByText(/This page exists/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Go back/i)).not.toBeInTheDocument();
  });

});
