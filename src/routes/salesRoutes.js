const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.post('/', salesController.saveSales);

// router.get('/products/', salesController.getAll);

// router.get('/products/:id', salesController.getById);

// router.put('/products/:id', salesController.updateProduct);

// router.delete('/products/:id', salesController.deleteProduct);





module.exports = router;