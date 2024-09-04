import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import CatchAll from "../../src/components/CatchAll";

jest.mock("axios");

describe("CatchAll Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should display loading message while fetching", () => {
    const shortUrl = "loading123";

    axios.get.mockImplementation(() => new Promise(() => {}));

    render(
      <MemoryRouter initialEntries={[`/${shortUrl}`]}>
        <CatchAll />
      </MemoryRouter>
    );

    expect(screen.getByText("Redirecting...")).toBeInTheDocument();
  });
});
