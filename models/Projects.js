var mongoose = require('mongoose');

var ProjectsSchema = new mongoose.Schema({
  _creator : { type: Number, ref: 'Clients' },
  name: String,
  type: String,
  amount: String,
  euroHour: String,
  completed: Boolean,
  note: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Projects', ProjectsSchema);