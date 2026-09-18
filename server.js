const express = require("express");
const app = express();
const { startMongodb } = require('./config/db.config');
const router = require('./router/router.js');

app.use(express.json())

startMongodb();

app.use(express.static(__dirname));

app.use('/', router);

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('CSE341 Project 2');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});