import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ApodUtils from "../../utils/ApodUtils";

const CardContainer = styled(Card)`
  width: 1000px;
  height: 900px;
  overflow: overlay !important;
`;

const Header = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const Image = styled.div`
  display: flex;
  height: 600px;
  width: 1000px;
  background-size: cover;
  background-position: center;
`;

const MoreButton = styled.span`
  color: grey;
  cursor: pointer;
  text-align: center;
`;

const apodUtils = new ApodUtils();

const ApodViewerModal = (props) => {
  const [currentDescExpand, setExpand] = useState(false);

  useEffect(() => {
    setExpand(false);
  }, []);

  return (
    <CardContainer>
      <Header variant="h4">{props.title}</Header>
      <Image
        style={{
          backgroundImage: `url(${props.url})`,
        }}
      />
      <CardActions>
        <IconButton disableRipple={false} disableFocusRipple={true}>
          <FavoriteBorderIcon fontSize="large" />
        </IconButton>
        <IconButton disableRipple={false} disableFocusRipple={true}>
          <BookmarkBorderIcon fontSize="large" />
        </IconButton>
      </CardActions>
      <CardContent>
        {currentDescExpand ? (
          <Typography variant="body1" component="p">
            {props.description}
          </Typography>
        ) : (
          <Typography variant="body1" component="p">
            {apodUtils.displayText(props.description)}
            <MoreButton onClick={() => setExpand(true)}>more</MoreButton>
          </Typography>
        )}
      </CardContent>
    </CardContainer>
  );
};

export default ApodViewerModal;
