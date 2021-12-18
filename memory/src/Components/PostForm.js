import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import FormData from "form-data";
import { sendPost } from "../Services/PostService";

const PostForm = () => {
  const history = useHistory();
  const [formValue, setFormValue] = useState({
    title: "",
    text: "",
    img: "",
  });
  const [signupError, setSignupError] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");


  const handleSubmit = async (event) => {
    const postFormData = new FormData();

    postFormData.append("title", formValue.title);
    postFormData.append("text", formValue.text);
    postFormData.append("img", formValue.img);

    event.preventDefault();

    const response = await sendPost(postFormData);
    if (response.status == 200) history.replace("/");
    else {
      console.log(response);
      setSignupError(true);
      setResponseMessage(response.substring(response.indexOf('[')+1,response.indexOf(']')));
    }
  };

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.files[0],
    });
  };

  return (
    <Form className="mt-5 p-5" onSubmit={handleSubmit}>
      {signupError && (
          <Alert
            variant="danger"
            onClose={() => setSignupError(false)}
            dismissible
          >
            {responseMessage}
          </Alert>
        )}
      <Form.Group className="mb-3" controlId="formPostTitle">
        <Form.Label>Post Title</Form.Label>
        <Form.Control
          name="title"
          type="text"
          placeholder="Enter Post Title"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPostText">
        <Form.Label>Post Title</Form.Label>
        <Form.Control
          name="text"
          as="textarea"
          rows={5}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formImageFile" className="mb-3">
        <Form.Label>Upload Image</Form.Label>
        <Form.Control type="file" name="img" onChange={handleFileChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
};

export default PostForm;
