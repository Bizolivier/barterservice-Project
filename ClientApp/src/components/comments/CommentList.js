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
  const [refresh, setRefresh] = useState(true);

  const refreshComponent = () => {
    setRefresh(!refresh);
  };
  useEffect(() => {
    async function fechData() {
      const listComments = await commentServ.GetCommentsByServiceId(serviceId);
      setComt(listComments);
      console.log(serviceId);
    }
    fechData();
  }, [refresh]);
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
                commentId={comment.cmntId}
                refreshComponent={refreshComponent}
                ratingCmt={comment.rating}
              />
            </div>
          );
        })}



      </div>
    </div>
  );
};

export default CommentList;
