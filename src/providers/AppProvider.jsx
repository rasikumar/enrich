/* eslint-disable react/prop-types */
import { ListProvider } from "./ListProvider";
import { ModalProvider } from "./ModalProvider";
import { BrowserRouter } from "react-router-dom";
import ScrollIndicator from "../components/ScrollIndicator";
import { ToastContainer } from "react-toastify";

const AppProvider = ({ children }) => {
  return (
    <ListProvider>
      <ModalProvider>
        <BrowserRouter>
          <ScrollIndicator />
          {children}
          <ToastContainer />
        </BrowserRouter>
      </ModalProvider>
    </ListProvider>
  );
};

export default AppProvider;
