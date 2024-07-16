const Tarefa = require('../models/Tarefa');
const Projeto = require('../models/Projeto');
module.exports = {
    async index(req, res) {
        try {
            const tarefas = await Tarefa.findAll({
                where: { projetoId: req.params.projetoId },
                include: Projeto,
            });
            res.status(200).json(tarefas);
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },
    async show(req, res) {
        try {
            const { id } = req.params;
            const tarefa = await Tarefa.findAll({ where: { projetoId: id } });
            if (!tarefa) {
                return res.status(404).json({ error: 'Nenhuma tarefa encontrada para o ProjetoId fornecido' });

            }
            res.status(200).json(tarefa);
        } catch (error) {
            console.error('Erro ao buscar tarefa:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    async store(req, res) {
        try {

            const { titulo, descricao, dataConclusao, concluida, projetoId } = req.body;

            if (!projetoId) {
                return res.status(400).json({ error: 'ProjetoId é obrigatório' });
            }

            const projetoData = await Projeto.findOne({ where: { id: projetoId } });


            if (!projetoData) {
                return res.status(404).json({ error: 'Projeto não encontrado' });
            }

            const tarefa = await Tarefa.create({ titulo, descricao, dataConclusao, concluida, projetoId  });
            res.status(201).json(tarefa);
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },
    async update(req, res) {
        try {
            const tarefa = await Tarefa.findByPk(req.params.id);
            if (!tarefa) {
                return res.status(404).json({ error: 'Tarefa não encontrada' });
            }

            const { titulo, descricao, dataConclusao, concluida } = req.body;
            await tarefa.update({ titulo, descricao, dataConclusao, concluida });

            res.status(200).json(tarefa);
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    async destroy(req, res) {
        try {
            const tarefa = await Tarefa.findByPk(req.params.id);
            if (!tarefa) {
                return res.status(404).json({ error: 'Tarefa não encontrada' });
            }

            await tarefa.destroy();
            res.status(200).json({ message: 'Tarefa excluída com sucesso' });
        } catch (error) {
            console.error('Erro ao excluir tarefa:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },


};
