const express = require('express');
const router = express.Router();
const projetoController = require('../controllers/projetoController');

router.get('/', projetoController.index);
router.get('/:id', projetoController.show);
router.post('/', projetoController.store);
router.put('/:id', projetoController.update);
router.delete('/:id', projetoController.destroy);

module.exports = router;