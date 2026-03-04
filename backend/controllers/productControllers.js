const Product = require('../models/productModel');
const mongoose = require('mongoose');

// GET /api/products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/products
const createProduct = async (req, res) => {
  const {
    productName,
    caregory,
    description,
    price,
    inventoryCount,
    supplier,
  } = req.body;
  try {
    const product = await Proroduc.create({
      productName,
      caregory,
      description,
      price,
      inventoryCount,
      supplier,
    });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  // res.send('createProduct');
};

// GET /api/products/:productId
const getProductById = async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).json({ error: 'Invalid product ID' });
  }
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Invalid product ID' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  // res.send('getProductById');
};

// PUT /api/products/:productId
const updateProduct = async (req, res) => {
  res.send('updateProduct');
};

// DELETE /api/products/:productId
const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: 'Product not found' });
  }
  try {
    const product = await Product.findOneAndDelete({ _id: productId });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
