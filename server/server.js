'use strict';
const express = require('express');
const app = express();
const patents = require('./routes/patents');
const researcher = require('./routes/researcher');
const path = require('path');

app.use(express.static('dist'));
/* istanbul ignore next */
app.get('/', function (request, response) {
/* istanbul ignore next */
  response.redirect('index.html');
});
/* istanbul ignore next */
const port = process.env.PORT || 3200;
app.listen(port, function () {
  console.log(`Application listening on port ${port}`);
});

app.use('/patents', patents);

app.use('/researcher', researcher);
module.exports = app;
