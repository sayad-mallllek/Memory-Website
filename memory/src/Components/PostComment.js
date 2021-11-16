import React from 'react'
import { Form, Button, Row, Col } from "react-bootstrap";

const PostComment = ({handleSubmit, handleChange}) => {
    return (
        <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={5}>
            <Form.Control name="comment" type="text" onChange={handleChange} />
          </Col>
          <Col xs={2}>
            <Button
              className="ml-1 form-control-sm"
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
