import React, { useEffect } from "react";
import { DeleteForever, Search, Visibility } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { getEnrollCourses } from "../../store/action";
import { useHistory } from "react-router";

const drawerWidth = 240;

const StudentCourses = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { enrollCourses, loadingEnrollCourses } = useSelector((state) => state.state);

  useEffect(() => {
    dispatch(getEnrollCourses());
  }, [dispatch]);

  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Container>
          {loadingEnrollCourses && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ height: "80vh" }}
              flexDirection="column"
            >
              <CircularProgress color="primary" />
              <Typography
                sx={{ marginTop: "10px" }}
                variant="h6"
                component="div"
                color="#1876D1"
              >
                Loading Data
              </Typography>
            </Box>
          )}

          {!loadingEnrollCourses && enrollCourses && (
            <Box>
              <Typography align="center" variant="h5" component="div">
                All Courses
              </Typography>

              <TextField
                margin="normal"
                fullWidth
                label="Search"
                type="search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />

              <Grid container spacing={2}>
                {enrollCourses.map((course) => (
                  <Grid item xs={12} key={course.id}>
                    <Paper>
                      <Box my={2} p={2}>
                        <Typography variant="h6" gutterBottom>
                          {course.title}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {course.subject}
                        </Typography>
                        <Typography variant="body2" align="justify" paragraph>
                          {course.description}
                        </Typography>
                        <Box display="flex" justifyContent="flex-end">
                          <Box mr={2}>
                            <Button
                              variant="contained"
                              color="success"
                              sx={{ textTransform: "capitalize" }}
                              startIcon={<Visibility />}
                              onClick={() => history.push("/enroll/course/" + course.id)}
                            >
                              See Detail
                            </Button>
                          </Box>

                          <Box>
                            <Button
                              variant="outlined"
                              color="error"
                              sx={{ textTransform: "capitalize" }}
                              startIcon={<DeleteForever />}
                            >
                              Unroll
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default StudentCourses;
