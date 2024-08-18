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
import {
  ExpandLess,
  ExpandMore,
  Logout,
  PersonAdd,
  Settings,
} from "@mui/icons-material";

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
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
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
            <Typography variant="h6" noWrap component="div">
              Rull Corp
            </Typography>
            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleOpenProfile}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
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
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Link to={"/"}>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  color: `${location.pathname === "/" ? "blue" : "black"}`,
                  backgroundColor: `${
                    location.pathname === "/" ? "#dbdbdb" : ""
                  }`,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: `${location.pathname === "/" ? "blue" : "black"}`,
                  }}
                >
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText>Home</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <Link to={"/warehouse"}>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  color: `${
                    location.pathname === "/warehouse" ? "blue" : "black"
                  }`,
                  backgroundColor: `${
                    location.pathname === "/warehouse" ? "#dbdbdb" : ""
                  }`,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: `${
                      location.pathname === "/warehouse" ? "blue" : "black"
                    }`,
                  }}
                >
                  <FactoryIcon />
                </ListItemIcon>
                <ListItemText>Warehouse</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <Link to={"/products"}>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  color: `${
                    location.pathname === "/products" ? "blue" : "black"
                  }`,
                  backgroundColor: `${
                    location.pathname === "/products" ? "#dbdbdb" : ""
                  }`,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: `${
                      location.pathname === "/products" ? "blue" : "black"
                    }`,
                  }}
                >
                  <ProductionQuantityLimitsIcon />
                </ListItemIcon>
                <ListItemText>Products</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <ListItemButton onClick={handleClick} sx={{ color: "black" }}>
            <ListItemIcon sx={{ color: "black" }}>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Inventory" />
            {inventory ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Divider />
          <Collapse in={inventory} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to={"/machine"}>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      color: `${
                        location.pathname === "/machine" ? "blue" : "black"
                      }`,
                      backgroundColor: `${
                        location.pathname === "/machine" ? "#dbdbdb" : ""
                      }`,
                      paddingLeft: 4,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: `${
                          location.pathname === "/machine" ? "blue" : "black"
                        }`,
                      }}
                    >
                      <AdfScannerIcon />
                    </ListItemIcon>
                    <ListItemText>Machine</ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
              <Divider />
              <Link to={"/material"}>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      color: `${
                        location.pathname === "/material" ? "blue" : "black"
                      }`,
                      backgroundColor: `${
                        location.pathname === "/material" ? "#dbdbdb" : ""
                      }`,
                      paddingLeft: 4,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: `${
                          location.pathname === "/material" ? "blue" : "black"
                        }`,
                      }}
                    >
                      <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText>Material</ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
              <Divider />
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
