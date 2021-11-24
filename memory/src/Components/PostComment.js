import React from 'react'
import { Form, Button, Row, Col } from "react-bootstrap";

const PostComment = ({handleSubmit, handleChange}) => {
    const bottomStyle = { bottom : "1vh"};
    return (
        <Form className="" onSubmit={handleSubmit}>
        <Row className="position-absolute" style={bottomStyle}>
          <Col xs={10}>
            <Form.Control name="comment" type="text" onChange={handleChange} />
          </Col>
          <Col xs={2}>
            <Button
              className="form-control-sm"
              variant="primary"
              type="submit"
            >
              Comment
            </Button>
          </Col>
        </Row>
      </Form>
    )
}

export default PostComment
