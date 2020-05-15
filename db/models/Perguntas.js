const Sequelize = require('sequelize');
const dbConnection = require('../db');

const Perguntas = dbConnection.define('PERGUNTAS', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

/**
 * @description Sincronizando a minha model com o Banco de Dados
 */
Perguntas.sync({ force: false })
    .then(() => {
        console.log(`The table PERGUNTAS have to created succeful!`)
    })
    .catch((e) => {
        console.log(`Table was not created`)
        console.log(`Error Description: ${e}`)
    });

module.exports = Perguntas;