import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="background-image"></div>

    <div className="container-full-height d-flex justify-content-center align-items-center">
      <div className="container-white d-flex flex-column align-items-center">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </div>
    </div>
  </React.StrictMode>
);
