const express = require('express');
const router = express.Router();

const catalogController = require('../controllers/catalog');

router.get('', catalogController.getAllTemplates);
router.post('/', catalogController.createTemplate);
router.get('/:barcode', catalogController.getTemplate);
router.put('/:id', catalogController.updateTemplate)
router.delete('/:id', catalogController.deleteTemplate)

module.exports = router;