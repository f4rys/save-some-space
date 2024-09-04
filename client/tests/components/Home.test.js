import { createRef } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Home from "../../src/components/Home";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios");

describe("Home Component", () => {
  let setShortenedUrlMock;
  let setShowCookieMessageMock;
  let fullUrlInputRefMock;

  beforeEach(() => {
    setShortenedUrlMock = jest.fn();
    setShowCookieMessageMock = jest.fn();
    fullUrlInputRefMock = createRef();
  });

  test("should display the cookie acceptance message if cookies are not accepted", () => {
    render(
      <MemoryRouter>
        <Home
          cookiesAccepted={false}
          fullUrlInputRef={fullUrlInputRefMock}
          setShortenedUrl={setShortenedUrlMock}
          shortenedUrl=""
          showCookieMessage={false}
          setShowCookieMessage={setShowCookieMessageMock}
        />
      </MemoryRouter>
    );

    const form = screen.getByTestId("url-form");
    fireEvent.submit(form);

    expect(setShowCookieMessageMock).toHaveBeenCalledWith(true);
    expect(setShortenedUrlMock).not.toHaveBeenCalled();
  });

  test("should display the shortened URL when it is provided", () => {
    const shortenedUrl = "short123";

    render(
      <MemoryRouter>
        <Home
          cookiesAccepted={true}
          fullUrlInputRef={fullUrlInputRefMock}
          setShortenedUrl={setShortenedUrlMock}
          shortenedUrl={shortenedUrl}
          showCookieMessage={false}
          setShowCookieMessage={setShowCookieMessageMock}
        />
      </MemoryRouter>
    );

    expect(
      screen.getByText(`savesome.space/${shortenedUrl}`)
    ).toBeInTheDocument();
  });
});
