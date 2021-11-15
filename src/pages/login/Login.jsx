import { WbIncandescent } from "@mui/icons-material";
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
  Link,
  TextField,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Error, Success } from "../../components";
import axios from "../../config/axios";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const history = useHistory();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = form;

    const payload = {
      UserName: email,
      Password: password,
    };

    try {
      const { data } = await axios({
        url: "/api/auth/login",
        method: "POST",
        data: payload,
      });

      if (data.Status !== "00") {
        throw Error();
      } else {
        localStorage.setItem("role", data.Role);
        localStorage.setItem("email", data.Email);
        localStorage.setItem("id", data.ID);

        if (data.Role !== "SPV") {
          history.push("/dashboard");
        } else history.push("/analytics");
      }
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: true });
      dispatch({ type: "SET_ERROR_MESSAGE", payload: "Email / password salah" });
    } finally {
      setLoading(false);
      setForm({
        email: "",
        password: "",
      });
    }
  };
  return (
    <>
      <Container disableGutters={true} maxWidth={false}>
        <CssBaseline />
        <Success />
        <Error />

        <Grid container sx={{ backgroundColor: "#FFFF" }}>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={4}
              sx={{ height: "100vh" }}
            >
              <Box
                p={4}
                sx={{ backgroundColor: "#FFFF" }}
                border={1}
                borderRadius={6}
                borderColor="#ECECEC"
              >
                <form onSubmit={handleSubmit}>
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
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />

                    <TextField
                      color="primary"
                      fullWidth
                      variant="outlined"
                      type="password"
                      margin="normal"
                      placeholder="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </Box>

                  <Box m={1}>
                    {loading ? (
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ textTransform: "capitalize", marginBottom: "1rem" }}
                      >
                        <CircularProgress size={20} color="inherit" />
                      </Button>
                    ) : (
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
                    )}
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
        </Grid>
      </Container>
    </>
  );
};

export default Login;
