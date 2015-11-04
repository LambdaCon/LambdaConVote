'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProposalSchema = new Schema({
  title: String,
  description: String,
  rating: [{}]
});

module.exports = mongoose.model('Proposal', ProposalSchema);
