const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const storageController = require('../controllers/storage');

router.get('', auth, storageController.getAllGoods);
router.post('/', auth, storageController.createGood);
router.put('/:id', auth, storageController.updateGood);
router.get('/:category', auth, storageController.getGood);
router.delete('/:category', auth, storageController.deleteGood);

module.exports = router;