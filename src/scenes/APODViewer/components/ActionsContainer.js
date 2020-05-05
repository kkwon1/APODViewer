import React from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import SaveApod from "../../../hooks/SaveApod";

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 100px;
  margin-right: 100px;
  margin-bottom: 50px;
`;

const baseUrl = "http://localhost:8081/api/v1/";
function ActionsContainer() {
  const [res, saveApod] = SaveApod({
    url: `${baseUrl}users/save/`,
    payload: {
      Username: "testusername",
      Action: "save",
      ApodURL: "testURL.com",
      ApodName: "This is my second APOD",
      ApodDate: "2020-04-21",
    },
  });

  return (
    <Actions>
      <IconButton disableRipple={true} disableFocusRipple={true}>
        <FavoriteBorderIcon
          onClick={() => likeButtonPressed()}
          fontSize="large"
        />
      </IconButton>
      <IconButton disableRipple={true} disableFocusRipple={true}>
        <StarBorderIcon onClick={() => saveApod()} fontSize="large" />
      </IconButton>
    </Actions>
  );
}

function likeButtonPressed() {
  console.log("You pressed Like");
}

export default ActionsContainer;
