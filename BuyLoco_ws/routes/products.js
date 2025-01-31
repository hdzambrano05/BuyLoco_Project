const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload'); // Asegúrate de importar upload correctamente
const productsController = require('../controllers/productsController');

router.get('/', productsController.list);
router.get('/full', productsController.listFull);
router.get('/:id', productsController.getById);
router.post('/', upload.single('image'), productsController.add); // Aquí lo usas
router.put('/:id', productsController.update);
router.delete('/:id', productsController.delete);

module.exports = router;
