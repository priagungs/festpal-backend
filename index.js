// Import modules
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cors = require('cors');

let app = express();

// Using required module
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to database
mongoose.connect('mongodb://localhost/festpal-backend', { useNewUrlParser: true});
var db = mongoose.connection;

// Setup API routes
let router = require('./router');
app.use('/api', router);

// Setup server port
var port = process.env.PORT || 3000;
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running Festpal-backend on port " + port);
});

