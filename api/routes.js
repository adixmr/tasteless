const express       = require('express');
const app           = express();

app.use('/test',   require('./routes/test'));

module.exports = app

