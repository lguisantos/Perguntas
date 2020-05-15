const Sequelize = require('sequelize');

/**
 * @constant resoluçãoDoErroDeConexãoComOBanco 
 * @description Devemos executar o comando alter user 'root'@'localhost' identified with mysql_native_password by 'Senha'
 *              No Workbench e depois executar o nodemon outra vez
 * 
 * @param guia_pergunta Nome do banco
 * @param root Nome do usuário padrão
 * @param _1234 Senha de conexão
 * @param host Onde o banco está rodando
 * @param dialect tipo do banco que deseja conectar
 */

const connection = new Sequelize('guia_pergunta', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;