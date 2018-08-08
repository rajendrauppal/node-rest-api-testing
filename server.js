
let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
const port = 8080;
let book = require('./app/routes/book');
let config = require('config');  // load the db location from JSON files

// DB options
let dbOptions = {
  authSource: "admin",
  useNewUrlParser: true
};

mongoose.connect(config.DBHOST, dbOptions);
// let db = mongoose.connection();
// db.on('error', console.error.bind(console, 'connection error:'));

// disable logs when testing
if (config.util.getEnv('NODE_ENV') != 'test') {
  app.use(morgan('combined'));  // outputs the apache style logs
}

// parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

// get home page
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to our bookstore!"
  });
});

// setup routes and controllers

// start the app
app.listen(port);
console.log('Listening on port ' + port);

module.exports = app;
