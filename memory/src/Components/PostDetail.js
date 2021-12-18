import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getPost, updatePost, deletePost } from "../Services/PostService";

import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { MdModeEdit } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

import Comments from "./Comments";
import UpdateForm from "./UpdateForm";
import FormData from "form-data";

const PostDetail = () => {
  const [post, setPost] = useState([]);
  const [editable, setEditable] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    getPost(id)
      .then((data) => {
        setPost(data);
      })
      .catch((err) => {
        console.log("Error Getting Data");
      });
  }, [setPost]);

  const handleSubmit = async (event) => {
    //   const updateFormData = new FormData();
    //   updateFormData.set("title", post.title);
    //   updateFormData.set("text", post.text);
    //   for (var pair of updateFormData.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]);
    // }
    event.preventDefault();
    const postToSend = { title: post.title, text: post.text };
    const response = await updatePost(postToSend, id);

    setEditable(false);
    console.log(post);
  };

  const handleChange = (event) => {
    setPost({
      ...post,
      [event.target.name]: event.target.value,
    });
  };

  const handleDelete = (event) => {
    const response = deletePost(id);
    history.replace("/");
  };

  const toggleEdit = () => {
    setEditable(!editable);
  };

  return (
    <div className="d-flex justify-content-center">
      <Card
        className="m-5"
        style={{ width: "100%", minHeight: "30rem", maxHeight: "35rem" }}
      >
        <MdModeEdit onClick={toggleEdit} className="position-absolute" />

        <Row className="h-100">
          <Col
            xs={6}
            className="d-flex align-items-center justify-content-center"
          >
            <Card.Img
              className="w-100"
              variant="git commit -mtop"
              src={post.img}
              alt={post.img}
              style={{ maxHeight: "35rem", objectFit: "contain" }}
            />
          </Col>

          <Col xs={6}>
            <Card.Body style={{ height: "100%" }}>
              {editable ? (
                <UpdateForm
                  post={post}
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  handleDelete={handleDelete}
                />
              ) : (
                <React.Fragment>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.text}</Card.Text>
                  {post.comments ? (
                    <Comments Comments={post.comments} postId={id} />
                  ) : (
                    <h1>Loading Comments...</h1>
                  )}
                </React.Fragment>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default PostDetail;
