const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const categoriesController = require('../controllers/categories');

router.get('', auth, categoriesController.getCategories);

module.exports = router;