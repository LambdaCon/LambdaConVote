'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/lambdacon-dev'
  },
  oauth51: {
    base_url: 'http://www.oauth51.com'
  },

  seedDB: true
};
