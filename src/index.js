import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import { AuthProvider } from "./context/AuthContext.js";

function RootComponent() {
  return React.createElement(AuthProvider, null,
    React.createElement(App)
  );
}

const root = createRoot(document.getElementById("root"));
root.render(React.createElement(RootComponent));


