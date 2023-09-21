import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Auth0Provider
      domain="dev-v3f57yyrtpsegtfr.us.auth0.com"
      clientId="xdZjFC0rRUKDJILiJDpLeSXw8X0tVcrx"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
