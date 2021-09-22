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
import CommentIcon from '@material-ui/icons/Comment';
import FormAnswer from "../comments/FormAnswer";


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

export default function AddAnswerDialog({ commentToAnswer }) {
    const [open, setOpen] = React.useState(false);
    const [comment, setComment] = React.useState("");
    const [rating, setRating] = React.useState(3);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handlePayement = () => {
        // createComment();
        // payer();
        setOpen(false);
    };

    // const createComment = async () => {
    //     async function ajoutComment() {
    //         const newComment = {
    //             Description: comment,
    //             AuthorId: prestation.idUserClient,
    //             ServiceLinkedToId: prestation.idServiceProvided,
    //             ReceiverId: prestation.idUserProvider,
    //             Date: new Date(),
    //             Rating: rating
    //         };
    //         await commentService.addComment(newComment);
    //     }
    //     ajoutComment();
    // };

    return (
        <div>
            <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>

                <CommentIcon />
            </IconButton>

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <div> Souhaitez vous répondre au commentaire</div> <div className="text-primary fst-italic"></div>
                    <div>préster par</div> <div className="text-primary fst-italic"></div>
                </DialogTitle>
                <DialogContent dividers>

                    <FormAnswer
                        comment={commentToAnswer}
                    />

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