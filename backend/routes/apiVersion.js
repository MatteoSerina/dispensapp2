const express = require('express');
const router = express.Router();

const apiVersionController = require('../controllers/apiVersion');

router.get('', apiVersionController.getVersion);
module.exports = router;