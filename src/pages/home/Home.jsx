import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Success } from "../../components";

const drawerWidth = 240;

const Home = () => {
  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Success value={true} message={"Login berhasil!"} />
        <Toolbar />
        <Typography align="center" variant="h5" component="div">
          Home
        </Typography>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box p={2}>
                <Card>
                  <CardMedia
                    component="img"
                    height="280"
                    image="https://miro.medium.com/max/1400/1*L76A5gL6176UbMgn7q4Ybg.jpeg"
                    alt="picture"
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Belajar Matematika
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Matematika
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with over 6,000
                      species, ranging across all continents except Antarctica
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box p={2}>
                <Card>
                  <CardMedia
                    component="img"
                    height="280"
                    image="https://images.theconversation.com/files/121885/original/image-20160510-20731-1pf8nwv.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip"
                    alt="picture"
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Belajar Kimia
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Kimia
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with over 6,000
                      species, ranging across all continents except Antarctica
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box p={2}>
                <Card>
                  <CardMedia
                    component="img"
                    height="280"
                    image="https://lesyuks.weebly.com/uploads/1/3/7/8/137853396/s870872217595628770_p5_i1_w926.jpeg"
                    alt="picture"
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Belajar Fisika
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Fisika
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with over 6,000
                      species, ranging across all continents except Antarctica
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box p={2}>
                <Card>
                  <CardMedia
                    component="img"
                    height="280"
                    image="https://thumbs.dreamstime.com/z/biology-hand-drawn-doodles-lettering-education-science-vector-white-background-135246167.jpg"
                    alt="picture"
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Belajar Biology
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Biology
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with over 6,000
                      species, ranging across all continents except Antarctica
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;
