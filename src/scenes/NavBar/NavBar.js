import React from "react";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import ProfileMenu from "./hooks/ProfileMenu";

const NavbarContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const NameContainer = styled.div`
  display: flex;
  font-size: 2.5rem;
  padding: 0.5rem;
`;

const LinkContainer = styled(Link)`
  color: white;
  text-decoration: none;
`;

// TODO: Add a drawer component that slides the menu on left side of page
export default function NavBar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar variant="dense">
        <NavbarContainer>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <NameContainer fontSize="3rem">
            <LinkContainer to="/">APOD Viewer</LinkContainer>
          </NameContainer>
          <ProfileMenu />
        </NavbarContainer>
      </Toolbar>
    </AppBar>
  );
}
