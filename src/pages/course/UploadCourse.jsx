import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../../store/action";
import { Error, Success } from "../../components";

const drawerWidth = 240;

const UploadCourse = () => {
  const dispatch = useDispatch();
  const { loadingCreateCourse } = useSelector((state) => state.state);

  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    subject: "",
    urlVideo: "",
    file: "",
  });

  const handleChange = (e) => {
    setCourseForm({ ...courseForm, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(createCourse(courseForm));

    setCourseForm({
      title: "",
      description: "",
      subject: "",
      urlVideo: "",
      file: "",
    });
  };

  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />

        <Error />
        <Success />

        <Typography align="center" variant="h5" component="div">
          Upload Course
        </Typography>

        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <form onSubmit={handleFormSubmit}>
                <Box p={2}>
                  <FormControl variant="standard" fullWidth margin="normal">
                    <InputLabel htmlFor="component-simple">Judul Materi</InputLabel>
                    <Input
                      value={courseForm.title}
                      onChange={handleChange}
                      name="title"
                      id="form-title"
                    />
                  </FormControl>

                  <FormControl variant="standard" fullWidth margin="normal">
                    <InputLabel htmlFor="component-simple">Subjek</InputLabel>
                    <Select
                      value={courseForm.subject}
                      onChange={handleChange}
                      name="subject"
                      id="form-subject"
                      required
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Math">Matematika</MenuItem>
                      <MenuItem value="Fisika">Fisika</MenuItem>
                      <MenuItem value="Kimia">Kimia</MenuItem>
                      <MenuItem value="Biology">Biologi</MenuItem>
                      <MenuItem value="English">English</MenuItem>
                      <MenuItem value="Geography">Geografi</MenuItem>
                      <MenuItem value="Economy">Ekonomi</MenuItem>
                      <MenuItem value="Information Technology">
                        Teknologi Informasi
                      </MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl variant="standard" fullWidth margin="normal">
                    <InputLabel htmlFor="component-simple">Deskripsi</InputLabel>
                    <Input
                      value={courseForm.description}
                      onChange={handleChange}
                      name="description"
                      id="form-description"
                    />
                  </FormControl>

                  <FormControl variant="standard" fullWidth margin="normal">
                    <InputLabel htmlFor="component-simple">Link Video</InputLabel>
                    <Input
                      value={courseForm.urlVideo}
                      onChange={handleChange}
                      name="urlVideo"
                      id="form-urlVideo"
                    />
                  </FormControl>

                  <Box my={2}>
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) =>
                        setCourseForm({ ...courseForm, file: base64 })
                      }
                    />
                  </Box>

                  <Box my={2}>
                    {loadingCreateCourse ? (
                      <Button type="submit" variant="contained" size="large" fullWidth>
                        <CircularProgress size={20} color="inherit" />
                      </Button>
                    ) : (
                      <Button type="submit" variant="contained" size="large" fullWidth>
                        Upload
                      </Button>
                    )}
                  </Box>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default UploadCourse;
