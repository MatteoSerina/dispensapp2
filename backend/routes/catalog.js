const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const catalogController = require('../controllers/catalog');

router.get('/:barcode', auth, catalogController.getGoodByBarcode);
router.post('/:category', auth, catalogController.addItem);
router.put('/:barcode', auth, catalogController.updateItem);
router.delete('/:barcode', auth, catalogController.deleteItem);

module.exports = router;