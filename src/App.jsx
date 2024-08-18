import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";

// PAGES
import Home from "./pages/Home";
import Machine from "./pages/Machine";

// COMPONENTS
import Frame from "./components/Frame";
import Material from "./pages/Material";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Warehouse from "./pages/Warehouse";

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      palette: {
        red: "#8E0000",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Frame>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/machine" element={<Machine />} />
            <Route path="/material" element={<Material />} />
            <Route path="/products" element={<Products />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/warehouse" element={<Warehouse />} />
          </Routes>
        </Frame>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
