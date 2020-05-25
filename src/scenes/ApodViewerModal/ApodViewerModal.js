import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ApodUtils from "../../utils/ApodUtils";
import Modal from "@material-ui/core/Modal";

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
  cursor: pointer;
`;

const MoreButton = styled.span`
  color: grey;
  cursor: pointer;
  text-align: center;
`;

const ModalContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const ModalImage = styled.img`
  display: flex;
  height: 95%;
  width: auto;
  border-radius: 10px;
`;

const apodUtils = new ApodUtils();

const ApodViewerModal = (props) => {
  const [currentDescExpand, setExpand] = useState(false);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setExpand(false);
  }, []);

  const body = (
    <ModalContainer onClick={handleClose}>
      <ModalImage src={props.apod.url} />
    </ModalContainer>
  );

  return (
    <CardContainer>
      <Header variant="h4">{props.apod.title}</Header>
      <Image
        onClick={handleOpen}
        style={{
          backgroundImage: `url(${props.apod.url})`,
        }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
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
            {props.apod.explanation}
          </Typography>
        ) : (
          <Typography variant="body1" component="p">
            {apodUtils.displayText(props.apod.explanation)}
            <MoreButton onClick={() => setExpand(true)}>more</MoreButton>
          </Typography>
        )}
      </CardContent>
      <Button onClick={props.prevApod}>Prev</Button>
      <Button onClick={props.nextApod}>Next</Button>
    </CardContainer>
  );
};

export default ApodViewerModal;
