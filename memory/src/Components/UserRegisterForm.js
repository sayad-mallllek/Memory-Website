import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import FormData from "form-data";
import { createUser } from "../Services/UserService";

const UserRegisterForm = () => {
  const history = useHistory();
  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [signupError, setSignupError] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (event) => {
    const userFormData = {
      username: formValue.username,
      email: formValue.email,
      password: formValue.password,
    };
    event.preventDefault();

    const response = await createUser(userFormData);
    if (response.status === 200) {
      window.location.replace("/");
    } else {
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

  return (
    <Form className="mt-5 p-5" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formPostTitle">
        {signupError && (
          <Alert
            variant="danger"
            onClose={() => setSignupError(false)}
            dismissible
          >
            {responseMessage}
          </Alert>
        )}
        <Form.Label>Username</Form.Label>
        <Form.Control
          name="username"
          type="text"
          placeholder="Enter Username"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPostText">
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
          type="text"
          placeholder="Enter Email"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formImageFile" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        SignUp
      </Button>
      <br />
      <Link to="/login">Already have an account?</Link>
    </Form>
  );
};

export default UserRegisterForm;
