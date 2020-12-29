const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
// Country Schema
const CountrySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  created_at: {
    type: Number,
    default: Date.now()
  },
  updated_at: {
    type: Number,
    default: Date.now()
  }
});

CountrySchema.plugin(uniqueValidator);
const Country = module.exports = mongoose.model('Country', CountrySchema);