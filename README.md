# Video Sharing Platform

A video-sharing platform built with React, Vite, Nest.js, WebSocket, and TypeScript, enabling users to effortlessly share their favorite YouTube links.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Live Build

- [Video Sharing Platform](https://video-sharing-platform-wine.vercel.app/) 👈

## Introduction

Video Sharing Platform, written in TypeScript, is designed to make sharing YouTube videos quick and easy. Simply copy and paste the URL of the video you want to share, and the app will generate a preview. It uses Nest.js, React, TypeScript, Vite as the build tool, and WebSocket (Socket.io).

## Features

- Share YouTube videos with a single click
- Receive real-time updates on shared videos
- View video previews in a clean, responsive interface
- Enjoy a seamless user experience across devices

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) 18.20.5 (LTS) which includes [Node Package Manager](https://www.npmjs.com/get-npm)
- [MongoDB](https://www.mongodb.com/download-center/community)
- [Git](https://git-scm.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)

## Installation & Configuration

To start using Video Sharing, clone the repository:

```bash
git clone https://github.com/toannn00/video-sharing-platform.git
cd video-sharing-platform
```

- Install the required packages via Yarn:

- Backend

```bash
cd backend
yarn install
```

- Frontend

```bash
cd frontend
yarn install
```

## **Database Setup**

Download and install [MongoDB](https://www.mongodb.com/download-center/community). Once the download is complete, double-click the file to begin the installation.

Follow the prompts to install MongoDB, keeping the default settings for most options. Once installed, start the MongoDB server by running the following command in a terminal or command prompt:

```bash
mongod
```

This will launch the MongoDB server, which should now be running on your local machine.

## Running the Application for Development

- Frontend

```bash
cd frontend
yarn dev
```

- Backend

```bash
cd backend
yarn start:dev
```

## Testing

### Unit tests

- Backend

```bash
cd backend
yarn test
```

<img src="https://i.imgur.com/ofRueGd.png" width="600" />

- Frontend

```bash
cd frontend
yarn test
```

<img src="https://i.imgur.com/gJuNusO.png" width="600" />

### Integration tests/e2e tests

- Backend

```bash
cd backend
yarn test:e2e
```

<img src="https://i.imgur.com/mcCTZky.png" width="600" />

### GitHub Actions

<img src="https://i.imgur.com/W7pTI1o.png" width="600" />

## Environment Variables

### Backend

- `DB_URI`: MongoDB connection URI.
- `JWT_SECRET`: Secret key for generating authentication tokens.
- `JWT_EXPIRES`: Expiration time for JWT tokens.
- `PORT`: Server port for development or testing.

### Frontend

- `VITE_API_URL`: API URL of the backend service.
- `VITE_API_WS_URL`: API URL of the backend WebSocket service.

## Docker Deployment

First, install [Docker Desktop](https://www.docker.com/products/docker-desktop) on your device. Verify the installation by running the following command:

```bash
docker --version
```

Next, locate the docker-compose.yml file in the root directory of the project. Then, open a terminal folder and run:

- Backend

```bash
cd backend
docker-compose up --build
```

- Frontend

```bash
cd frontend
docker-compose up --build
```

Once the containers are built and running, they will be displayed as shown below:

<img src="https://i.imgur.com/B62ODe0.png" width="600" />

## Heroku Deployment

### Prerequisites

- [Heroku account](https://signup.heroku.com/)
- [Heroku CLI](https://cli.heroku.com/)

### Overview

`Heroku Node.js` support will only be applied when the application has a `package.json` file in the root directory

### Build the app and run it locally

```bash
cd backend
heroku local web
```

Start your app locally using the `heroku local` command, which is installed as part of the `Heroku CLI`

```bash
heroku local web
```

Your app should now be running on `http://localhost:<your-port>`.

## Deploy the application

### Backend (Heroku)

After you commit your changes to git, you can deploy your app to `Heroku`

```bash
git add .
git commit -m "Something"
heroku login
heroku create
git push heroku master
```

To open the app in your browser, type:

```bash
heroku open
```

### Frontend (Vercel)

- [Vercel CLI](https://vercel.com/docs/cli)

Run the following command:

#### For preview

```bash
cd frontend
vercel .
```

#### For production

```bash
cd frontend
vercel . --prod
```

## Notable Packages

- [Nest.js](https://docs.nestjs.com/)
- [Socket.io](https://socket.io/docs/v4/)
- [Vite.js](https://www.npmjs.com/package/vite)
- [Ant Design](https://www.npmjs.com/package/antd)
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [Axios](https://www.npmjs.com/package/axios)
- [ReactPlayer](https://www.npmjs.com/package/react-player)
- [JWT](https://www.npmjs.com/package/jwt)
- more and more can be found at frontend/package.json and backend/package.json files.

## API Document

## Features

### Authentication

The Auth APIs enables you to manage all aspects of user identity. If offers endpoints so users can log in, sign up.

#### Register & Login account

Description: The Register and Login API lets user create an account if the email they entered is not registered yet in the database or performing authenticate if the account is registered.

- **URL**: /v1/auth/login

- **Method**: POST

- **URL Params**: None

- **Request Body**:

```json
{
  "email": "example@email.com",
  "password": "password"
}
```

- **Success Response**:

- Code: 201 or 200

- Content:

```json
{
  "token": "your token here"
}
```

- **Error Response**:

- Condition: There was a problem with the request. Check the request parameters and JSON format.

- Code: 401

- Content:

```json
{
  "statusCode": 401,
  "message": "Invalid email or password",
  "error": "Unauthorized"
}
```

#### Video Management

#### Get all videos

Description: Get videos in system and return a list of videos.

- **URL**: /v1/video

- **Method**: GET

- **URL Params**: None

- **Success Response**:

- Code: 200

- Content:

```json
[
  {
    "title": "Test2",
    "description": "Test2",
    "url": "https://www.youtube.com/watch?v=testing1234"
  },
  {
    "title": "Test1",
    "description": "Test1",
    "url": "https://www.youtube.com/watch?v=testing123"
  }
]
```

#### Create a video

- **URL**: /v1/video

- **Method**: POST

- **Request Headers**:

```
{ "Authorization" : "Bearer token" }
```

- **Success Response**:

- Code: 200

- Content:

```json
{
  "title": "Test3",
  "description": "test3",
  "url": "https://www.youtube.com/watch?v=Test3",
  "user": "645f4102ee701bd6de3b6a74",
  "_id": "645f44e6ee701bd6de3b6a7c",
  "createdAt": "2025-02-12T08:05:58.197Z",
  "updatedAt": "2025-02-12T08:05:58.197Z",
  "__v": 0
}
```

- **Error Response**:

- Code: 401

- Content:

```json
{
  "statusCode": 401,
  "error": "Unauthorized"
}
```
