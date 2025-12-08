const express = require('express');
const router = express.Router();
const productsController  = require('../controllers/productsController');

router.post('/', productsController.saveProducts);

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

router.put('/:id', productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);





module.exports = router;