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
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
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
            <Typography variant="h1">{children}</Typography>
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

export default function OrderTheService({ userName, serviceName, servId, offerAuthorId, userConnectedId, }) {
    const [open, setOpen] = useState(false);
    const [valueDate, setValueDate] = useState(new Date());
    const [openS, setOpenS] = useState(false);
    const [errorDateTime, setErrorDateTime] = useState(false);

    const handleClickAddPrestation = () => {
        const newPrestation = {
            IdServiceProvided: servId,
            IdUserClient: userConnectedId,
            IdUserProvider: offerAuthorId,
            Date: valueDate,
            Etat: 0
        };
        console.log(newPrestation);
        prestationService.addPrestation(newPrestation);
        setOpenS(true);
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
            <IconButton color="success" onClick={handleClickOpen}>
                <AddShoppingCartIcon />
            </IconButton>

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <h4 className="fst-italic">Vous désirez commander auprès de {userName} le service :</h4>

                    <h1 className="text-success text-capitalize"> {serviceName}</h1>
                </DialogTitle>
                <DialogContent>
                    <div>
                        <p>Veuillez choisir une date et une heure d'execution </p>
                        <div className="h-50">
                            <DateTimePicker
                                onChange={(e) => { setErrorDateTime(e.getTime() < valueDate.getTime); setValueDate(e) }}
                                value={valueDate}
                                minDate={new Date()}
                                error={errorDateTime}
                                
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
                    <Button autoFocus color="primary" onClick={handleClickAddPrestation}>
                        commander
                     </Button>
                </DialogActions>
                <Snackbar
                    open={openS}
                    autoHideDuration={6000}
                    onClose={handleCloseAlert}
                >
                    <Alert onClose={handleCloseAlert} severity="success">
                        La prestation a été commandeé
            </Alert>
                </Snackbar>
            </Dialog>
        </div>
    );
}