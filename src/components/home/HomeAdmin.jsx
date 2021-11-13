import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCourses, searchCoursesByTitle } from "../../store/action";
import { PagePagination } from "..";
import { Box } from "@mui/system";
import {
  Button,
  Card,
  CardActions,
  CircularProgress,
  Grid,
  Pagination,
  Typography,
  CardContent,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useHistory } from "react-router";
import { Search, Refresh } from "@mui/icons-material";

const HomeAdmin = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { courses, loadingCourses } = useSelector((state) => state.state);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  let [page, setPage] = useState(1);
  const PER_PAGE = 9;

  const count = Math.ceil(courses.length / PER_PAGE);
  const _DATA = PagePagination(courses, PER_PAGE);

  const handleChangePagination = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const [searchTitle, setSearchTitle] = useState("");

  const handleSearchTitle = (e) => {
    setSearchTitle(e.target.value);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();

    dispatch(searchCoursesByTitle(searchTitle));

    setSearchTitle("");
  };

  const handleRefresh = (e) => {
    e.preventDefault();

    dispatch(getCourses());
  };

  return (
    <>
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
          <Grid item xs={12}>
            <Box p={2}>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  onClick={handleRefresh}
                  startIcon={<Refresh />}
                  variant="outlined"
                  color="primary"
                >
                  Refresh
                </Button>
              </Box>

              <form onSubmit={handleSubmitSearch}>
                <TextField
                  fullWidth
                  value={searchTitle}
                  onChange={handleSearchTitle}
                  variant="standard"
                  type="search"
                  label="Search course"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
            </Box>
          </Grid>

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
                  {/* {role === "STUDENT" && (
                        <CardActions>
                          {loadingCreateEnrollCourse ? (
                            <Button
                              onClick={() => handleEnrollCourse(course)}
                              fullWidth
                              color="success"
                              variant="contained"
                            >
                              <CircularProgress size={20} color="inherit" />
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleEnrollCourse(course)}
                              fullWidth
                              color="success"
                              variant="contained"
                            >
                              Enroll
                            </Button>
                          )}
                        </CardActions>
                      )} */}

                  <CardActions>
                    <Button
                      onClick={() => history.push("/enroll/course/" + course.id)}
                      fullWidth
                      color="success"
                      variant="contained"
                    >
                      See Details
                    </Button>
                  </CardActions>
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
    </>
  );
};

export default HomeAdmin;
