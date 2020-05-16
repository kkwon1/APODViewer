# APOD Viewer

[APOD Viewer](https://apodviewer.herokuapp.com/) is a React app that provides a friendly UI/UX for users to view NASA's Astronomy Picture Of the Day (APOD). You can find the official site [here](https://apod.nasa.gov/apod/astropix.html).

It interacts with the backend service [APODViewerService](https://github.com/kkwon1/APODViewerService) to retrieve data, and save user specific info.

## Description

The main purposes of this application is to let users browse NASA's APOD images more easily than from their official website. It has the added functionality of creating a personal account to like, save, or comment on images.

## Prerequisites

To run this app locally, you will need to install:

- [Node and npm](https://nodejs.org/en/download/)
- [yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)

If you would like to run the backend service to retrieve data, you will need to follow instructions for setting up the [APODViewerService](https://github.com/kkwon1/APODViewerService)

## Installation

To install all dependencies, run:

### `yarn install`

## Usage

To run the application in development mode, you can run:

### `yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Running Tests

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Build

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
