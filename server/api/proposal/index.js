'use strict';

var express = require('express');
var controller = require('./proposal.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('moderator'), controller.create);
router.put('/:id', auth.hasRole('moderator'), controller.update);
router.patch('/:id', auth.hasRole('moderator'), controller.update);
router.put('/:id/rate', auth.isAuthenticated(), controller.rate);
router.patch('/:id/rate', auth.isAuthenticated(), controller.rate);
router.delete('/:id', auth.hasRole('moderator'), controller.destroy);

module.exports = router;
