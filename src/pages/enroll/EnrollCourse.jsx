import React, { useEffect } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Toolbar,
  Typography,
  Link,
} from "@mui/material";
import { Box } from "@mui/system";
import { useHistory, useParams } from "react-router";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { getCourse } from "../../store/action";
import { useSelector } from "react-redux";

const drawerWidth = 240;

const EnrollCourse = () => {
  const history = useHistory();

  const role = localStorage.getItem("role");

  const dispatch = useDispatch();

  const { id } = useParams();

  const userId = localStorage.getItem("id");

  const { course, loadingCourse } = useSelector((state) => state.state);

  useEffect(() => {
    dispatch(getCourse(id));
  }, [dispatch, id]);

  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />

        <Container>
          <Box display="flex" justifyContent="space-between">
            <Button onClick={() => history.goBack()} color="primary">
              Go Back
            </Button>

            {role === "STUDENT" && (
              <Button
                onClick={() => history.push("/enroll/courses/" + userId)}
                color="success"
              >
                All Courses
              </Button>
            )}
          </Box>

          {loadingCourse && (
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

          {!loadingCourse && course && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  sx={{ marginTop: "10px" }}
                  align="center"
                  variant="h5"
                  gutterBottom
                >
                  {course.title}
                </Typography>
                <Box display="flex" justifyContent="center" mb={2}>
                  <ReactPlayer
                    width="100%"
                    height="360px"
                    controls
                    url={course.urlVideo}
                  />
                </Box>
                <Typography variant="body1" gutterBottom>
                  {course.subject}
                </Typography>
                <Typography paragraph variant="body2">
                  {course.description}
                </Typography>

                <Box display="flex" justifyContent="flex-end">
                  <Link href={course.file} download title="materi-pelajaran">
                    Downlaod Materi Pelajaran
                  </Link>
                  {/* <a
                    href={course.file}
                    download
                    title={`materi-pelarajan-${course.title}`}
                  >
                    Download Materi Pelajaran
                  </a> */}
                </Box>
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
};

export default EnrollCourse;
