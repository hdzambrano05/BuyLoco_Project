var express = require('express');
var router = express.Router();


const reviewsController = require('../controllers').reviewsController;

router.get('/', reviewsController.list);
router.get('/full', reviewsController.listFull);
router.get('/:id', reviewsController.getById);
router.post('/', reviewsController.add);
router.put('/:id', reviewsController.update);
router.delete('/:id', reviewsController.delete);

module.exports = router;