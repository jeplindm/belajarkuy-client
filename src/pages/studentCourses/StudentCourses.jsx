import React, { useEffect, useState } from "react";
import { DeleteForever, Refresh, Search, Visibility } from "@mui/icons-material";
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
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  getEnrollCourses,
  removeEnrollCourse,
  searchEnrollCourseByTitle,
} from "../../store/action";
import { useHistory } from "react-router";
import { Success, Error } from "../../components";
import { PagePagination } from "../../components";
import { ascending, descending } from "../../helpers/sort";

const drawerWidth = 240;

const UnrollCourse = ({ course }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleUnenrollCourse = () => {
    const userId = localStorage.getItem("id");

    const payload = {
      idCourse: +course.id,
      usrid: +userId,
      flag: "unenroll",
    };

    dispatch(removeEnrollCourse(payload));
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="outlined"
        color="error"
        sx={{ textTransform: "capitalize" }}
        startIcon={<DeleteForever />}
      >
        Unroll
      </Button>

      <Dialog
        maxWidth="md"
        open={open}
        keepMounted
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText
            style={{
              fontSize: 12,
              fontFamily: "sans-serif",
              color: "#4E5D78",
              textAlign: "center",
              fontWeight: 500,
            }}
            id="alert-dialog-slide-description"
          >
            Unroll Course
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogContentText
            style={{
              fontSize: 14,
              fontFamily: "sans-serif",
              color: "#4E5D78",
              textAlign: "center",
            }}
            id="alert-dialog-slide-description"
          >
            Apakah anda yakin untuk menghapus course ini dari list?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color="error" variant="outlined" fullWidth onClick={handleClickClose}>
            Cancel
          </Button>

          <Button
            onClick={handleUnenrollCourse}
            color="primary"
            variant="contained"
            fullWidth
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const StudentCourses = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { enrollCourses, loadingEnrollCourses } = useSelector((state) => state.state);

  useEffect(() => {
    dispatch(getEnrollCourses());
  }, [dispatch]);

  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(enrollCourses.length / PER_PAGE);
  const _DATA = PagePagination(enrollCourses, PER_PAGE);

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

    dispatch(searchEnrollCourseByTitle(searchTitle));

    setSearchTitle("");
  };

  const handleRefresh = (e) => {
    e.preventDefault();

    dispatch(getEnrollCourses());
    setSortDate("Oldest");
    setSearchTitle("");
  };

  const [sortDate, setSortDate] = useState("Oldest");

  const handleSortDate = (e) => {
    setSortDate(e.target.value);

    let data;

    if (e.target.value === "Newest") {
      data = ascending(enrollCourses, "id");
    } else {
      data = descending(enrollCourses, "id");
    }

    dispatch({ type: "SET_ENROLL_COURSES", payload: data });
  };

  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Success />
        <Error />

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
              <Typography align="center" variant="h5" component="div" gutterBottom>
                All Courses
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    onClick={handleRefresh}
                    startIcon={<Refresh />}
                    variant="outlined"
                    color="primary"
                  >
                    Refresh
                  </Button>
                </Grid>

                <Grid item xs={6}>
                  <form onSubmit={handleSubmitSearch}>
                    <TextField
                      value={searchTitle}
                      onChange={handleSearchTitle}
                      fullWidth
                      margin="normal"
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
                  </form>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    value={sortDate}
                    onChange={handleSortDate}
                    fullWidth
                    select
                    margin="normal"
                    SelectProps={{
                      native: true,
                    }}
                    required
                  >
                    <option value="Oldest">Oldest</option>
                    <option value="Newest">Newest</option>
                  </TextField>
                </Grid>

                {_DATA.currentData().map((course) => (
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
                            <UnrollCourse course={course} />
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {!loadingEnrollCourses && enrollCourses && (
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

export default StudentCourses;
