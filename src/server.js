// MAIN SERVER

'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');

const v1Routes = require('./routes/v1.js');
const authRoutes = require('./auth/routes.js');

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.get('/', (req, res) => {
  res.status(201).send('Hello World');
});

app.use('/v1', v1Routes);
app.use(authRoutes);

app.use('*', notFoundHandler);
app.use(errorHandler);


module.exports = {
  app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
