import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import { editUser } from "../../store/action";

const EditUser = ({ user }) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const [phone, setPhone] = useState(user.phone);

  const handleChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleRemove = (e) => {
    e.preventDefault();

    const payload = {
      UserId: user.id,
      NoHP: phone,
    };

    dispatch(editUser(payload));

    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen} color="secondary">
        Edit
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
          <TextField
            margin="normal"
            fullWidth
            label="Phone"
            size="small"
            onChange={handleChangePhone}
            value={phone}
          />
          <DialogContentText>
            Apakah anda yakin untuk mengupdate user ini?
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

export default EditUser;
