const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Projeto = require('./Projeto');

const Tarefa = sequelize.define('Tarefa', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    projetoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
    },
    dataConclusao: {
        type: DataTypes.DATEONLY,
    },
    concluida: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});


Tarefa.belongsTo(Projeto, { foreignKey: 'projetoId', onDelete: 'CASCADE' });
Projeto.hasMany(Tarefa, { foreignKey: 'projetoId', onDelete: 'CASCADE', hooks: true });

module.exports = Tarefa;