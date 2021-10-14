import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import FormCommentPay from "../comments/FormCommentPay";
import * as commentService from "../../services/CommentService";
import { Alert, AlertTitle } from "@material-ui/lab";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
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
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function PayementServiceDialog({ prestation, payer }) {
    const [open, setOpen] = React.useState(false);
    const [comment, setComment] = React.useState("");
    const [rating, setRating] = React.useState(3);
    const [empty, SetEmpty] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handlePayement = () => {
        if (comment == "") {
            SetEmpty(true);
        } else {
            createComment();
            payer();
            setOpen(false);
        }

    };

    const createComment = async () => {
        async function ajoutComment() {
            const newComment = {
                Description: comment,
                AuthorId: prestation.idUserClient,
                ServiceLinkedToId: prestation.idServiceProvided,
                ReceiverId: prestation.idUserProvider,
                Date: new Date(),
                Rating: rating
            };

            await commentService.addComment(newComment);

        }
        ajoutComment();
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                A payer
      </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <div> Vous allez payer la prestation:</div> <div className="text-primary fst-italic">{prestation.nomService}</div>
                    <div>préster par</div> <div className="text-primary fst-italic"> {prestation.nomProvider}</div>
                </DialogTitle>
                <DialogContent dividers>
                    <div>Souhaitez vous commenter et noter la prestation</div>
                    <FormCommentPay
                        serviceIdToComment={prestation.idServiceProvided}
                        authorServId={prestation.idUserProvider}
                        comment={comment}
                        setComment={setComment}
                        rating={rating}
                        setRating={setRating}
                    />
                    {empty ? <div>
                        <Alert variant="standard" color="error">
                            To make a comment is required!
                   </Alert>

                    </div> : <div></div>}



                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handlePayement} color="primary">
                        Payer et Commenter
                    </Button>
                    <Button autoFocus onClick={handleClose} color="secondary">
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}