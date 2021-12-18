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
import UserRegisterForm from "./UserRegisterForm";
import UserLogin from "./UserLogin";
import UserLogout from "./UserLogout";
import { getUser } from "../Services/UserService";

export default class ActivityPage extends Component {
  state = {};

  componentDidMount() {
    const user = getUser();
    if (user) {
      this.setState({ user });
    }
  }
  render() {
    return (
      <div>
        <NavBar user={this.state.user} />
        <Router>
          <Switch>
            <Route exact path="/posts" component={Posts} />
            <Route path="/posts/new" component={PostForm} />
            <Route path="/posts/:id" component={PostDetail} />
            <Route exact path="/signup" component={UserRegisterForm} />
            <Route exact path="/login" component={UserLogin} />
            <Route exact path="/logout" component={UserLogout} />
            <Redirect from="/" exact to="/posts" />
          </Switch>
        </Router>
      </div>
    );
  }
}
