import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import FullscreenRoundedIcon from "@material-ui/icons/FullscreenRounded";
import ApodUtils from "../../utils/ApodUtils";
import Modal from "@material-ui/core/Modal";
import Copyright from "./Copyright";
import ActionsContainer from "./ActionsContainer";
import { DEVICE } from "../../Constants";

const Container = styled.div`
  display: flex;
`;

const CardContainer = styled(Card)`
  @media ${DEVICE.tablet} {
    width: 600px
    height: 500px;
  }
  @media ${DEVICE.laptop} {
    width: 800px
    height: 700px;
  }
  @media ${DEVICE.laptopL} {
    width: 900px
    height: 800px;
  }
  @media ${DEVICE.desktop} {
    width: 1000px
    height: 900px;
  }
  overflow: overlay !important;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
`;

const CardActionsContainer = styled(CardActions)`
  display: flex;
  justify-content: space-between;
`;

const Header = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const Image = styled.div`
  display: flex;
  height: 65%;
  width: 100%;
  background-size: cover;
  background-position: center;
  justify-content: flex-end;
  align-items: flex-end;
`;

const MoreButton = styled.span`
  color: grey;
  cursor: pointer;
  text-align: center;
`;

const FullScreenModalContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: black;
  align-items: center;
  justify-content: center;
`;

const FullScreenModalImage = styled.img`
  display: flex;
  height: 100%;
  width: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FullScreenIcon = styled(FullscreenRoundedIcon)`
  padding: 20px;
  cursor: pointer;
`;

const DateText = styled(Typography)`
  color: grey;
  padding-bottom: 10px;
`;

const apodUtils = new ApodUtils();

const ApodViewerModal = (props) => {
  const node = useRef();
  const [currentDescExpand, setExpand] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = useCallback(
    (e) => {
      if (node.current.contains(e.target)) {
        return;
      }

      if (!open) {
        props.closeModal();
      }
    },
    [open, props]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowRight") {
        props.nextApod();
      } else if (event.key === "ArrowLeft") {
        props.prevApod();
      }
    },
    [props]
  );

  useEffect(() => {
    setExpand(false);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handleClick, handleKeyDown]);

  const body = (
    <FullScreenModalContainer onClick={handleClose}>
      <FullScreenModalImage src={props.currentApod.apod.ApodURL} />
    </FullScreenModalContainer>
  );

  return (
    <Container ref={node}>
      <ButtonContainer>
        <IconButton style={{ color: "white" }} onClick={props.prevApod}>
          <ArrowBackIosRoundedIcon fontSize="large" />
        </IconButton>
      </ButtonContainer>
      <CardContainer>
        <Header variant="h4">{props.currentApod.apod.ApodName}</Header>
        <Image
          style={{
            backgroundImage: `url(${props.currentApod.apod.ApodURL})`,
          }}
        >
          <FullScreenIcon
            onClick={handleOpen}
            style={{ color: "white" }}
            fontSize="large"
          />
        </Image>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
        <CardActionsContainer>
          <ActionsContainer
            currentApod={props.currentApod}
            action={props.action}
          />
          <Copyright copyright={props.currentApod.apod.Copyright} />
        </CardActionsContainer>
        <CardContent>
          <DateText variant="body1" component="p">
            {props.currentApod.apod.ApodDate}
          </DateText>
          {currentDescExpand ? (
            <Typography variant="body1" component="p">
              {props.currentApod.apod.Description}
            </Typography>
          ) : (
            <Typography variant="body1" component="p">
              {apodUtils.displayText(props.currentApod.apod.Description)}
              <MoreButton onClick={() => setExpand(true)}>more</MoreButton>
            </Typography>
          )}
        </CardContent>
      </CardContainer>
      <ButtonContainer>
        <IconButton style={{ color: "white" }} onClick={props.nextApod}>
          <ArrowForwardIosRoundedIcon fontSize="large" />
        </IconButton>
      </ButtonContainer>
    </Container>
  );
};

export default ApodViewerModal;
