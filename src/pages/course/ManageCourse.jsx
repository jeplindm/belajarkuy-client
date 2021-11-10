import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  Pagination,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Delete, Edit, Search } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCourses } from "../../store/action";
import ManageCoursePagination from "./ManageCoursePagination";

const drawerWidth = 240;

const ManageCourse = () => {
  const dispatch = useDispatch();

  const { courses, loadingCourses } = useSelector((state) => state.state);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(courses.length / PER_PAGE);
  const _DATA = ManageCoursePagination(courses, PER_PAGE);

  const handleChangePagination = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />

        <Container>
          <Typography align="center" variant="h5" component="div">
            Manage Courses
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

          {loadingCourses && (
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

          {!loadingCourses && courses && (
            <Grid container spacing={2}>
              {_DATA.currentData().map((course) => (
                <Grid item xs={12}>
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
                            variant="outlined"
                            color="secondary"
                            sx={{ textTransform: "capitalize" }}
                            startIcon={<Edit />}
                          >
                            Edit
                          </Button>
                        </Box>

                        <Box>
                          <Button
                            color="error"
                            sx={{ textTransform: "capitalize" }}
                            startIcon={<Delete />}
                          >
                            Delete
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}

          {!loadingCourses && courses && (
            <Box mt={2} display="flex" justifyContent="center">
              <Pagination
                count={count}
                color="primary"
                page={page}
                variant="outlined"
                shape="circular"
                onChange={handleChangePagination}
              />
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default ManageCourse;
