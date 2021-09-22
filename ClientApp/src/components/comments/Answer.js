import React, { useState, useEffect } from "react";
import * as userService from "../../services/User.service.js";
import * as framework from "../../Framework.js";
import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import * as commentServ from "../../services/CommentService";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const Answer = ({
    userService, commentToAnswer
}) => {

    const [isBusy, setBusy] = useState(true);



    const handleDelete = async () => {
        await commentServ.deleteComment(commentToAnswer.cmntId);

    };

    return (
        <div>
            {isBusy ? (
                <div> </div>
            ) : (
                    <div className="card-body bg-white mx-5 my-4 rounded w-50">
                        <div className="d-flex flex-end align-items-center">
                            <img
                                className="rounded-circle shadow-1-strong me-3"
                                src={framework.IMG(userService.picture)}
                                //src=""
                                alt="avatar"
                                width="60"
                                height="60"
                            />
                            <div>
                                <h6 className="fw-bold text-primary mb-1">{userService.nickname}</h6>
                                <p className="text-muted small mb-0">Shared publicly </p>
                            </div>
                        </div>

                        <p className="mt-3 mb-4 pb-2 text-dark">{commentToAnswer.answer}</p>

                        {/* <div className="ui rating" data-max-rating="1"></div>
            <div className="small d-flex justify-content-start">
              <Rating
                name="simple-controlled"
                defaultValue={ratingCmt}
                precision={0.5}
                readOnly
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
              />
            </div> */}

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

export default Answer;
