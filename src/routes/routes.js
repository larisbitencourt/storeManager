const express = require('express');
const router = express.Router();
const productsController  = require('../controllers/productsController')

router.post('/products', productsController.saveProducts);

router.get('/products/', productsController.getAll);

router.get('/products/:id', productsController.getById);

router.put('/products/:id', productsController.updateProduct)



module.exports = router;