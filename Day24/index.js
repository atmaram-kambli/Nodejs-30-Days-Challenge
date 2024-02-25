const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/productsDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define product schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number
});

// Create Product model
const Product = mongoose.model('Product', productSchema);

// Express app
const app = express();
app.use(express.json());

// Route to create a new product
app.post('/products', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const product = new Product({ name, description, price });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to retrieve all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to update a product
app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete a product
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    await product.remove();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
