const Projeto = require('../models/Projeto');

module.exports = {
    async index(req, res) {
        try {
            const projetos = await Projeto.findAll();
            res.status(200).json(projetos);
        } catch (error) {
            console.error('Erro ao buscar projetos:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    async show(req, res) {
        try {
            const projeto = await Projeto.findByPk(req.params.id);
            if (!projeto) {
                return res.status(404).json({ error: 'Projeto não encontrado' });
            }
            res.status(200).json(projeto);
        } catch (error) {
            console.error('Erro ao buscar projeto:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    async store(req, res) {
        try {
            const { nome, descricao, dataInicio } = req.body;
            const projeto = await Projeto.create({ nome, descricao, dataInicio });
            res.status(201).json(projeto);
        } catch (error) {
            console.error('Erro ao criar projeto:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    async update(req, res) {
        try {
            const projeto = await Projeto.findByPk(req.params.id);
            if (!projeto) {
                return res.status(404).json({ error: 'Projeto não encontrado' });
            }
            await projeto.update(req.body);
            res.status(200).json(projeto);
        } catch (error) {
            console.error('Erro ao atualizar projeto:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    async destroy(req, res) {
        try {
            const projeto = await Projeto.findByPk(req.params.id);
            if (!projeto) {
                return res.status(404).json({ error: 'Projeto não encontrado' });
            }
            await projeto.destroy();
            res.status(200).json({ message: 'Projeto excluído com sucesso' });
        } catch (error) {
            console.error('Erro ao excluir projeto:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },
};
