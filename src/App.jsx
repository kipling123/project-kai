import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";

// PAGES
import Home from "./pages/Home";
import Machine from "./pages/Machine";
import Material from "./pages/Material";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Warehouse from "./pages/Warehouse";

// LAYOUT
import Frame from "./components/Frame";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#FF8C00",
    },
    // tambahkan palette lainnya
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Frame>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/machine" element={<Machine />} />
            <Route path="/material" element={<Material />} />
            <Route path="/products" element={<Products />} />
            <Route path="/warehouse" element={<Warehouse />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Frame>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;