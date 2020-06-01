import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ApodThumbnail from "../Main/components/ApodThumbnail";

const GridView = (props) => {
  return (
    <GridList spacing={10} cellHeight={300} cols={3}>
      {props.data.apods.map((apodTile, index) => (
        <GridListTile key={apodTile.ApodDate} cols={1}>
          <ApodThumbnail
            className="apod-tile"
            mediaType={apodTile.MediaType}
            title={apodTile.Title}
            url={apodTile.ApodURL}
            description={apodTile.Description}
            currentIndex={index}
            setApod={props.setApod}
            prevApod={props.prevApod}
            nextApod={props.nextApod}
            action={props.updateLikeSave}
            currentApod={props.modalApod}
          />
        </GridListTile>
      ))}
    </GridList>
  );
};

export default GridView;
