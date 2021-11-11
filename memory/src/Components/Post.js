import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const Post = (post) => {
  const { data } = post;
  const history = useHistory();
  const routeChange = () => {
    let path = "/posts/" + data._id;
    history.push(path);
  };
  return (
    <React.Fragment>
      <Card
        className=" card-border border border-info rounded border-shadow d-inline-block mx-5 my-2 py-1"
        style={{ width: "18rem" }}
        onClick={routeChange}
      >
        <Card.Img
          variant="top"
          style={{ height: "200px", objectFit: "contain" }}
          src={data.img}
        />
        <Card.Body>
          <Card.Title>{data.title}</Card.Title>
          <Card.Text>{data.text}</Card.Text>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default Post;
