import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import About from "../../src/components/About";
import Logo from "../../src/components/Logo";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

jest.mock("../../src/components/Logo");
jest.mock("overlayscrollbars-react", () => ({
  OverlayScrollbarsComponent: jest.fn(({ children }) => <div>{children}</div>),
}));

describe("About Component", () => {
  beforeEach(() => {
    Logo.mockImplementation(() => <div>Mocked Logo</div>);
  });

  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
  });

  test("renders OverlayScrollbarsComponent with the expected content", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(OverlayScrollbarsComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        defer: true,
        className: "scrollable-content",
        options: expect.objectContaining({
          scrollbars: expect.objectContaining({
            theme: "os-scrollbar",
          }),
        }),
      }),
      {}
    );

    expect(
      screen.getByText(/Built with Modern Technologies/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Key Features/i)).toBeInTheDocument();
  });

  test("renders main sections of the about page", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByText(/about\./i)).toBeInTheDocument();
    expect(
      screen.getByText(/Built with Modern Technologies/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Key Features/i)).toBeInTheDocument();
    expect(screen.getByText(/Privacy and Security/i)).toBeInTheDocument();
    expect(screen.getByText(/About the Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/Feedback and Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/Credits/i)).toBeInTheDocument();
  });
});
