const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  itemCount: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('Category', categorySchema);
