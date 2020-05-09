import React, { useState } from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import SaveApod from "../../../hooks/SaveApod";

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 100px;
  margin-right: 100px;
  margin-bottom: 50px;
`;

const appStorage = window.localStorage;

const baseUrl = "http://localhost:8081/api/v1/";

const ActionsContainer = (props) => {
  const [save, setSave] = useState(false);
  const [res, saveApod] = SaveApod({
    url: `${baseUrl}users/save/`,
    payload: {
      Action: "save",
      ApodURL: props.currentApod.mediaUrl,
      ApodName: props.currentApod.title,
      ApodDate: props.currentApod.currentImageDate,
    },
  });

  function saveButtonPressed() {
    setSave(true);
    let rawUser = appStorage.getItem("user");
    if (rawUser) {
      let user = JSON.parse(rawUser);
      console.log(user);
      saveApod();
    } else {
      // Prompt user to login
      window.alert("You must be logged in to save an image!");
    }
  }

  return (
    <Actions>
      <IconButton disableRipple={true} disableFocusRipple={true}>
        <FavoriteBorderIcon
          onClick={() => likeButtonPressed()}
          fontSize="large"
        />
      </IconButton>
      <IconButton disableRipple={true} disableFocusRipple={true}>
        {save ? (
          <BookmarkIcon onClick={() => saveButtonPressed()} fontSize="large" />
        ) : (
          <BookmarkBorderIcon
            onClick={() => saveButtonPressed()}
            fontSize="large"
          />
        )}
      </IconButton>
    </Actions>
  );
};

function likeButtonPressed() {
  console.log("You pressed Like");
}

export default ActionsContainer;
