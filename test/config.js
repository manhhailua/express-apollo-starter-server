const path = require('path');

// require and configure dotenv
require('dotenv').config({
  path: path.resolve(process.cwd(), '.env.test'),
});
