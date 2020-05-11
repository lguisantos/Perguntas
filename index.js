const express = require('express');
const app = express()

app.get('/perguntar', (req, res) => {
    return res.render('perguntar')
})



























/**
 * @function set Utilizando o ejs como motor de html dentro do express
 */
app.set('view engine', 'ejs');

/**
 * @description Utilizando arquivos estáticos
 * @function express.static('nome_da_pasta')
 * @description compo o o método estático, podemos utilizado CSS, IMG e etc... dentro do ejs
 */
app.use(express.static('public'))

app.get('/', (req, res) => {


    /**
     * @function render Quando utilizamos a funcão render, automáticamente ele retorna o
     *                  arquivo contido dentro da pasta views
     * @description Na metodo abaixo, estamos chamando um arquivo .ejs e passando parâmetros
     */
    return res.render('index', {})
});














app.listen(666, () => {
    console.log(`App rodadando na porta: ${666}`)
})