const express = require("express");
const app = express();
const { startMongodb } = require('./config/db.config');
const router = require('./router/router.js');

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

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