import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import NavBar from "./NavBar";
import Posts from "./Posts";
import PostDetail from "./PostDetail";
import PostForm from "./PostForm";

export default class ActivityPage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Router>
          <Switch>
            <Route exact path="/posts" component={Posts} />
            <Route path="/posts/new" component={PostForm} />
            <Route
              path="/posts/:id"
              component={PostDetail}
            />
            <Redirect from="/" exact to="/posts" />
          </Switch>
        </Router>
      </div>
    );
  }
}