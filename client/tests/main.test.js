import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import App from "../src/App.jsx";

const Root = () => (
  <React.StrictMode>
    <div data-testid="background-image" className="background-image"></div>
    <div data-testid="container-full-height" className="container-full-height">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </div>
  </React.StrictMode>
);

describe("main.jsx", () => {
  test("renders the application with background image and container", () => {
    render(<Root />);

    expect(screen.getByTestId("background-image")).toBeInTheDocument();
    expect(screen.getByTestId("container-full-height")).toBeInTheDocument();
    expect(screen.getByText("save some space.")).toBeInTheDocument();
  });
});
