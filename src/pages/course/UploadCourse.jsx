import React from "react";
import {
  Button,
  Container,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const drawerWidth = 240;

const UploadCourse = () => {
  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />

        <Typography align="center" variant="h5" component="div">
          Upload Course
        </Typography>

        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <form>
                <Box p={2}>
                  <FormControl variant="standard" fullWidth margin="normal">
                    <InputLabel htmlFor="component-simple">Judul Materi</InputLabel>
                    <Input id="component-simple" />
                  </FormControl>

                  <FormControl variant="standard" fullWidth margin="normal">
                    <InputLabel htmlFor="component-simple">Kategori</InputLabel>
                    <Input id="component-simple" />
                  </FormControl>

                  <FormControl variant="standard" fullWidth margin="normal">
                    <InputLabel htmlFor="component-simple">Deskripsi</InputLabel>
                    <Input id="component-simple" />
                  </FormControl>

                  <FormControl variant="standard" fullWidth margin="normal">
                    <InputLabel htmlFor="component-simple">Link Video</InputLabel>
                    <Input id="component-simple" />
                  </FormControl>

                  <Box my={2}>
                    <Button variant="contained" size="large" fullWidth>
                      Upload
                    </Button>
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
