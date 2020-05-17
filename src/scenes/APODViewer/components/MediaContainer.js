import React from "react";
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import ActionsContainer from "./ActionsContainer";
import MediaDisplayer from "./MediaDisplayer";
import ApodUtils from "../utils/ApodUtils";
import { DATE_FORMAT } from "../../../Constants";
import Copyright from "../hooks/Copyright";

const MainContainer = styled(Container)`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`;

const MediaSection = styled.div`
  display: flex;
  height: 500px;
  padding-top: 50px;
`;

const MediaContainerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 100px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 50px;
`;

const ActionCopyrightContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MoreButton = styled.span`
  color: grey;
  cursor: pointer;
  text-align: center;
`;

const appStorage = window.localStorage;

const apodUtils = new ApodUtils();

// TODO: Refactor this huge component into smaller chunks. Pass data down as props from parent
class MediaContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apodData: [],
      currentIndex: 0,
      mediaUrl: "",
      hdMediaUrl: "",
      mediaDateIsToday: false,
      currentImageDate: moment(),
      text: "",
      title: "",
      mediaType: "",
      copyright: null,
      expandDetails: false,
      saveDates: [],
      likeDates: [],
    };
  }

  componentDidMount() {
    // Index of image clicked by user in main view
    let redirectIndex = this.props.currentIndex;

    // Get data from cache
    let rawApodData = appStorage.getItem("apodData");
    let cachedData = JSON.parse(rawApodData);
    let currentApod = cachedData[redirectIndex];

    let rawUserData = appStorage.getItem("userData");
    let parsedUserData = JSON.parse(rawUserData);

    this.setState({
      currentIndex: redirectIndex,
      apodData: cachedData,
      mediaUrl: currentApod.url,
      hdMediaUrl: currentApod.hdurl,
      mediaDateIsToday: dateIsToday(currentApod.date),
      text: currentApod.explanation,
      title: currentApod.title,
      mediaType: currentApod.media_type,
      currentImageDate: moment(currentApod.date),
      copyright: currentApod.copyright,
      expandDetails: false,
      saveDates: getSaveDates(parsedUserData),
      likeDates: getLikeDates(parsedUserData),
    });
  }

  // TODO: If user is viewing the last image we retrieved, make another call to backend for 30 new photos
  updateImageDate(event, numDaysToAdd) {
    let apodData = this.state.apodData;
    let newIndex = this.state.currentIndex - numDaysToAdd;
    let apod = apodData[newIndex];
    if (apod) {
      this.setState({
        currentIndex: newIndex,
        mediaUrl: apod.url,
        hdMediaUrl: apod.hdurl,
        mediaDateIsToday: dateIsToday(apod.date),
        text: apod.explanation,
        title: apod.title,
        mediaType: apod.media_type,
        currentImageDate: moment(apod.date),
        copyright: apod.copyright,
        expandDetails: false,
      });
    }
  }

  render() {
    return (
      <MainContainer>
        <HeaderContainer maxWidth="md">
          <Typography variant="h4">{this.state.title}</Typography>
        </HeaderContainer>
        <MediaSection>
          <ButtonContainer>
            <IconButton
              disabled={this.state.mediaDateIsToday}
              onClick={(e) => this.updateImageDate(e, 1)}
            >
              <ArrowBackIosRoundedIcon fontSize="large" />
            </IconButton>
          </ButtonContainer>
          <Container maxWidth="md">
            <MediaContainerWrapper>
              <MediaDisplayer
                mediaType={this.state.mediaType}
                url={this.state.mediaUrl}
                hdurl={this.state.hdMediaUrl}
              ></MediaDisplayer>
            </MediaContainerWrapper>
          </Container>
          <ButtonContainer>
            <IconButton onClick={(e) => this.updateImageDate(e, -1)}>
              <ArrowForwardIosRoundedIcon fontSize="large" />
            </IconButton>
          </ButtonContainer>
        </MediaSection>
        <ActionCopyrightContainer>
          <ActionsContainer currentApod={this.state} />
          <Copyright copyright={this.state.copyright} />
        </ActionCopyrightContainer>
        {this.state.expandDetails ? (
          <TextContainer>
            <Typography variant="h5">{this.state.text}</Typography>
          </TextContainer>
        ) : (
          <TextContainer>
            <Typography variant="h5">
              {apodUtils.displayText(this.state.text)}
              <MoreButton
                onClick={() => this.setState({ expandDetails: true })}
              >
                more
              </MoreButton>
            </Typography>
          </TextContainer>
        )}
      </MainContainer>
    );
  }
}

function dateIsToday(apodDate) {
  let now = moment().format(DATE_FORMAT);

  // apodDate is today or future date
  return now <= apodDate;
}

function getLikeDates(parsedUserData) {
  return parsedUserData && parsedUserData.UserLikes
    ? parsedUserData.UserLikes.map((s) => s.ApodDate)
    : [];
}

function getSaveDates(parsedUserData) {
  return parsedUserData && parsedUserData.UserSaves
    ? parsedUserData.UserSaves.map((s) => s.ApodDate)
    : [];
}

export default MediaContainer;
