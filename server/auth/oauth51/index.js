'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
  .get('/', passport.authenticate('oauth2', {
    failureRedirect: '/login',
    scope: [
      'public',
      'accounts'
    ],
    session: false
  }))
  .get('/callback', passport.authenticate('oauth2', {
    failureRedirect: '/login',
    session: false
  }), auth.setTokenCookie);

module.exports = router;
