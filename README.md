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

![Unit tests](https://i.imgur.com/ofRueGd.png)

- Frontend

```bash
cd frontend
yarn test
```

![Unit tests](https://i.imgur.com/gJuNusO.png)

### Integration tests/e2e tests

- Backend

```bash
cd backend
yarn test:e2e
```

![Integration tests](https://i.imgur.com/mcCTZky.png)
