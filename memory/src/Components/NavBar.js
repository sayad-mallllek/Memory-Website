import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Button from "@material-ui/core/Button";

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../Resources/Globalstyle";
import { lightTheme, darkTheme } from "../Resources/Theme";

const NavBar = () => {
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
                <Nav.Link href="#action1" className="ml-2 mr-2">
                  Home
                </Nav.Link>
                <Nav.Link href="#action2" className="ml-2 mr-2">
                  Link
                </Nav.Link>
                <Nav.Link href="#" className="m2-1 mr-2">
                  Link
                </Nav.Link>
              </Nav>
              <Button className="ml-auto" onClick={themeToggler}>
                Switch Theme
              </Button>
              <Button
                className="ml-auto fw-bolder"
                variant="contained"
                color="secondary"
              >
                Login
              </Button>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default NavBar;
