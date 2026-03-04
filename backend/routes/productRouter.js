const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productControllers');

//!Public (no auth)

// GET /api/products
router.get('/', getAllProducts);
// GET /api/products/:productId
router.get('/:productId', getProductById);

//!Protected (auth required)
router.use(requireAuth);

// POST /api/products
router.post('/', createProduct);

// PUT /api/products/:productId
router.put('/:productId', updateProduct);

// DELETE /api/products/:productId
router.delete('/:productId', deleteProduct);

module.exports = router;
