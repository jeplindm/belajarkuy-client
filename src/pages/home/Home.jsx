import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../store/action";
import HomePagination from "./HomePagination";
import { useHistory } from "react-router";

const drawerWidth = 240;

const Home = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { courses, loadingCourses } = useSelector((state) => state.state);

  const role = localStorage.getItem("role");

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  let [page, setPage] = useState(1);
  const PER_PAGE = 9;

  const count = Math.ceil(courses.length / PER_PAGE);
  const _DATA = HomePagination(courses, PER_PAGE);

  const handleChangePagination = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleEnrollCourse = (id) => {
    history.push("/enroll/course/" + id);
  };

  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />

        <Container>
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
                <Grid item xs={12} md={4} key={course.id}>
                  <Box p={2}>
                    <Card>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {course.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {course.subject}
                        </Typography>
                        <Typography paragraph variant="body2" color="text.secondary">
                          {course.description}
                        </Typography>
                      </CardContent>
                      {role === "STUDENT" && (
                        <CardActions>
                          <Button
                            onClick={() => handleEnrollCourse(course.id)}
                            fullWidth
                            color="success"
                            variant="contained"
                          >
                            Enroll
                          </Button>
                        </CardActions>
                      )}
                    </Card>
                  </Box>
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

export default Home;
