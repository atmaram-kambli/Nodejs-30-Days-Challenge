const mongoose = require('mongoose');

// Define the schema for the Product model
const productSchema = new mongoose.Schema({
  name: String,
  // other fields of your Product schema
}, { autoIndex: false }); // Prevent automatic index creation

// Define index on the 'name' field
productSchema.index({ name: 1 });

// Create the Product model using the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
