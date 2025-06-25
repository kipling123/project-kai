import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import FactoryIcon from "@mui/icons-material/Factory";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import InventoryIcon from "@mui/icons-material/Inventory";
import AdfScannerIcon from "@mui/icons-material/AdfScanner";
import CategoryIcon from "@mui/icons-material/Category";
import { Link, useLocation } from "react-router-dom";
import { Avatar, Collapse, Menu, MenuItem, Tooltip } from "@mui/material";
import { ExpandLess, ExpandMore, Logout, Settings } from "@mui/icons-material";
import kaiLogo from "../assets/pt-kai-kereta-api-indonesia-2020-seeklogo.png";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  background: "linear-gradient(to right, #FF8C00, #FFA500)",
  boxShadow: "0 4px 12px rgba(255, 140, 0, 0.4)",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

export default function Frame({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const location = useLocation();
  const [inventory, setInventory] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const profile = Boolean(anchorEl);
  const handleOpenProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    setInventory(!inventory);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <div className="flex flex-row items-center justify-between w-full">
            <Typography variant="h6" noWrap component="div" sx={{ color: "#fff", fontWeight: 'bold' }}>
              PT KERETA API BALAI YASA & LAA
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              gap: '20px',
              marginRight: '20px',
              '& .menu-item': {
                color: 'white',
                fontWeight: '500',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                padding: '5px 10px',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                }
              }
            }}>
              <Link to="/" className="menu-item">Home</Link>
              <Link to="/machine" className="menu-item">Machine</Link>
              <Link to="/material" className="menu-item">Material</Link>
              <Link to="/products" className="menu-item">Products</Link>
              <Link to="/warehouse" className="menu-item">Warehouse</Link>
              <Link to="/profile" className="menu-item">Profile</Link>
            </Box>

            <React.Fragment>
              <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleOpenProfile}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        background: "linear-gradient(to right, #FF8C00, #FFA500)",
                        boxShadow: "0 0 8px rgba(255, 140, 0, 0.8)",
                        color: "white",
                      }}
                    >
                      M
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={profile}
                onClose={handleCloseProfile}
                onClick={handleCloseProfile}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <Link to={"/profile"}>
                  <MenuItem onClick={handleCloseProfile}>
                    <Avatar /> Profile
                  </MenuItem>
                </Link>
                <Divider />
                <MenuItem onClick={handleCloseProfile}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleCloseProfile}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </React.Fragment>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "rgba(30, 30, 30, 0.9)",
            backdropFilter: "blur(8px)",
            borderRight: "1px solid rgba(255,255,255,0.1)",
            color: "#fff",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <img src={kaiLogo} alt="KAI Logo" style={{ height: 40, marginLeft: 10 }} />
          <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
        <List>
          {/* Hanya menyisakan menu Home di dashboard utama */}
          <Link to="/" key="/">
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  color: location.pathname === "/" ? "#FFA500" : "white",
                  backgroundColor: location.pathname === "/" ? "rgba(255, 165, 0, 0.1)" : "transparent",
                  borderLeft: location.pathname === "/" ? "4px solid #FFA500" : "4px solid transparent",
                  "&:hover": {
                    backgroundColor: "rgba(255, 165, 0, 0.08)",
                    borderLeft: "4px solid #FFA500",
                  },
                  transition: "all 0.3s ease-in-out",
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText>Home</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
          
          {/* Menu Inventory yang diperluas */}
          <ListItemButton 
            onClick={handleClick} 
            sx={{ 
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 165, 0, 0.08)",
              }
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Inventory" />
            {inventory ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={inventory} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {[
                { to: "/warehouse", icon: <FactoryIcon />, label: "Warehause" },
                { to: "/products", icon: <ProductionQuantityLimitsIcon />, label: "Products" },
                { to: "/machine", icon: <AdfScannerIcon />, label: "Machine" },
                { to: "/material", icon: <CategoryIcon />, label: "Material" },
              ].map((item) => (
                <Link to={item.to} key={item.to}>
                  <ListItem disablePadding>
                    <ListItemButton
                      sx={{
                        pl: 4,
                        color: location.pathname === item.to ? "#FFA500" : "white",
                        backgroundColor: location.pathname === item.to ? "rgba(255, 165, 0, 0.1)" : "transparent",
                        borderLeft: location.pathname === item.to ? "4px solid #FFA500" : "4px solid transparent",
                        "&:hover": {
                          backgroundColor: "rgba(255, 165, 0, 0.08)",
                          borderLeft: "4px solid #FFA500",
                        },
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Collapse>
        </List>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}

