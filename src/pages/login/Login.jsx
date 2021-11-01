import { WbIncandescent } from "@mui/icons-material";
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
  Link,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Login = () => {
  return (
    <>
      <Container disableGutters={true} maxWidth={false}>
        <CssBaseline />

        <Grid container sx={{ backgroundColor: "#FFFF" }}>
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={4}
              sx={{ height: "100vh", backgroundColor: "#1876D1" }}
            >
              <Box p={4} sx={{ backgroundColor: "#FFFF" }} borderRadius={6}>
                <form>
                  <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
                    <WbIncandescent
                      fontSize="large"
                      sx={{ color: "#1876D1", marginRight: "5px" }}
                    />
                    <Typography variant="h6" align="center">
                      Belajar Yuk
                    </Typography>
                  </Box>

                  <Box m={1}>
                    <TextField
                      color="primary"
                      fullWidth
                      variant="outlined"
                      type="email"
                      margin="normal"
                      placeholder="example@gmail.com"
                    />

                    <TextField
                      color="primary"
                      fullWidth
                      variant="outlined"
                      type="password"
                      margin="normal"
                      placeholder="password"
                    />
                  </Box>

                  <Box m={1}>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ textTransform: "capitalize", marginBottom: "1rem" }}
                    >
                      Masuk
                    </Button>
                    <Typography variant="body1" align="center">
                      Belum punya akun?{" "}
                      <Link href="/register" color="primary">
                        Daftar
                      </Link>
                    </Typography>
                  </Box>
                </form>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ height: "100vh" }}
            >
              <img
                src="/undraw_knowledge.png"
                alt="registerImage"
                style={{ width: "100%" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Login;
