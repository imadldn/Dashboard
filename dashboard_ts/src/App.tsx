import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/navbar";
import Dashboard from "./pages/dashboard";
import ReturnOnInvestment from "./pages/returnOnInvestment";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []); //The [] arg is there in order to make sure useMemo does this only once.
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/returnoninvestment"
                element={<ReturnOnInvestment />}
              />
              <Route path="/postcode/:postcode" element={<Dashboard />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
