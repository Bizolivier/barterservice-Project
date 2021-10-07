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
import * as usersService from "../../services/User.service";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteUserByAdmin({
    user,
    refreshComponent
}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDelete = async () => {
        await usersService.deleteUser(user.userId);
        setOpen(false);
        refreshComponent();
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
                <i class="trash alternate icon"></i>
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
                    {"Etes vous sûre de vouloir supprimer l'utilisateur' ?"}
                </DialogTitle>
                <DialogContent>
                    <p className="text-center">{user.nickname}</p>
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
