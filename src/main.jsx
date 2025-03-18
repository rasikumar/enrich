import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ScrollIndicator from "./components/ScrollIndicator.jsx";
import { ToastContainer } from "react-toastify";
import { ModalProvider } from "./providers/ModalContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ModalProvider>
      <BrowserRouter>
        <ScrollIndicator />
        <App />
        <ToastContainer />
      </BrowserRouter>
    </ModalProvider>
  </React.StrictMode>
);
