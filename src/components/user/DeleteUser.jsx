import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../store/action";

const DeleteUser = ({ user }) => {
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

    dispatch(deleteUser(user.id));
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen} color="error">
        Delete
      </Button>

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
              fontSize: 14,
              fontFamily: "sans-serif",
              color: "#4E5D78",
              textAlign: "center",
              fontWeight: 500,
            }}
            id="alert-dialog-slide-description"
          >
            DELETE USER
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogContentText
            style={{
              fontSize: 16,
              fontFamily: "sans-serif",
              color: "#4E5D78",
              textAlign: "center",
            }}
            id="alert-dialog-slide-description"
          >
            Apakah anda yakin untuk menghapus user ini dari list?
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

export default DeleteUser;
