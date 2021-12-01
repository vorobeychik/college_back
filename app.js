const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const musicUserController = require('./musicUser/musicUserController');
const userController = require('./user/user.controller');
const filmController = require('./film/film.controller');
const planController = require('./plan/plan.controller')

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { uri, devOrigin } = require('./constants/const');
require('dotenv').config()

const app = express();

const port = process.env.PORT || 4000;

app.use(
    cors({
        origin: [devOrigin],
        credentials: true,
    })
)
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/api/music_user', musicUserController);
app.use('/api/user', userController);
app.use('/api/film', filmController);
app.use('/api/plan', planController);


async function start() {
    await mongoose.connect(uri);

    app.listen(port,() => {
        console.log(`Server listening on port ${port}`)
    })
}

start()

