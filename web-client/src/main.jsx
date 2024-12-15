import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AppBeta from "./AppBeta.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/poppins";
import { BrowserRouter, Route, Routes } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/beta" element={<AppBeta />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
