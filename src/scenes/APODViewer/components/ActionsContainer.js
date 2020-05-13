import React, { useState } from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import UserAction from "../../../hooks/UserAction";
import moment from "moment";
import { BASE_URL, DATE_FORMAT } from "../../../Constants";

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 100px;
  margin-right: 100px;
  margin-bottom: 50px;
`;

const appStorage = window.localStorage;

const ActionsContainer = (props) => {
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [actionState, userAction] = UserAction({
    url: `${BASE_URL}users/action/`,
    payload: {
      ApodURL: props.currentApod.mediaUrl,
      ApodName: props.currentApod.title,
      ApodDate: props.currentApod.currentImageDate.format(DATE_FORMAT),
      MediaType: props.currentApod.mediaType,
      Description: props.currentApod.text,
      ActionDate: moment(),
    },
  });

  function actionButtonPressed(actionType) {
    let rawUser = appStorage.getItem("user");
    console.log(actionState);
    let parsedUser = JSON.parse(rawUser);
    if (rawUser) {
      switch (actionType) {
        case "save":
          handleSave(save, setSave, userAction, parsedUser);
          break;
        case "like":
          handleLike(like, setLike, userAction, parsedUser);
          break;
        default:
          // TODO: Do some error handling
          console.log("Invalid action type");
          break;
      }
    } else {
      // Prompt user to login
      window.alert("You must be logged in to save an image!");
    }
  }

  return (
    <Actions>
      <IconButton
        onClick={() => actionButtonPressed("like")}
        disableRipple={true}
        disableFocusRipple={true}
      >
        {like ? (
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
        {save ? (
          <BookmarkIcon style={{ color: "#4ccc43" }} fontSize="large" />
        ) : (
          <BookmarkBorderIcon fontSize="large" />
        )}
      </IconButton>
    </Actions>
  );
};

function handleSave(save, setSave, userAction, parsedUser) {
  let newStateIsSave = !save;
  setSave(newStateIsSave);
  if (newStateIsSave) {
    userAction("save");
  } else {
    userAction("unsave");
  }
}

function handleLike(like, setLike, userAction, parsedUser) {
  let newStateIsLike = !like;
  setLike(newStateIsLike);
  if (newStateIsLike) {
    userAction("like");
  } else {
    userAction("unlike");
  }
}

export default ActionsContainer;
