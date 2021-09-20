import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import *as prestationService from "../../services/PrestationService";
import DateTimePicker from 'react-datetime-picker';
import Snackbar from "@material-ui/core/Snackbar";
import { Alert, AlertTitle } from "@material-ui/lab";





const styles = (theme) => ({
    root: {
        margin: 20,
        padding: theme.spacing(3),
        height: 100,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        height: 400
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function UpdatePrestation({ prestToUpdate, refreshComponent, nom }) {
    const [open, setOpen] = useState(false);
    const [valueDate, setValueDate] = useState(new Date());
    const [openS, setOpenS] = useState(false);

    const handleClickEditPrestation = () => {


        const newPrestation = {
            IdServiceProvided: prestToUpdate.idServiceProvided,
            IdUserClient: prestToUpdate.idUserClient,
            IdUserProvider: prestToUpdate.idUserProvider,
            Date: valueDate,
            Etat: prestToUpdate.etat
        };

        console.log(newPrestation);
        prestationService.PutDate(prestToUpdate.id, newPrestation);
        setOpenS(true);
        refreshComponent();
        setOpen(false);

    }
    function handleCloseAlert(event, reason) {
        if (reason === "clickaway") {
            return;
        }
    }


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="success" onClick={handleClickOpen}>
                Edit
            </Button>

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {prestToUpdate.nomClient === nom ?
                        <div>
                            <h5 className="text-success ">Vous désirez éditer le service : {prestToUpdate.nomService}</h5>
                            <h6 className="fst-italic"> commandé auprès de {prestToUpdate.nomProvider}</h6>
                        </div> : <div>
                            <h5 className="text-success ">Vous désirez éditer le service : {prestToUpdate.nomService}</h5>
                            <h6 className="fst-italic">qui vous a été commandé par {prestToUpdate.nomClient}</h6>

                        </div>
                    }


                </DialogTitle>
                <DialogContent>
                    <div>
                        <p>Veuillez choisir une date et une heure de la prestation qui vous conviennent </p>
                        <div className="h-50">
                            <DateTimePicker
                                onChange={(e) => { setValueDate(e) }}
                                value={valueDate}

                            />

                        </div>
                        <p>

                        </p>



                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="secondary">
                        Annuler
                    </Button>
                    <Button autoFocus color="primary" onClick={handleClickEditPrestation}>
                        Editer
                     </Button>
                </DialogActions>
                <Snackbar
                    open={openS}
                    autoHideDuration={6000}
                    onClose={handleCloseAlert}
                >
                    <Alert onClose={handleCloseAlert} severity="success">
                        La prestation a été éditée
            </Alert>
                </Snackbar>
            </Dialog>
        </div>
    );
}