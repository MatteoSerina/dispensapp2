const express = require('express');
const router = express.Router();

const catalogController = require('../controllers/catalog');

router.get('/:barcode', catalogController.getGoodByBarcode);
router.post('/:category', catalogController.addItem);
router.put('/:barcode', catalogController.updateItem);
router.delete('/:barcode', catalogController.deleteItem);

module.exports = router;