var express = require('express');
var router = express.Router();


const orderitemsController = require('../controllers').orderitemsController;

router.get('/', orderitemsController.list);
router.get('/full', orderitemsController.listFull);
router.get('/:id', orderitemsController.getById);
router.post('/', orderitemsController.add);
router.put('/:id', orderitemsController.update);
router.delete('/:id', orderitemsController.delete); 

module.exports = router;