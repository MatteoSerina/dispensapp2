const express = require('express');
const router = express.Router();

const storageController = require('../controllers/storage');

router.get('', storageController.getAllGoods);
router.post('/', storageController.createGood);
router.put('/:category', storageController.updateGood);
router.get('/:category', storageController.getGood);
router.delete('/:category', storageController.deleteGood);

module.exports = router;