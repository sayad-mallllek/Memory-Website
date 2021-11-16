import React from 'react'
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { TiDelete } from "react-icons/ti";

const UpdateForm = ({post, handleSubmit, handleChange, handleDelete}) => {
    return (
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
    )
}

export default UpdateForm
