const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
    unique: true,
  },
  origin: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Ingredient', ingredientSchema);