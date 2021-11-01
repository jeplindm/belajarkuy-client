import React from "react";
import {
  Button,
  Container,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Delete, Edit, Search } from "@mui/icons-material";

const drawerWidth = 240;

const ManageCourse = () => {
  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />

        <Typography align="center" variant="h5" component="div">
          Manage Courses
        </Typography>

        <TextField
          margin="normal"
          fullWidth
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

        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper>
                <Box my={2} p={2}>
                  <Typography variant="h6">Belajar Matematika</Typography>
                  <Typography variant="body2" align="justify">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus
                    officia incidunt minima ad officiis corporis, hic exercitationem
                    reiciendis voluptatum fuga, eligendi earum quis natus esse enim,
                    aperiam libero accusantium saepe?
                  </Typography>
                  <Box display="flex" justifyContent="flex-end">
                    <Box mr={2}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ textTransform: "capitalize" }}
                        startIcon={<Edit />}
                      >
                        Edit
                      </Button>
                    </Box>

                    <Box>
                      <Button
                        color="error"
                        sx={{ textTransform: "capitalize" }}
                        startIcon={<Delete />}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Paper>

              <Paper>
                <Box my={2} p={2}>
                  <Typography variant="h6">Belajar Kimia</Typography>
                  <Typography variant="body2" align="justify" gutterBottom>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus
                    officia incidunt minima ad officiis corporis, hic exercitationem
                    reiciendis voluptatum fuga, eligendi earum quis natus esse enim,
                    aperiam libero accusantium saepe?
                  </Typography>

                  <Box display="flex" justifyContent="flex-end">
                    <Box mr={2}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ textTransform: "capitalize" }}
                        startIcon={<Edit />}
                      >
                        Edit
                      </Button>
                    </Box>

                    <Box>
                      <Button
                        color="error"
                        sx={{ textTransform: "capitalize" }}
                        startIcon={<Delete />}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Paper>

              <Paper>
                <Box my={2} p={2}>
                  <Typography variant="h6">Belajar Fisika</Typography>
                  <Typography variant="body2" align="justify">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus
                    officia incidunt minima ad officiis corporis, hic exercitationem
                    reiciendis voluptatum fuga, eligendi earum quis natus esse enim,
                    aperiam libero accusantium saepe?
                  </Typography>
                  <Box display="flex" justifyContent="flex-end">
                    <Box mr={2}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ textTransform: "capitalize" }}
                        startIcon={<Edit />}
                      >
                        Edit
                      </Button>
                    </Box>

                    <Box>
                      <Button
                        color="error"
                        sx={{ textTransform: "capitalize" }}
                        startIcon={<Delete />}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Paper>

              <Paper>
                <Box my={2} p={2}>
                  <Typography variant="h6">Belajar Biologi</Typography>
                  <Typography variant="body2" align="justify">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus
                    officia incidunt minima ad officiis corporis, hic exercitationem
                    reiciendis voluptatum fuga, eligendi earum quis natus esse enim,
                    aperiam libero accusantium saepe?
                  </Typography>
                  <Box display="flex" justifyContent="flex-end">
                    <Box mr={2}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ textTransform: "capitalize" }}
                        startIcon={<Edit />}
                      >
                        Edit
                      </Button>
                    </Box>

                    <Box>
                      <Button
                        color="error"
                        sx={{ textTransform: "capitalize" }}
                        startIcon={<Delete />}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ManageCourse;
