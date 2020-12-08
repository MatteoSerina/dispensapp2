const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categories');

router.get('', categoriesController.getCategories);

module.exports = router;