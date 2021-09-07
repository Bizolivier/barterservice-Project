import React, { useState, useEffect } from "react";
import * as userService from "../../services/User.service.js";
import * as framework from "../../Framework.js";
import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import * as commentServ from "../../services/CommentService";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const Comment = ({
  authorId,
  description,
  date,
  commentId,
  refreshComponent,
  ratingCmt
}) => {
  const [userNickname, setUserNickname] = useState("");
  const [userPicture, setUserPicture] = useState("");
  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await userService.GetOneById(authorId);
      setUserNickname(res.nickname);
      setUserPicture(res.picture);
      setBusy(false);
    }
    fetchData();
  }, []);

  const handleDelete = async () => {
    await commentServ.deleteComment(commentId);
    refreshComponent();
  };

  return (
    <div>
      {isBusy ? (
        <div> </div>
      ) : (
        <div className="card-body bg-white mx-5 my-4 rounded w-75 h-15">
          <div className="d-flex flex-start align-items-center">
            <img
              className="rounded-circle shadow-1-strong me-3"
              src={framework.IMG(userPicture)}
              //src=""
              alt="avatar"
              width="60"
              height="60"
            />
            <div>
              <h6 className="fw-bold text-primary mb-1">{userNickname}</h6>
              <p className="text-muted small mb-0">Shared publicly - {date}</p>
            </div>
          </div>

          <p className="mt-3 mb-4 pb-2 text-dark">{description}</p>

          <div className="ui rating" data-max-rating="1"></div>
          <div className="small d-flex justify-content-start">
            <Rating
              name="simple-controlled"
              defaultValue={ratingCmt}
              precision={0.5}
              readOnly
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
            />
          </div>

          <div className="small d-flex justify-content-end">
            <IconButton
              variant="outlined"
              color="primary"
              onClick={handleDelete}
            >
              <DeleteForeverIcon />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
