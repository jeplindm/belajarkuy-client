import React from "react";
import { Container, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { HomeAdmin, HomeStudent } from "../../components";

const drawerWidth = 240;

const Home = () => {
  const role = localStorage.getItem("role");

  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />

        <Container>{role === "ADMIN" ? <HomeAdmin /> : <HomeStudent />}</Container>
      </Box>
    </>
  );
};

export default Home;
