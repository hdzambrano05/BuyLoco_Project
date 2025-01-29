var express = require('express');
var router = express.Router();


const orderitemsController = require('../controllers').orderitemsController;

router.get('/', orderitemsController.list);
router.get('/:id', orderitemsController.getById);

module.exports = router;