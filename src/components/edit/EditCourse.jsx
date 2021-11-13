import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  DialogContentText,
} from "@mui/material";
import FileBase from "react-file-base64";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { editCourse } from "../../store/action";

const EditCourse = ({ course }) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [courseForm, setCourseForm] = useState({
    id: course.id,
    title: course.title,
    description: course.description,
    subject: course.subject,
    urlVideo: course.urlVideo,
    file: course.file,
    status: "active",
  });

  const handleChange = (e) => {
    setCourseForm({ ...courseForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(editCourse(courseForm));
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        color="secondary"
        sx={{ textTransform: "capitalize" }}
      >
        Edit
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle>Edit Course</DialogTitle>
        <DialogContent>
          <TextField
            value={courseForm.title}
            onChange={handleChange}
            name="title"
            margin="normal"
            id="name"
            label="Title"
            fullWidth
            variant="standard"
          />

          <TextField
            value={courseForm.subject}
            onChange={handleChange}
            name="subject"
            select
            margin="normal"
            label="Subject"
            fullWidth
            variant="standard"
            SelectProps={{
              native: true,
            }}
          >
            <option value="Math">Matematika</option>
            <option value="Physics">Fisika</option>
            <option value="Chemistry">Kimia</option>
            <option value="Biology">Biologi</option>
            <option value="English">English</option>
            <option value="Geography">Geografi</option>
            <option value="Economy">Ekonomi</option>
            <option value="Information Technology">Teknologi Informasi</option>
          </TextField>

          <TextField
            value={courseForm.description}
            onChange={handleChange}
            name="description"
            margin="normal"
            id="name"
            label="Description"
            fullWidth
            variant="standard"
          />

          <TextField
            value={courseForm.urlVideo}
            name="urlVideo"
            onChange={handleChange}
            margin="normal"
            id="name"
            label="URL Video"
            fullWidth
            variant="standard"
          />

          <Box mt={2}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => setCourseForm({ ...courseForm, file: base64 })}
            />
          </Box>

          <DialogContentText sx={{ fontSize: 12 }}>
            If you don't want to change the upload file, don't upload anything
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditCourse;
