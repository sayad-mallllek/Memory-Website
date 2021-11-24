import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormData from "form-data";
import { createUser } from "../Services/UserService";

const UserForm = () => {
  const history = useHistory();
  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    // const userFormData = new FormData();
    // userFormData.append("username", formValue.username);
    // userFormData.append("email", formValue.email);
    // userFormData.append("password", formValue.password);

    const userFormData = {
      username: formValue.username,
      email: formValue.email,
      password: formValue.password,
    };
    event.preventDefault();

    const response = await createUser(userFormData);
    if (response.status == 200) {
      history.replace("/");
      console.log("Congrats!, User Created!");
    } else console.log("Response", response);
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
        <Form.Label>Username</Form.Label>
        <Form.Control
          name="username"
          type="text"
          placeholder="Enter Post Title"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPostText">
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
          type="text"
          placeholder="Enter Post Title"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formImageFile" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="Enter Post Title"
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
};

export default UserForm;
