var mongoose = require('mongoose');

var ClientsSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  note: String,
  projects: [{type: mongoose.Schema.Types.ObjectId, ref : 'Projects'}],
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Clients', ClientsSchema);