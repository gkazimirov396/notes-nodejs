# Getting Started with a Nodejs Note App

## Available Scripts

In the project directory, you can run:

### `npm start`

Starts up the server in watch mode on http://localhost:5000

The app will reload when you make changes.\
You may also see logs and errors in the console.

## Project Setup:

### You need:

- Database (MongoDB)
- Google Console Account to create the API Auth Key's

### Create .env file

Create a .env file, following the structure of `.env.example` file, to store your credentials. Example below:

```
PORT = Optional, defaults to 5000
SESSION_SECRET = any string value (e.g: mysecret)
MONGO_URI = mongodb+srv://<username>:<password>@mongodburlhere
GOOGLE_CLIENT_ID= YOUR_GOOGLE_ID_HERE
GOOGLE_CLIENT_SECRET= YOUR_GOOGLE_CLIENT_SECRET_HERE
GOOGLE_CALLBACK_URL=http://localhost:5000/google/callback
```

## Installation

To install and run this project - install dependencies using npm and then start your server:

```
$ npm install
$ npm start
```

And the server will start up in watch mode.
