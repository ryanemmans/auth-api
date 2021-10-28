'use strict';

require('dotenv').config();
const app = require('./src/server.js');
const { db } = require('./src/auth/models');

const PORT = process.env.PORT || 3001;

db.sync().then(() => {
  app.start(PORT);
});
