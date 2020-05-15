const Sequelize = require('sequelize');
const dbConnector = require('../db');

const Respostas = dbConnector.define('RESPOSTAS', {
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },

    questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

/**
 * @description Sincronizando a minha model com o Banco de Dados
 * @param force:false Evita que a tabela seja recriada caso ela exista
 */
Respostas.sync({ force: false });
module.exports = Respostas;