import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import PostComment from "./PostComment";
import { sendComment } from "../Services/PostService";
import { Container } from "@material-ui/core";



const Comments = (props) => {
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState();
  useEffect(() => {
    setComments(props.Comments);
  }, [setComments]);

  const handleSubmit = async (event) => {
    const postId = props.postId;
    const response = sendComment(userComment, postId);
    event.preventDefault();
  };

  const handleChange = (event) => {
    setUserComment({
      ...userComment,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <Container className="mt-1 p-1">
        {comments ? (
          comments.map((comment) => (
            <React.Fragment>
              <Comment Comment={comment} />
            </React.Fragment>
          ))
        ) : (
          <h1>Loading Data...</h1>
        )}
      </Container>
      <PostComment 
      handleSubmit = {handleSubmit} 
      handleChange = {handleChange}/>
    </div>
  );
};

export default Comments;
