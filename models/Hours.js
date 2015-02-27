var mongoose = require('mongoose');

var HoursSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  amount: String,
  note: String,
  _project: { type: String, ref: 'Projects' },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Hours', HoursSchema);