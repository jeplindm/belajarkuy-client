import React, { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import { Add, Remove } from "@mui/icons-material";

const drawerWidth = 240;

const UploadAssesment = () => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />

        <Typography align="center" variant="h5" component="div">
          Upload Assessment
        </Typography>

        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <form>
                <Box p={2}>
                  <Typography variant="h6">Masukkan Jumlah Soal</Typography>
                  <Box display="flex" alignItems="center">
                    <IconButton
                      color="primary"
                      disabled={counter === 0}
                      onClick={() => setCounter(counter - 1)}
                    >
                      <Remove />
                    </IconButton>
                    <Typography variant="h6">{counter}</Typography>
                    <IconButton color="primary" onClick={() => setCounter(counter + 1)}>
                      <Add />
                    </IconButton>
                  </Box>

                  <FormControl variant="standard" fullWidth margin="normal">
                    <InputLabel htmlFor="judulMateri">Judul Materi</InputLabel>
                    <Input id="judulMateri" />
                  </FormControl>

                  <FormControl variant="standard" fullWidth margin="normal">
                    <InputLabel htmlFor="timer">Timer (Minutes)</InputLabel>
                    <Input minRows="0" maxRows="15" type="number" id="timer" />
                  </FormControl>

                  <FormControl variant="standard" fullWidth margin="normal">
                    <InputLabel htmlFor="soal">Soal</InputLabel>
                    <Input multiline={true} id="soal" />
                  </FormControl>

                  <FormControl variant="standard" fullWidth margin="normal">
                    <InputLabel htmlFor="pilihan1">Pilihan 1</InputLabel>
                    <Input id="pilihan1" />
                  </FormControl>

                  <FormControl variant="standard" fullWidth margin="normal">
                    <InputLabel htmlFor="pilihan1">Pilihan 2</InputLabel>
                    <Input id="pilihan2" />
                  </FormControl>

                  <FormControl variant="standard" fullWidth margin="normal">
                    <InputLabel htmlFor="pilihan1">Pilihan 3</InputLabel>
                    <Input id="pilihan3" />
                  </FormControl>

                  <FormControl variant="standard" fullWidth margin="normal">
                    <InputLabel htmlFor="pilihan1">Pilihan 4</InputLabel>
                    <Input id="pilihan4" />
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

export default UploadAssesment;
