import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import CancelIcon from "@material-ui/icons/Cancel";
import { IconButton, TextField } from "@material-ui/core";
import * as servicesService from "../../services/Services.Service.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteServiceDialog({
  serviceId,
  title,
  setOffered,
  setRequested,
  refreshComponent
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = async () => {
    await servicesService.deleteService(serviceId);
    setOpen(false);
    refreshComponent();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
        <CancelIcon />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Etes vous sûre de vouloir supprimer le  service suivant ?"}
        </DialogTitle>
        <DialogContent>
          <p className="text-center">{title}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDelete} color="primary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
