'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProposalSchema = new Schema({
  title: String,
  description: String,
  rate: Number,
  ratings: [{}]
});

module.exports = mongoose.model('Proposal', ProposalSchema);

// todo usare il virtual per il rate 
