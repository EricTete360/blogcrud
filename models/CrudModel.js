const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CrudSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  isVerified:{
    type: Boolean, 
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
 
});

module.exports = Crud = mongoose.model('crud', CrudSchema);