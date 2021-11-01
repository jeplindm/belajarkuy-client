import { Box } from "@mui/system";
import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { WbIncandescent } from "@mui/icons-material";
import { useHistory } from "react-router";

const LandingPage = () => {
  const history = useHistory();

  return (
    <>
      <Container disableGutters={true} maxWidth={false}>
        <CssBaseline />
        <Grid container sx={{ backgroundColor: "#FFFF" }}>
          <Grid item xs={12}>
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar variant="regular">
                  <WbIncandescent sx={{ marginRight: "5px" }} />
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Belajar Yuk
                  </Typography>
                  <Button
                    onClick={() => history.push("/")}
                    color="inherit"
                    sx={{ textTransform: "capitalize" }}
                  >
                    Home
                  </Button>

                  <Button
                    onClick={() => history.push("/login")}
                    color="inherit"
                    sx={{ textTransform: "capitalize" }}
                  >
                    Masuk
                  </Button>

                  <Button
                    onClick={() => history.push("/register")}
                    color="inherit"
                    sx={{ textTransform: "capitalize" }}
                  >
                    Daftar
                  </Button>
                </Toolbar>
              </AppBar>
            </Box>
          </Grid>

          <Grid item xs={12} md={12}>
            <img src="/banner.png" alt="banner" style={{ width: "100%" }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <img
              src="/undraw_studying.png"
              alt="undraw-studying"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="center" alignItems="center" height={500}>
              <Box p={4}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <WbIncandescent
                    fontSize="large"
                    sx={{ color: "#1876D1", marginTop: "1rem" }}
                  />
                </Box>

                <Box mt={4} mb={4}>
                  <Typography variant="h6" align="justify">
                    <span style={{ color: "#1876D1" }}>Belajar Yuk</span> merupakan sebuah
                    platform online untuk membantu para siswa dalam belajar. Kami
                    memberikan pelajaran dan soal latihan dalam bentuk video dan juga
                    quiz.
                  </Typography>
                </Box>

                <Box mt={4} mb={4}>
                  <Typography variant="h6" align="justify">
                    <span style={{ color: "#1876D1" }}>Belajar Yuk</span> memiliki para
                    mentor terbaik dibidangnya dan kurikulum berkualitas yang membantu
                    para siswa dalam menyelesaikan tantangan di dalam pelajaran.
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="center">
                  <Button
                    sx={{ display: "flex", justifySelf: "center" }}
                    variant="contained"
                    size="large"
                    onClick={() => history.push("/register")}
                  >
                    Gabung Sekarang
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box p={2} mt={6}>
              <Typography sx={{ color: "#1876D1" }} variant="h3" align="center">
                Mata Pelajaran
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box p={4}>
              <img
                style={{ width: "100%", height: 300 }}
                src="/undraw_mathematics.png"
                alt="mathematics"
              />
              <Typography align="center" variant="h6">
                Matematika
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3} height={500}>
            <Box p={4}>
              <img
                style={{ width: "100%", height: 300 }}
                src="/undraw_physic.png"
                alt="mathematics"
              />
              <Typography align="center" variant="h6">
                Fisika
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box p={4}>
              <img
                style={{ width: "100%", height: 300 }}
                src="/undraw_chemistry.png"
                alt="mathematics"
              />
              <Typography align="center" variant="h6">
                Kimia
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box p={4}>
              <img
                style={{ width: "100%", height: 300 }}
                src="/undraw_biology.png"
                alt="mathematics"
              />
              <Typography align="center" variant="h6">
                Biologi
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default LandingPage;
