import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircle from "@material-ui/icons/AccountCircle";
import * as firebase from "firebase/app";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "firebase/auth";

const LinkContainer = styled(Link)`
  color: white;
  text-decoration: none;
`;

const appStorage = window.localStorage;

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleClick = (event) => {
    if (loggedIn) {
      setAnchorEl(event.currentTarget);
    } else {
      // Send to login page
      window.alert("Login bro");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setLoggedIn(false);
        appStorage.removeItem("userData");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  });

  return (
    <div>
      {loggedIn && window.location.pathname === "/" ? (
        <div>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            onClick={handleClick}
          >
            <AccountCircle />
          </IconButton>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem>
              <ListItemText primary="Profile Settings" />
            </StyledMenuItem>
            <StyledMenuItem>
              <ListItemText primary="Liked APODs" />
            </StyledMenuItem>
            <StyledMenuItem>
              <ListItemText primary="Saved APODs" />
            </StyledMenuItem>
            <StyledMenuItem onClick={logout}>
              <ListItemText primary="Sign out" />
            </StyledMenuItem>
          </StyledMenu>
        </div>
      ) : (
        <LinkContainer
          to={{
            pathname: "/login",
          }}
        >
          Sign in
        </LinkContainer>
      )}
    </div>
  );
}
