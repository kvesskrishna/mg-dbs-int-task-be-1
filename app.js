const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const routes = require('./routes/index');
const app = express();
// Bring in the database object
const config = require('./config/database');
// Defining the PORT
const PORT = 5000;

// Mongodb Config
mongoose.set('useCreateIndex', true);

// Connect with the database
mongoose.connect(config.database, {
  useNewUrlParser: true
})
  .then(() => {
    console.log('Databse connected successfully ' + config.database);
    // console.log(process.env);
  }).catch(err => {
    console.log(err, "error=====================>>>>>>>>>>>>");
  });

// session

app.use(logger('dev'));

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Welcome to Mobigesture' });
});
app.use('/api', routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({ success: false, message: 'Not found', status: 404 });
});

// check app is working on given port
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;