var express = require('express');
var router = express.Router();


const categoriesController = require('../controllers').categoriesController;

router.get('/', categoriesController.list);
router.get('/:id', categoriesController.getById);

module.exports = router;