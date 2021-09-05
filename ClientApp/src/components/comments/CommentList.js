import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import * as commentServ from "../../services/CommentService";
import * as userService from "../../services/User.service";

const CommentList = ({ serviceId }) => {
  const [comt, setComt] = useState([]);

  useEffect(() => {
    async function fechData() {
      const listComments = await commentServ.GetCommentsByServiceId(serviceId);
      setComt(listComments);
      console.log(serviceId);
    }
    fechData();
  }, []);

  return (
    <div>
      {" "}
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
    
      
    </div>
  );
};

export default CommentList;
