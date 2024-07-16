const express = require('express');
const router = express.Router({ mergeParams: true }); // Permite acesso aos parâmetros do projeto
const tarefaController = require('../controllers/tarefaController');

router.get('/', tarefaController.index);
router.get('/:id', tarefaController.show);
router.post('/salvar', tarefaController.store);
router.put('/:id', tarefaController.update);
router.delete('/:id', tarefaController.destroy);

module.exports = router;
