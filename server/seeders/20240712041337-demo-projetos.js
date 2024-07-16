'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Projetos', [
      {
        nome: 'Projeto A',
        descricao: 'Descrição do Projeto A',
        dataInicio: '2024-07-01',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Projeto B',
        descricao: 'Descrição do Projeto B',
        dataInicio: '2024-06-15',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Projetos', null, {});
  },
};