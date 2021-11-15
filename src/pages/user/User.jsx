import React, { useEffect, useState } from "react";
import {
  Container,
  Toolbar,
  CircularProgress,
  Typography,
  Grid,
  Paper,
  Pagination,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { Success, Error, PagePagination, DeleteUser, EditUser } from "../../components";
import { getUsers } from "../../store/action";

const drawerWidth = 240;

const User = () => {
  const dispatch = useDispatch();
  const { loadingUsers, users } = useSelector((state) => state.state);

  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(users.length / PER_PAGE);
  const _DATA = PagePagination(users, PER_PAGE);

  const handleChangePagination = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

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
          {loadingUsers && (
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

          {!loadingUsers && users && (
            <Box>
              <Typography align="center" variant="h5" component="div" gutterBottom>
                User
              </Typography>

              <Grid container spacing={2}>
                {_DATA.currentData().map((user) => (
                  <Grid item xs={12} key={user.id}>
                    <Paper>
                      <Box
                        my={2}
                        p={2}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Box display="flex" flexDirection="column" sx={{ width: "50%" }}>
                          <Typography variant="body1">
                            <strong>Email:</strong> {user.email}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Phone:</strong> {user.phone}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Role:</strong> {user.role}
                          </Typography>
                        </Box>
                        <Box>
                          <EditUser user={user} />
                          <DeleteUser user={user} />
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {!loadingUsers && users && (
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

export default User;
