const express = require('express');
const app = express();
const config = require('./config');


app.use(express.json());

function authenticate(req, res, next) {
    if (req.headers.token && verifyToken(req)) {
        next();
    }
    else {
        return res.status(401).send('Unauthorization Error');
    }
}

function verifyToken(req) {
    if (req.headers.token === config.secret) {
        return true;
    }
    return false;
}



//Simple Route

app.get('/', (req, res) => {
    res.status(200).send('Hello Node')
    console.log(req.headers);
});

// Authenticated Routes
app.get('/auth', authenticate, (req, res) => {
    res.status(200).send('User is Authorize');
})



const port = config.PORT || 3000;

app.listen(port, () => {
    console.log('Server Listening on Port Number', port);
})