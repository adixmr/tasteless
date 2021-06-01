const express       = require('express');
const app           = express();

app.use('/test',   require('./routes/actionRouter'));

module.exports = app

