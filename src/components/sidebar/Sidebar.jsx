import React, { useState } from "react";
import {
  AccountCircle,
  Analytics,
  Apps,
  Book,
  BookmarkAdd,
  BookOnline,
  ExpandLess,
  ExpandMore,
  Logout,
  Menu,
  WbIncandescent,
} from "@mui/icons-material";
import {
  Divider,
  List,
  Toolbar,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  Typography,
  Drawer,
  CssBaseline,
  AppBar,
  Collapse,
} from "@mui/material";
import PropTypes from "prop-types";
import { useLocation, withRouter } from "react-router";
import axios from "../../config/axios";
import { useDispatch } from "react-redux";

const drawerWidth = 240;

const Sidebar = (props) => {
  const { window, history } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const dispatch = useDispatch();

  const [openProfile, setOpenProfile] = useState(false);

  const [openCourse, setOpenCourse] = useState(false);

  const { pathname } = useLocation();

  const role = localStorage.getItem("role");

  const email = localStorage.getItem("email");

  const userId = localStorage.getItem("id");

  const username = email.substring(0, email.lastIndexOf("@"));

  const handleClickProfile = () => {
    setOpenProfile(!openProfile);
  };

  const handleClickCourse = () => {
    setOpenCourse(!openCourse);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();

    const email = localStorage.getItem("email");

    axios({
      method: "POST",
      url: "/api/auth/logout",
      data: { UserName: email },
    })
      .then(({ data }) => {
        dispatch({ type: "SET_SUCCESS", payload: true });
        dispatch({ type: "SET_SUCCESS_MESSAGE", payload: "Logout berhasil" });
      })
      .catch((e) => console.log(e, "ERROR"));

    localStorage.clear();

    history.push("/");
  };

  const drawer = (
    <div>
      <Box display="flex" alignItems="center" justifyContent="center" p={2}>
        <WbIncandescent sx={{ marginRight: "5px", color: "#1876D1" }} />
        <Typography variant="h6">Belajar Yuk</Typography>
      </Box>
      <Divider />
      <List>
        <ListItem
          button
          sx={{
            backgroundColor: pathname === "/dashboard" ? "#1876D1" : null,
            color: pathname === "/dashboard" ? "#FFFF" : null,
          }}
          onClick={() => history.push("/dashboard")}
        >
          <ListItemIcon
            sx={{
              color: pathname === "/dashboard" ? "#FFFF" : null,
            }}
          >
            <Apps />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        {role === "ADMIN" && (
          <ListItem
            button
            sx={{
              backgroundColor: pathname === "/analytics" ? "#1876D1" : null,
              color: pathname === "/analytics" ? "#FFFF" : null,
            }}
            onClick={() => history.push("/analytics")}
          >
            <ListItemIcon
              sx={{
                color: pathname === "/analytics" ? "#FFFF" : null,
              }}
            >
              <Analytics />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItem>
        )}

        {role === "STUDENT" && (
          <ListItem
            button
            sx={{
              backgroundColor:
                pathname === "/enroll/courses/" + userId ? "#1876D1" : null,
              color: pathname === "/enroll/courses/" + userId ? "#FFFF" : null,
            }}
            onClick={() => history.push("/enroll/courses/" + userId)}
          >
            <ListItemIcon
              sx={{
                color: pathname === "/enroll/courses/" + userId ? "#FFFF" : null,
              }}
            >
              <Book />
            </ListItemIcon>
            <ListItemText primary="Student Courses" />
          </ListItem>
        )}

        {role === "ADMIN" && (
          <ListItem
            button
            onClick={handleClickCourse}
            sx={{
              backgroundColor:
                pathname === "/post/course" ||
                pathname === "/post/assessment" ||
                pathname === "/manage/courses"
                  ? "#1876D1"
                  : null,
              color:
                pathname === "/post/course" ||
                pathname === "/post/assessment" ||
                pathname === "/manage/courses"
                  ? "#FFFF"
                  : null,
            }}
          >
            <ListItemIcon
              sx={{
                color:
                  pathname === "/post/course" ||
                  pathname === "/post/assessment" ||
                  pathname === "/manage/courses"
                    ? "#FFFF"
                    : null,
              }}
            >
              <BookOnline />
            </ListItemIcon>
            <ListItemText primary="Course" />
            {openCourse ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        )}

        <Collapse in={openCourse} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              sx={{
                pl: 4,
                backgroundColor: pathname === "/post/course" ? "#1876D1" : null,
                color: pathname === "/post/course" ? "#FFFF" : null,
              }}
              onClick={() => history.push("/post/course")}
            >
              <ListItemIcon
                sx={{
                  color: pathname === "/post/course" ? "#FFFF" : null,
                }}
              >
                <BookmarkAdd />
              </ListItemIcon>
              <ListItemText primary="Upload Course" />
            </ListItem>

            <ListItem
              button
              sx={{
                pl: 4,
                backgroundColor: pathname === "/post/assessment" ? "#1876D1" : null,
                color: pathname === "/post/assessment" ? "#FFFF" : null,
              }}
              onClick={() => history.push("/post/assessment")}
            >
              <ListItemIcon
                sx={{
                  color: pathname === "/post/assessment" ? "#FFFF" : null,
                }}
              >
                <BookmarkAdd />
              </ListItemIcon>
              <ListItemText primary="Upload Assessment" />
            </ListItem>

            <ListItem
              onClick={() => history.push("/manage/courses")}
              button
              sx={{
                pl: 4,
                backgroundColor: pathname === "/manage/courses" ? "#1876D1" : null,
                color: pathname === "/manage/courses" ? "#FFFF" : null,
              }}
            >
              <ListItemIcon
                sx={{
                  color: pathname === "/manage/courses" ? "#FFFF" : null,
                }}
              >
                <Book />
              </ListItemIcon>
              <ListItemText primary="Manage Courses" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={handleClickProfile}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Profile" />
          {openProfile ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openProfile} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} onClick={handleLogout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard - {username}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default withRouter(Sidebar);
