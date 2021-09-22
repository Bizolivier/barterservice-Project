import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import * as userServices from "../../services/User.service.js";
import FormComment from "./FormComment";
import { useAuth0 } from "@auth0/auth0-react";
import AddIcon from "@material-ui/icons/Add";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@material-ui/core";
import Answer from "../comments/Answer";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { mergeClasses } from "@material-ui/styles";
import * as framework from "../../Framework.js";
import Rating from "@material-ui/lab/Rating";
import * as commentServ from "../../services/CommentService";

import StarBorderIcon from "@material-ui/icons/StarBorder";



const useStyles = makeStyles((theme) => ({
  comment: {
    display: 'inline-flex',
    margin: '5px',
  },
  response: {
    display: 'inline-flex',
    margin: '5px',
    marginLeft: "50px"
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
}));


export default ({ authorServId, userService, refreshPage, comt }) => {
  const { user, isAuthenticated } = useAuth0();
  const [userConnected, setUserConnected] = useState([]);
  const [visible, setVisible] = useState(false);
  const [authorService, setAuthorService] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [response, setResponse] = React.useState("");
  const [refresh, setRefresh] = useState(true);
  const [busy, setBusy] = useState(true);

  const classes = useStyles();

  useEffect(() => {
    async function fechData() {

      const res = await userServices.GetOneById(authorServId);
      if (isAuthenticated) {
        const userConnected = await userServices.GetOneByEmail(user.email);
        setUserConnected(userConnected);
      }

      setAuthorService(res);
    }

    fechData();
    setBusy(false);

  }, []);


  const handleClickCreateComment = () => {
    setVisible(true);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAjouter = (commentId, answer) => {
    async function ajoutAnswer() {
      await commentServ.addAnswerToComment(commentId, answer);
    }
    ajoutAnswer();
    setOpen(false);
    refreshPage();
  };


  return (
    <div className={" justify-content-center"} style={{ "margin-left": "20%", "width": "60%", "margin-right": "20%" }}>

      {!busy ?
        comt.map(comment => {
          return (
            <div>

              <div className={"d-flex justify-content-start mb-2"}>
                <div className="img_cont_msg justify-content-start mx-2">
                  <img
                    src={framework.IMG(comment.author.picture)}
                    className="rounded-circle user_img_msg "
                  />
                </div>
                <div>
                  <div className={"msg_cotainer_send min-vw-50 text-dark bg-light d-inline-flex "}>
                    {comment.description}

                  </div>
                  <div className="ui rating" data-max-rating="1"></div>
                  <div className="small d-flex justify-content-start">
                    <Rating
                      name="simple-controlled"
                      defaultValue={comment.rating}
                      precision={0.5}
                      readOnly
                      emptyIcon={<StarBorderIcon fontSize="inherit" />}
                    />
                  </div>
                </div>


              </div>
              {userService.userId == userConnected.userId && comment.answer == null ?
                <>
                  <Button variant="contained" onClick={handleClickOpen}>
                    repondre
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Réponse au commentaire</DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Réponse"
                        fullWidth
                        variant="standard"
                        value={response}
                        onChange={(event) => setResponse(event.target.value)}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button color="secondary" onClick={handleClose}>Annuler</Button>
                      <Button color="primary" onClick={() => handleAjouter(comment.cmntId, response)}>Ajouter</Button>
                    </DialogActions>
                  </Dialog>


                </>
                : <></>
              }
              {comment.answer != null ?
                <div className={"d-flex justify-content-end mb-4 "}>
                  <div className={"msg_cotainer_send min-vw-50 bg-success d-inline-flex"}>
                    {comment.answer}
                  </div>
                  <div className="img_cont_msg justify-content-start">
                    <img src={framework.IMG(userService.picture)}
                      className="rounded-circle user_img_msg"
                    />
                  </div>
                </div>
                : <></>}

            </div>)
        }) : <></>
      }

    </div>


  );
};


