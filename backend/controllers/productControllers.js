const Product = require('../models/productModel');
const mongoose = require('mongoose');

// GET /api/products
const getAllProducts = async (req, res) => {
  res.send('getAllProducts');
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
  res.send('getProductById');
};

// PUT /api/products/:productId
const updateProduct = async (req, res) => {
  res.send('updateProduct');
};

// DELETE /api/products/:productId
const deleteProduct = async (req, res) => {
  res.send('deleteProduct');
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
