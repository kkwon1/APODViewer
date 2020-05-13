import React from "react";
import styled from "styled-components";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

const Image = styled.img`
  display: flex;
  height: 300px;
  width: 405px;
  border-radius: 0.5rem;
`;

const PlaceHolder = styled.div`
  display: flex;
  height: 300px;
  width: 405px;
  border-radius: 0.5rem;

  justify-content: center;
  align-items: center;
`;
/*
const Video = styled.iframe`
  display: flex;
  height: 300px;
  width: 405px;
  border-radius: 0.5rem;
`
*/

// TODO:  for "Video" case, use an appropriate thumbnail
class ApodThumbnail extends React.Component {
  render() {
    switch (this.props.mediaType) {
      case "video":
        return (
          <PlaceHolder>
            <PlayCircleFilledIcon fontSize="large" />
          </PlaceHolder>
        );
      // Capture image case
      default:
        return <Image alt={this.props.title} src={this.props.url} />;
    }
  }
}

export default ApodThumbnail;
