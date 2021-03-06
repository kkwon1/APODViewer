import React from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import UserAction from "../../hooks/UserAction";
import moment from "moment";
import { BASE_URL } from "../../Constants";
import * as firebase from "firebase/app";
import "firebase/auth";

const Actions = styled.div`
  display: flex;
`;

const ActionsContainer = (props) => {
  const [userAction] = UserAction({
    url: `${BASE_URL}users/action/`,
    payload: {
      ApodURL: props.currentApod.apod.ApodURL,
      ApodName: props.currentApod.apod.ApodName,
      ApodDate: props.currentApod.apod.ApodDate,
      MediaType: props.currentApod.apod.MediaType,
      Description: props.currentApod.apod.Description,
      Copyright: props.currentApod.apod.Copyright,
      ApodHDURL: props.currentApod.apod.ApodHDURL,
      ActionDate: moment(),
    },
  });

  function actionButtonPressed(actionType) {
    if (firebase.auth().currentUser) {
      switch (actionType) {
        case "like":
          if (props.currentApod.isLiked) {
            props.action("unlike", props.currentApod.apod.ApodDate);
            userAction("unlike");
          } else {
            props.action("like", props.currentApod.apod.ApodDate);
            userAction("like");
          }
          break;
        case "save":
          if (props.currentApod.isSaved) {
            props.action("unsave", props.currentApod.apod.ApodDate);
            userAction("unsave");
          } else {
            props.action("save", props.currentApod.apod.ApodDate);
            userAction("save");
          }
          break;
        default:
          // TODO: Do some error handling
          console.log("Invalid action type");
          break;
      }
    } else {
      // Prompt user to login
      // TODO: Make a dialog component
      window.alert("You must be logged in to perform this action!");
    }
  }

  return (
    <Actions>
      <IconButton
        onClick={() => actionButtonPressed("like")}
        disableRipple={true}
        disableFocusRipple={true}
      >
        {props.currentApod.isLiked ? (
          <FavoriteIcon style={{ color: "#e82c3f" }} fontSize="large" />
        ) : (
          <FavoriteBorderIcon fontSize="large" />
        )}
      </IconButton>
      <IconButton
        onClick={() => actionButtonPressed("save")}
        disableRipple={true}
        disableFocusRipple={true}
      >
        {props.currentApod.isSaved ? (
          <BookmarkIcon style={{ color: "#4ccc43" }} fontSize="large" />
        ) : (
          <BookmarkBorderIcon fontSize="large" />
        )}
      </IconButton>
    </Actions>
  );
};

export default ActionsContainer;
