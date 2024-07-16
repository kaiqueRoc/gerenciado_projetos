'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tarefas', [
      {
        titulo: 'Tarefa 1',
        descricao: 'Descrição da Tarefa 1',
        dataConclusao: '2024-07-15',
        concluida: false,
        projetoId: 1, // ID do Projeto A
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: 'Tarefa 2',
        descricao: 'Descrição da Tarefa 2',
        dataConclusao: '2024-07-20',
        concluida: true,
        projetoId: 1, // ID do Projeto A
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tarefas', null, {});
  },
};