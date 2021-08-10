import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { IconButton, TextField } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import InputLabel from "@material-ui/core/InputLabel";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateServiceDialog({ isRequest }) {
  const [categories, setCategories] = useState("");
  const handleChange = event => {
    setCategories(event.target.value);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
        <AddCircleIcon />
      </IconButton>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {isRequest ? (
          <DialogTitle id="alert-dialog-slide-title">
            {"Rechercher un service"}
          </DialogTitle>
        ) : (
          <DialogTitle id="alert-dialog-slide-title">
            {"Proposer un service "}
          </DialogTitle>
        )}

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Intitulé"
            type="text"
            fullWidth
          />

          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              Categories
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label w-50"
              id="demo-simple-select-outlined"
              value={categories}
              onChange={handleChange}
              label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
