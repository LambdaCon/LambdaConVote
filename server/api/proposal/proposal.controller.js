'use strict';

var _ = require('lodash');
var Proposal = require('./proposal.model');

var updateRate = function (proposal) {
  proposal.rate = proposal.ratings.reduce(function (prev, current) {
    return prev + parseInt(current.rate);
  }, 0);
  return proposal;
};

// Get list of proposals
exports.index = function(req, res) {
  Proposal.find(function (err, proposals) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(proposals.map(updateRate));
  });
};

// Get a single proposal
exports.show = function(req, res) {
  Proposal.findById(req.params.id, function (err, proposal) {
    if(err) { return handleError(res, err); }
    if(!proposal) { return res.status(404).send('Not Found'); }
    return res.json(updateRate(proposal));
  });
};

// Creates a new proposal in the DB.
exports.create = function(req, res) {
  Proposal.create(req.body, function(err, proposal) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(proposal);
  });
};

// Updates an existing proposal in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Proposal.findById(req.params.id, function (err, proposal) {
    if (err) { return handleError(res, err); }
    if(!proposal) { return res.status(404).send('Not Found'); }
    var updated = _.merge(proposal, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(proposal);
    });
  });
};

// Updates an existing proposal in the DB.
exports.rate = function(req, res) {
  if(req.body._id) { delete req.body._id; }

  if (req.user._id != req.body.userId){
    return res.status(401).send('Unauthorized');
  }

  var obj = req.body;

  Proposal.findById(req.params.id, function (err, proposal) {
    if (err) { return handleError(res, err); }
    if(!proposal) { return res.status(404).send('Not Found'); }
    Proposal.update({_id: req.params.id, 'ratings.userId': obj._id }, {'ratings.rate': obj.rate, 'ratings.userId': obj.userId}, function(error, affected, raw){
      console.log(arguments);
        if (err) { return handleError(res, err); }
        return res.status(200).json({res: 'ok'});
    });


    // var updated = _.merge(proposal, req.body);
    // updated.save(function (err) {
    //   if (err) { return handleError(res, err); }
    //   return res.status(200).json(proposal);
    // });
  });
};


// Deletes a proposal from the DB.
exports.destroy = function(req, res) {
  Proposal.findById(req.params.id, function (err, proposal) {
    if(err) { return handleError(res, err); }
    if(!proposal) { return res.status(404).send('Not Found'); }
    proposal.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
