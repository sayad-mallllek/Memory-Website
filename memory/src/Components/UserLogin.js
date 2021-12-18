import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { loginUser } from "../Services/UserService";


const UserLogin = () => {
  const history = useHistory();
  const [loginError, setLoginError] = useState(false);
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    const userFormData = {
      username: formValue.username,
      password: formValue.password,
    };
    event.preventDefault();

    const response = await loginUser(userFormData);
    if (response.status == 400) console.log("Invalid username or password");
    if (response.status == 200) {
      window.location.replace("/");
    } else {
      setLoginError(true);
      console.log("login error:", loginError);
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
        {loginError && (
          <Alert
            variant="danger"
            onClose={() => setLoginError(false)}
            dismissible
          >
            Username or Password are incorrect!
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
        Login
      </Button>
      <br />
      <Link to="/signup">Don't have an account?</Link>
    </Form>
  );
};

export default UserLogin;
