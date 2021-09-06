import React, { useState, useEffect } from "react";
import { useAuth0, User } from "@auth0/auth0-react";
import * as framework from "../../Framework.js";
import * as userService from "../../services/User.service";
import * as commentService from "../../services/CommentService";

const FormComment = ({ serviceIdToComment, authorServId }) => {
  const { user, isAuthenticated } = useAuth0();
  const { email } = user;
  const [userNickname, setUserNickname] = useState("");
  const [userPicture, setUserPicture] = useState("");
  const [isBusy, setBusy] = useState(true);
  const [comnt, setComnt] = useState("");
  const [userId, setUserId] = useState();

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
    setComnt(e.target.value);
  };
  const createComment = () => {
    const newComment = {
      Description: comnt,
      AuthorId: userId,
      ServiceLinkedToId: serviceIdToComment,
      ReceiverId: authorServId,
      Date: new Date(),
      Rating: 0
    };
    commentService.addComment(newComment);
  };
  const handleKeyUp = e => {
    e.preventDefault();
    if (e.key === "Enter") {
      createComment();
    }
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
                value={comnt}
                className="form-control type_msg rounded-pill"
                placeholder="Type your message..."
                onChange={handleClickSendComment}
                onKeyUp={handleKeyUp}
              ></textarea>
              <label className="form-label" htmlFor="textAreaExample">
                Commentaire
              </label>
            </div>
          </div>
          <div className="float-end mt-2 pt-1">
            <button type="button" className="btn btn-primary btn-sm">
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

export default FormComment;
