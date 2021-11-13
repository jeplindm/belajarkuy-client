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
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Box } from "@mui/system";
import { Refresh, Search } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteCourse, getCourses, searchCoursesByTitle } from "../../store/action";
import { useHistory } from "react-router";
import { EditCourse, Error, PagePagination, Success } from "../../components";

const drawerWidth = 240;

const DeleteCourse = ({ course }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleRemove = (e) => {
    e.preventDefault();

    let payload;

    if (course.status === "active") {
      payload = {
        id: course.id,
        title: course.title,
        description: course.description,
        subject: course.subject,
        status: "inactive",
        file: course.file,
        urlVideo: course.urlVideo,
      };
    } else {
      payload = {
        id: course.id,
        title: course.title,
        description: course.description,
        subject: course.subject,
        status: "active",
        file: course.file,
        urlVideo: course.urlVideo,
      };
    }

    dispatch(deleteCourse(payload));
    setOpen(false);
  };

  return (
    <>
      {course.status === "active" ? (
        <Button
          onClick={handleClickOpen}
          color="error"
          sx={{ textTransform: "capitalize" }}
        >
          Inactive
        </Button>
      ) : (
        <Button
          onClick={handleClickOpen}
          color="success"
          sx={{ textTransform: "capitalize" }}
        >
          Active
        </Button>
      )}

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
            ACTIVATION COURSE
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
            Apakah anda yakin untuk mengupdate course ini dari list?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color="error" variant="outlined" fullWidth onClick={handleClickClose}>
            Cancel
          </Button>

          <Button onClick={handleRemove} color="primary" variant="contained" fullWidth>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const ManageCourse = () => {
  const dispatch = useDispatch();

  const { courses, loadingCourses } = useSelector((state) => state.state);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(courses.length / PER_PAGE);
  const _DATA = PagePagination(courses, PER_PAGE);

  const handleChangePagination = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const history = useHistory();

  const handleRefresh = (e) => {
    e.preventDefault();

    dispatch(getCourses());
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
          <Box p={2}>
            <Typography align="center" variant="h5" component="div" gutterBottom>
              Manage Courses
            </Typography>

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
                      margin="dense"
                      fullWidth
                      value={searchTitle}
                      onChange={handleSearchTitle}
                      variant="standard"
                      type="search"
                      label="Search course"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </form>
                </Grid>

                {_DATA.currentData().map((course) => (
                  <Grid item xs={12} key={course.id}>
                    <Paper sx={{ width: "100%" }}>
                      <Box my={2} p={2}>
                        <Typography
                          variant="body2"
                          align="justify"
                          sx={{
                            textTransform: "capitalize",
                            color: course.status === "active" ? "green" : "red",
                            fontWeight: 600,
                          }}
                        >
                          {course.status}
                        </Typography>
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
                          <Button
                            variant="contained"
                            color="success"
                            sx={{ textTransform: "capitalize" }}
                            onClick={() => history.push("/enroll/course/" + course.id)}
                          >
                            Details
                          </Button>

                          <Box mx={2}>
                            <EditCourse course={course} />
                          </Box>

                          <Box>
                            <DeleteCourse course={course} />
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
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ManageCourse;
