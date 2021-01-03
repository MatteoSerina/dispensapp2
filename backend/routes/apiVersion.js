const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const apiVersionController = require('../controllers/apiVersion');

router.get('', auth, apiVersionController.getVersion);
module.exports = router;