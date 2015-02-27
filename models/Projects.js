var mongoose = require('mongoose');

var ProjectsSchema = new mongoose.Schema({
  name: String,
  type: String,
  amount: String,
  euroHour: String,
  completed: Boolean,
  note: String,
  _client: { type: String, ref: 'Clients' },
  hours: [{type: mongoose.Schema.Types.ObjectId, ref : 'Hours'}],
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Projects', ProjectsSchema);