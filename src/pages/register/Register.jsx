import { WbIncandescent } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import axios from "../../config/axios";
import { Success, Error } from "../../components";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, phone, password } = form;

    const payload = {
      UserName: email,
      Password: password,
      NoHp: phone,
    };

    try {
      setLoading(true);

      const { data } = await axios({
        url: "/api/auth/regis",
        method: "POST",
        data: payload,
      });

      if (data.Status !== "00") {
        throw Error();
      } else {
        setSuccess(true);
        setMessage("User berhasil dibuat");
      }
    } catch (e) {
      setError(true);
      setMessage("User gagal dibuat");
    } finally {
      setLoading(false);
      setForm({
        email: "",
        phone: "",
        password: "",
      });
    }
  };

  return (
    <>
      <Container disableGutters={true} maxWidth={false}>
        <CssBaseline />

        {success && <Success value={success} message={message} />}

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
                sx={{ backgroundColor: "#FFFF" }}
                p={4}
                border={1}
                borderRadius={6}
                borderColor="#ECECEC"
              >
                <form onSubmit={handleSubmit}>
                  <Typography align="center" variant="h5" component="div">
                    Gabung Sekarang Juga!
                  </Typography>

                  <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
                    <WbIncandescent
                      fontSize="large"
                      sx={{ color: "#1876D1", marginRight: "5px" }}
                    />
                    <Typography variant="h6" align="center">
                      Belajar Yuk
                    </Typography>
                  </Box>

                  <TextField
                    required
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
                    required
                    color="primary"
                    fullWidth
                    variant="outlined"
                    type="text"
                    margin="normal"
                    placeholder="+62 815 0909 2109"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />

                  <TextField
                    required
                    color="primary"
                    fullWidth
                    variant="outlined"
                    type="password"
                    margin="normal"
                    placeholder="******"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />

                  {loading ? (
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ textTransform: "capitalize", marginY: "1rem" }}
                    >
                      <CircularProgress size={20} color="inherit" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ textTransform: "capitalize", marginY: "1rem" }}
                    >
                      Daftar
                    </Button>
                  )}

                  <Typography variant="body1" align="center">
                    Sudah punya akun?{" "}
                    <Link href="/login" color="primary">
                      Masuk
                    </Link>
                  </Typography>
                </form>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Register;
