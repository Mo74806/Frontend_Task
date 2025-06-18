import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoginProvider } from "./context/LoginContext.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <LoginProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </LoginProvider>
    </BrowserRouter>
  </QueryClientProvider>
  // </StrictMode>
);
