const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define Category Schema
const categorySchema = new mongoose.Schema({
  name: String,
});

// Define Product Schema with reference to Category
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

// Create Category and Product models
const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);

// Retrieve all products with populated category details
async function getProductsPopulatedWithCategory() {
  try {
    const products = await Product.find().populate('category').exec();
    return products;
  } catch (error) {
    console.error("Error fetching products with populated category:", error);
    return [];
  }
}

// Define route to get products with populated category details
app.get('/products', async (req, res) => {
  try {
    const products = await getProductsPopulatedWithCategory();
    res.json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
