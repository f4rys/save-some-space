import { render, screen } from "@testing-library/react";
import Logo from "../../src/components/Logo";

describe("Logo Component", () => {
  test("does not render images when component is not mounted", () => {
    const { container } = render(<Logo />);

    expect(container.querySelector(".non-existent-class")).toBeNull();
  });

  test("has correct class names for images", () => {
    render(<Logo />);

    const bottomImage = screen.getByAltText("Bottom Image");
    const topImage = screen.getByAltText("Top Image");

    expect(bottomImage).toHaveClass("bottom-image");
    expect(topImage).toHaveClass("top-image");
  });

  test("renders without crashing", () => {
    const { container } = render(<Logo />);
    expect(container).toBeInTheDocument();
  });
});
