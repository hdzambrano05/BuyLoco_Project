var express = require('express');
var router = express.Router();


const productsController = require('../controllers').productsController;

router.get('/', productsController.list);
router .get('/:id', productsController.getById);

module.exports = router;