const express = require('express');
const cors = require('cors');

const router = require('./routes');

const app = express();

app.use(express.json());

app.use(cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use('/api/v1', router);

module.exports = app;
