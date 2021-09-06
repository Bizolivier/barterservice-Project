import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import * as commentServ from "../../services/CommentService";
import * as userService from "../../services/User.service";
import FormComment from "./FormComment";
import { useAuth0 } from "@auth0/auth0-react";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";

const CommentList = ({ serviceId, authorServId }) => {
  const [comt, setComt] = useState([]);
  const { user, isAuthenticated } = useAuth0();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function fechData() {
      const listComments = await commentServ.GetCommentsByServiceId(serviceId);
      setComt(listComments);
      console.log(serviceId);
    }
    fechData();
  }, []);
  const handleClickCreateComment = () => {
    setVisible(true);
  };

  return (
    <div>
      <div>
        {comt.map(comment => {
          return (
            <div key={comment.cmntId}>
              <Comment
                authorId={comment.authorId}
                description={comment.description}
                date={comment.date}
              />
            </div>
          );
        })}

        <div>
          {visible && isAuthenticated ? (
            <FormComment
              serviceIdToComment={serviceId}
              authorServId={authorServId}
            />
          ) : (
            <div />
          )}
        </div>
        <div>
          {isAuthenticated ? (
            <button
              type="button"
              className="btn btn-dark"
              onClick={handleClickCreateComment}
            >
              Add Comment
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentList;
