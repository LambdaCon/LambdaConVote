'use strict';

var express = require('express');
var controller = require('./proposal.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.put('/:id/rate', auth.isAuthenticated(), controller.rate);
router.patch('/:id/rate', auth.isAuthenticated(), controller.rate);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
