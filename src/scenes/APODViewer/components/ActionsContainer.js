import React, { useState, useEffect } from "react";
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
  const currentApodDate = props.currentApod.currentImageDate.format(
    DATE_FORMAT
  );

  const [likes, setLikes] = useState([]);
  const [saves, setSaves] = useState([]);

  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [actionState, userAction] = UserAction({
    url: `${BASE_URL}users/action/`,
    payload: {
      ApodURL: props.currentApod.mediaUrl,
      ApodName: props.currentApod.title,
      ApodDate: currentApodDate,
      MediaType: props.currentApod.mediaType,
      Description: props.currentApod.text,
      ActionDate: moment(),
    },
  });

  function actionButtonPressed(actionType) {
    let rawUser = appStorage.getItem("user");
    console.log(actionState);
    if (rawUser) {
      switch (actionType) {
        case "like":
          handleLike(likes, currentApodDate);
          break;
        case "save":
          handleSave(saves, currentApodDate);
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

  function handleLike(likeDates, apodDate) {
    let newStateIsLike = !like;
    setLike(newStateIsLike);
    if (newStateIsLike) {
      userAction("like");
      likeDates.push(apodDate);
    } else {
      userAction("unlike");
      let index = likeDates.indexOf(apodDate);
      if (index > -1) {
        likeDates.splice(index, 1);
      }
    }
    setLikes(likeDates);
  }

  function handleSave(saveDates, apodDate) {
    let newStateIsSave = !save;
    setSave(newStateIsSave);
    if (newStateIsSave) {
      userAction("save");
    } else {
      userAction("unsave");
      let index = saveDates.indexOf(apodDate);
      if (index > -1) {
        saveDates.splice(index, 1);
      }
    }
    setSaves(saveDates);
  }

  useEffect(() => {
    setLikes(props.currentApod.likeDates);
    setSaves(props.currentApod.saveDates);
    setLike(isLiked(likes, currentApodDate));
    setSave(isSaved(saves, currentApodDate));
  }, [
    likes,
    currentApodDate,
    saves,
    props.currentApod.likeDates,
    props.currentApod.saveDates,
  ]);

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

function isLiked(likeDates, currentDate) {
  if (likeDates) {
    return likeDates.includes(currentDate);
  }
  return false;
}

function isSaved(saveDates, currentDate) {
  if (saveDates) {
    return saveDates.includes(currentDate);
  }
  return false;
}

export default ActionsContainer;
