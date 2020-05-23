import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import Modal from "@material-ui/core/Modal";
import ApodViewerModal from "../../ApodViewerModal/ApodViewerModal";

const Image = styled.div`
  display: flex;
  height: 300px;
  width: 405px;
  background-size: cover;
  border-radius: 0.5rem;
  background-position: center;
  cursor: pointer;
`;

const PlaceHolder = styled.div`
  display: flex;
  height: 300px;
  width: 405px;
  border-radius: 0.5rem;

  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

// const ModalImage = styled.img`
//   display: flex;
//   height: 95%;
//   width: auto;
//   border-radius: 10px;
// `;
/*
const Video = styled.iframe`
  display: flex;
  height: 300px;
  width: 405px;
  border-radius: 0.5rem;
`
*/

// TODO:  for "Video" case, use an appropriate thumbnail
const ApodThumbnail = (props) => {
  const [mediaType, setMediatype] = useState(null);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <ModalContainer>
      {/* // <ModalContainer onClick={handleClose}> */}
      <ApodViewerModal
        title={props.title}
        url={props.url}
        description={props.description}
      />
    </ModalContainer>
  );

  useEffect(() => {
    setMediatype(props.mediaType);
    setUrl(props.url);
    setTitle(props.title);
  }, [props.hdurl, props.mediaType, props.title, props.url]);

  return (
    <Fragment>
      {mediaType === "video" ? (
        <PlaceHolder>
          <PlayCircleFilledIcon fontSize="large" />
        </PlaceHolder>
      ) : (
        <Fragment>
          {" "}
          <Image
            onClick={handleOpen}
            alt={title}
            style={{ backgroundImage: `url(${url})` }}
          />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ApodThumbnail;
