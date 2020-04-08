const express = require('express'),
app = express(),
port = process.env.PORT || 3001;

const bodyParser = require('body-parser'),
routes = require('./src/Routes');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

routes(app);
app.listen(port);

console.log('Message RESTful API server started on: ' + port);