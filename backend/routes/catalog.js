const express = require('express');
const router = express.Router();

const catalogController = require('../controllers/catalog');

router.get('', catalogController.getAllTemplates);
router.post('/', catalogController.createTemplate);
router.get('/:barcode', catalogController.getTemplate);
router.put('/:barcode', catalogController.updateTemplate)
router.delete('/:barcode', catalogController.deleteTemplate)

module.exports = router;