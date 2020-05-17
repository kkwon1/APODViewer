import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "@material-ui/core/Modal";

const mediaHeight = "500px";

const Image = styled.img`
  display: flex;
  border-radius: 25px;
  height: ${mediaHeight};
  cursor: pointer;
`;

const Video = styled.iframe`
  display: flex;
  border-radius: 25px;
  height: ${mediaHeight};
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
  height: 90%;
  width: auto;
  border-radius: 10px;
`;

const MediaDisplayer = (props) => {
  const [mediaType, setMediatype] = useState(null);
  const [url, setUrl] = useState("");
  const [hdurl, setHdUrl] = useState("");

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <ModalContainer onClick={handleClose}>
      <ModalImage src={hdurl ? hdurl : url} />
    </ModalContainer>
  );

  useEffect(() => {
    setMediatype(props.mediaType);
    setUrl(props.url);
    setHdUrl(props.hdurl);
  }, [props.hdurl, props.mediaType, props.url]);

  return (
    <div>
      {mediaType === "image" ? (
        <div>
          <Image onClick={handleOpen} src={url} />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </div>
      ) : (
        <Video src={url} />
      )}
    </div>
  );
};

export default MediaDisplayer;
