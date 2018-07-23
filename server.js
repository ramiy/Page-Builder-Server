const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true // enable set cookie
}));
app.use(bodyParser.json());
app.use(express.static('dist'));
app.use(cookieParser());
app.use(session({
    secret: 'QFSMZ3dBw9RCzYn8wtSW3wqFCgngByKB89y4q52NcpJX6tznAh',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));

// Main page
app.get('/', (req, res) => res.send('Welcome to Page Builder App.'));

// Site routes
const addSiteRoutes = require('./routes/siteRoute');
addSiteRoutes(app);

// User routes
const addUserRoutes = require('./routes/userRoute');
addUserRoutes(app);

// Listen to port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Page builder app listening on port ${PORT}!`));
