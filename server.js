require('dotenv').config();
const express = require("express");
const app = express();
const { startMongodb } = require('./config/db.config');
const router = require('./router/router.js');
const passport = require('passport');
const expressSession = require('express-session');
const cors = require('cors');
const GitHubStrategy = require('passport-github2').Strategy;

app.use(express.json())

app
    .use(expressSession({
        secret: process.env.SESSION_SECRET || "secret",
        resave: false,
        saveUninitialized: true
    }))

    .use(passport.initialize())

    .use(passport.session())

    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader('Access-Control-Allow-Methods', 
            'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        next();
    });

startMongodb();
app.use(cors({ methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"] }));
app.use(cors({ origin: '*' }));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
},
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use(express.static(__dirname));

app.use('/', router);

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('CSE341 Project 2');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});