import { Refresh, Search } from "@mui/icons-material";
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  InputAdornment,
  Pagination,
  TextField,
  Typography,
  CardContent,
  CardActions,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { PagePagination } from "..";
import axios from "../../config/axios";
import { filterDuplicateData } from "../../helpers/filterDuplicateData";
import Course from "../../models/CourseModel";
import { createEnrollCourse, searchCoursesByTitle } from "../../store/action";

const HomeStudent = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { loadingCreateEnrollCourse } = useSelector((state) => state.state);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("id");

  const _isMounted = useRef(true);

  let [page, setPage] = useState(1);
  const PER_PAGE = 9;

  const count = Math.ceil(courses.length / PER_PAGE);
  const _DATA = PagePagination(courses, PER_PAGE);

  const handleChangePagination = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const getCourses = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios({
        method: "GET",
        url: "/api/course/getall/student",
      });

      const response = await axios({
        url: "/api/course/allenrolled/" + userId,
        method: "GET",
      });

      const firstList = data.Data;

      const secondList = response.data.Data;

      let temps = [];

      const listOfCourses = filterDuplicateData(firstList, secondList);
      listOfCourses.map((item) => temps.push(new Course(item)));

      setCourses(listOfCourses);
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: true });
      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload:
          "Internal server error. Please check your connection or try to login again!",
      });
    } finally {
      setLoading(false);
    }
  }, [dispatch, userId]);

  useEffect(() => {
    getCourses();

    return () => {
      _isMounted.current = false;
    };
  }, [getCourses]);

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

  const handleEnrollCourse = (course) => {
    const userId = localStorage.getItem("id");

    const payload = {
      data: {
        idCourse: course.id,
        usrid: userId,
        flag: "enroll",
      },
    };

    dispatch(createEnrollCourse(payload));

    history.push("/enroll/courses/" + userId);
  };

  return (
    <>
      {loading && (
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

      {!loading && courses && (
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
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && courses && (
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

export default HomeStudent;
