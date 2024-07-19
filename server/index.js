const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const rozarpay = require('./routes/rozarpay/rozarpay');

const app = express();
const port = 3500;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
    cors({
        // origin: 'https://blogapplicatonfrontend.onrender.com',
        origin: 'http://localhost:5173',
        optionsSuccessStatus: 200,
        preflightContinue: true,
        credentials: true,
        allowedHeaders: "Content-Type , Authorization",
    })
);

app.options('*', cors({
    // origin: 'https://blogapplicatonfrontend.onrender.com',
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
    preflightContinue: true,
    credentials: true,
    allowedHeaders: "Content-Type , Authorization",
}));

app.use('', rozarpay)

app.listen(port, () => {
    console.log(`server is running ${port}`);
})