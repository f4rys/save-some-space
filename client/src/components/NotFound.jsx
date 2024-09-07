import "bootstrap/dist/css/bootstrap.min.css";

function NotFound() {
  return (
    <>
      <div className="text-center pb-3">
        <h1 className="display-4 title">404.</h1>
      </div>

      <div className="px-2 my-4">
        <div className="text-center display-4 my-2">
          The page was not found.
        </div>
        <div className="text-center display-6 my-2">
          Please check the URL and try again.
        </div>
      </div>
    </>
  );
}

export default NotFound;
