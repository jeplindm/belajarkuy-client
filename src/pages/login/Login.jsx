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
import { useHistory } from "react-router-dom";
import { Error } from "../../components";
import axios from "../../config/axios";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

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

    const { email, password } = form;

    const payload = {
      UserName: email,
      Password: password,
    };

    setLoading(true);
    try {
      await axios({
        url: "/api/auth/login",
        method: "POST",
        data: payload,
      });

      history.push("/dashboard");
    } catch (e) {
      setError(true);
      setMessage("Email / password salah!");
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

        {error && <Error value={error} message={message} />}

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
                    />
                  </Box>

                  <Box m={1}>
                    {loading ? (
                      <Button
                        fullWidth
                        type="submit"
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
