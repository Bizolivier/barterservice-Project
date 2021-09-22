import React, { useState, useEffect } from "react";
import { useAuth0, User } from "@auth0/auth0-react";
import * as framework from "../../Framework.js";
import * as userService from "../../services/User.service";
import * as commentService from "../../services/CommentService";

import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const FormAnswer = ({
    comment
}) => {
    const { user, isAuthenticated } = useAuth0();
    const { email } = user;
    const [userNickname, setUserNickname] = useState("");
    const [userPicture, setUserPicture] = useState("");
    const [isBusy, setBusy] = useState(true);
    const [answer, setAnswer] = useState("");
    const [userId, setUserId] = useState();
    const [value, setValue] = useState(3);

    useEffect(() => {
        async function fetchData() {
            const res = await userService.GetOneByEmail(email);
            setUserNickname(res.nickname);
            setUserPicture(res.picture);
            setUserId(res.userId);
            setBusy(false);
        }
        fetchData();
    }, []);

    const handleClickSendComment = e => {
        e.preventDefault();
        setAnswer(e.target.value);
    };
    const handleSubmit = async event => {
        event.preventDefault();
        await answerComment();
        setAnswer("");

    };
    const answerComment = async () => {
        async function ajoutAnswer() {

            await commentService.addAnswerToComment(comment.cmntId, answer);
        }
        ajoutAnswer();
    };
    const handleKeyUp = e => {
        e.preventDefault();
        if (e.key === "Enter") {
            answerComment();
            setAnswer("");
        }
    };
    const handleClickRating = e => {
        console.log(e);
    };

    return (
        <div>
            {isBusy ? (
                <div> </div>
            ) : (
                    <div className="card-footer py-3 border-0 w-75">
                        <div className="d-flex flex-start w-100">
                            <img
                                className="rounded-circle shadow-1-strong me-3"
                                src={framework.IMG(userPicture)}
                                alt="avatar"
                                width="40"
                                height="40"
                            />
                            <div className="form-outline w-100">
                                <textarea
                                    value={answer}
                                    className="form-control type_msg rounded-pill"
                                    placeholder="Type your message..."
                                    onChange={handleClickSendComment}
                                    onKeyUp={handleKeyUp}
                                ></textarea>
                                <label className="form-label" htmlFor="textAreaExample">
                                    Commentaire
              </label>
                                <Rating
                                    name="customized-empty"
                                    value={value}
                                    precision={0.5}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                        console.log(newValue);
                                    }}
                                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                />
                            </div>
                        </div>
                        <div className="float-end mt-2 pt-1">
                            <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                onClick={handleSubmit}
                            >
                                Post comment
            </button>
                            <button type="button" className="btn btn-outline-primary btn-sm">
                                Cancel
            </button>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default FormAnswer;
