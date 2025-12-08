const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.post('/', salesController.saveSales);

router.get('/', salesController.getAllSales);

router.get('/:id', salesController.getSalesById);

router.put('/:id', salesController.updateSale);

// router.delete('/products/:id', salesController.deleteProduct);





module.exports = router;