import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { MdModeEdit } from "react-icons/md";
import { useParams } from "react-router-dom";
import { getPost } from "../Services/PostService";
import { TiDelete } from "react-icons/ti";
import FormData from "form-data";
import { updatePost, deletePost } from "../Services/PostService";

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
    const postToSend = { title: post.title, text: post.text };
    const response = updatePost(postToSend, id);
    setEditable(false);
    console.log(post);
    event.preventDefault();
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

        <Row>
          <Col xs={6}>
            <Card.Img
              variant="git commit -mtop"
              src={post.img}
              alt={post.img}
              style={{ maxHeight: "35rem", objectFit: "contain" }}
            />
          </Col>

          <Col xs={6}>
            <Card.Body style={{ height: "100%" }}>
              {editable ? (
                <React.Fragment>
                  <TiDelete
                    className="m-1"
                    style={{ zIndex: 2 }}
                    onClick={() => {
                      console.log("Click!");
                    }}
                  />
                  <Form onSubmit={handleSubmit}>
                    <Card.Title>
                      <Form.Control
                        name="title"
                        type="text"
                        value={post.title}
                        onChange={handleChange}
                      />
                    </Card.Title>
                    <Card.Text>
                      <Form.Control
                        name="text"
                        as="textarea"
                        rows={5}
                        value={post.text}
                        onChange={handleChange}
                      />
                    </Card.Text>
                    <Button className="mr-1" variant="primary" type="submit">
                      Update
                    </Button>
                    <Button
                      className="ml-1"
                      variant="danger"
                      type="button"
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  </Form>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.text}</Card.Text>
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
