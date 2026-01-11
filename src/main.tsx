import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext";
import store from "./store";

import "./styles/tailwind.css";
import "./styles/global.css";

import App from "./App";
import "./i18n/i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider>
            <Suspense
              fallback={
                <div className="text-center mt-40 text-lg">Se încarcă...</div>
              }
            >
              <App />
            </Suspense>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);
