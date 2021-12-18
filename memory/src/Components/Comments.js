import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import PostComment from "./PostComment";
import { sendComment } from "../Services/PostService";
import { validateComment } from "../Services/FormService";
import { Container } from "@material-ui/core";



const Comments = (props) => {
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState();
  useEffect(() => {
    setComments(props.Comments);
  }, [setComments]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {error} = validateComment(userComment);
    if(error){
      console.log("Comment must not be empty!");
      return;
    }
    const originalComments = [...comments];
    const newComments = [...comments, userComment.comment];
    const postId = props.postId;
    setComments(newComments);
    event.target.reset();
    const response = await sendComment(userComment, postId);
    if(response.data != "Success"){
      setComments(originalComments);
    }
  };

  const handleChange = (event) => {
    setUserComment({
      ...userComment,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="h-100">
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
