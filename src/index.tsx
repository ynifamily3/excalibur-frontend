import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./index.css";
import App from "./App";

import { UserStateContextProvider } from "./contexts/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <UserStateContextProvider>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </UserStateContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
