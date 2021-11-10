import { Alert, Snackbar, Stack } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Success = ({ value, message }) => {
  const dispatch = useDispatch();

  const { success, successMessage } = useSelector((state) => state.state);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch({ type: "SET_SUCCESS", payload: false });
  };

  return (
    <>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={success} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
            {successMessage}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

export default Success;
