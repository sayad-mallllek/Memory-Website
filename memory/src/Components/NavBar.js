import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, Router } from "react-router-dom";
import Button from "@material-ui/core/Button";

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../Resources/Globalstyle";
import { lightTheme, darkTheme } from "../Resources/Theme";

const NavBar = ({ user }) => {
  const [theme, setTheme] = useState("light");
  const themeToggler = () => {
    console.log("Switch now");
    theme === "light" ? setTheme("dark") : setTheme("light");
    console.log(theme);
  };
  return (
    <div className="Oswald">
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <div>
          <GlobalStyles />
          <Navbar className="nav p-1 shadow navbar-background" expand="lg">
            <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll" className="container">
              <Nav
                className="my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="/" className="ml-2 mr-2">
                  Home
                </Nav.Link>
                <Nav.Link href="/posts" className="ml-2 mr-2">
                  Posts
                </Nav.Link>
                <Nav.Link href="#" className="m2-1 mr-2">
                  Link
                </Nav.Link>
              </Nav>
              <Button className="ml-auto" onClick={themeToggler}>
                Switch Theme
              </Button>
              {user ? (
                <React.Fragment>
                  {/* <Router>
                    <Link to="/">Welcome {user.username}</Link>
                  </Router> */}
                  <Button
                    className="ml-auto fw-bolder"
                    variant="contained"
                    color="secondary"
                    href="/logout"
                  >
                    <Nav.Link href="/logout">Logout</Nav.Link>
                  </Button>
                </React.Fragment>
              ) : (
                <Button
                  className="ml-auto fw-bolder"
                  variant="contained"
                  color="secondary"
                  href="/login"
                >
                  Login
                </Button>
              )}
            </Navbar.Collapse>
          </Navbar>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default NavBar;
