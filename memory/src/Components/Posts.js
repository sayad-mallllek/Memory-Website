import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Button } from "react-bootstrap";
import Post from "./Post";
import { getPost, getPosts } from "../Services/PostService";

const Posts = () => {
  const history = useHistory();
  const routeChange = () => {
    let path = "/posts/new";
    history.push(path);
  };
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts()
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.log("Error Getting Data");
      });
  }, [setPosts]);

  return (
    <div>
      <Button className="mt-3" variant="outline-primary" onClick={routeChange}>Create New Post</Button>
      <Container className="mt-5 p-5">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <React.Fragment>
              <Post key={post._id} data={post} />
            </React.Fragment>
          ))
        ) : (
          <h1>Loading Data...</h1>
        )}
      </Container>
    </div>
  );
};

export default Posts;
