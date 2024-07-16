const request = require('supertest');
const server = require('../app'); // Importar o servidor, não apenas o app

// Mock para dados de teste
const mockProjeto = {
    nome: 'Novo Projeto para Teste',
    descricao: 'Descrição do Novo Projeto para Teste',
    dataInicio: '2024-07-20',
};

describe('Testes das rotas de Projeto e Tarefa', () => {
    let projetoId;
    let tarefaId;

    // Teste para criar um novo projeto
    it('Deve criar um novo projeto', async () => {
        const response = await request(server)
            .post('/api/projetos')
            .send(mockProjeto)
            .expect(201);

        projetoId = response.body.id;
    });

    // Testes das rotas de Tarefa
    describe('Testes das rotas de Tarefa', () => {
        // Teste para criar uma nova tarefa
        it('Deve criar uma nova tarefa', async () => {
            const mockTarefa = {
                titulo: 'Tarefa de Teste',
                descricao: 'Descrição da Tarefa de Teste',
                dataConclusao: '2024-07-30',
                concluida: false,
                projetoId: projetoId, // Usar o ID do projeto criado
            };

            const response = await request(server)
                .post('/api/tarefas/salvar')
                .send(mockTarefa)
                .expect(201);

            expect(response.body).toHaveProperty('id');
            tarefaId = response.body.id;
        });

        // Teste para obter todas as tarefas
        it('Deve retornar todas as tarefas', async () => {
            await request(server)
                .get(`/api/tarefas/${projetoId}`)
                .expect(200);
        });

        // Teste para obter uma tarefa específica pelo ID
        it('Deve retornar uma tarefa específica', async () => {
            await request(server)
                .get(`/api/tarefas/${tarefaId}`)
                .expect(200);
        });

        // Teste para atualizar uma tarefa existente
        it('Deve atualizar uma tarefa existente', async () => {
            const updatedData = {
                titulo: 'Tarefa Atualizada',
                descricao: 'Descrição da Tarefa Atualizada',
                dataConclusao: '2024-08-15',
                concluida: true,
            };

            await request(server)
                .put(`/api/tarefas/${tarefaId}`)
                .send(updatedData)
                .expect(200);
        });

        // Teste para excluir uma tarefa
        it('Deve excluir uma tarefa', async () => {
            await request(server)
                .delete(`/api/tarefas/${tarefaId}`)
                .expect(200);
        });
    });

    // Limpeza após os testes, se necessário
    afterAll(async () => {
        // Adicione aqui qualquer limpeza necessária após os testes
    });
});
