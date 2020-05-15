const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dbConnection = require('./db/db');

/**
 * @description Assim que o módulo index.js for executado,
 *              O model também será e as tabelas serão criadas no banco de dados
 */
const modelPerguntas = require('./db/models/Perguntas');
const modelRespostas = require('./db/models/Respostas')

/**
 * @description Conexão com o banco de dados
 */
dbConnection.authenticate()
    .then(() => {
        console.log('Banco de dados conectado!')
    })
    .catch((e) => {
        console.error('Erro ao tentar conectar com o banco de dados!')
        console.error(`Descrição do erro: ${e}`)
    });

/**
 * @function bodyParser Utilizado para interpretar dados enviados pelo formulário
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * @function set Utilizando o ejs como motor de html dentro do express
 */
app.set('view engine', 'ejs');

/**
 * @description Utilizando arquivos estáticos
 * @function express.static('nome_da_pasta')
 * @description compo o o método estático, podemos utilizado CSS, IMG e etc... dentro do ejs
 */
app.use(express.static('public'));


// Minhas Rotas

app.get('/', (req, res) => {

    /**
     * @function findAll() Faz um SELECT * no módulo que representa a nossa tabela
     * @param raw Traz apenas os dados registrados no banco e não todas as configurações
     * @param order Ordena as informações
     */
    modelPerguntas.findAll({
        raw: true, order: [
            ['createdAt', 'DESC']
        ]
    }).then(perguntas => {

        /**
        * @function render() Quando utilizamos a funcão render, automáticamente ele retorna o
        *                  arquivo contido dentro da pasta views
        * 
        * @param index Nome do módulo a ser renderizado
        * @param {} .Envio de parâmetros para o módulo
        * 
        * @description Na metodo abaixo, estamos chamando um arquivo .ejs e passando parâmetros
        */
        return res.render('index', {
            parameters: perguntas
        })
    })

});

app.get('/perguntar?', (req, res) => {
    return res.render('perguntar')
});

app.post('/novapergunta', (req, res) => {
    const titulo = req.body.titulo;
    const descricao = req.body.descricao;

    console.log('AQUI =>', titulo, descricao);

    /**
     * @function create Criando um registro no banco de dados
     */
    modelPerguntas.create({
        title: titulo,
        description: descricao

    }).then(() => {

        return res.redirect('/')
    }).catch((e) => {
        return res.send(`Erro ao registrar dados ${e}`);
    });
});

app.get('/pergunta/:id', (req, res) => {

    const id = req.params.id

    modelPerguntas.findOne({
        where: { id: id }

    }).then(pergunta => {

        if (pergunta != undefined) {

            modelRespostas.findAll({
                where: {
                    questionId: pergunta.id
                },
                order: [
                    ['createdAt', 'DESC']
                ]

            }).then(respostas => {

                return res.render('perguntaDetalhes', {
                    pergunta: pergunta,
                    respostas: respostas
                });
            }).catch(() => console.log('ID não encontrado!'));

        } else {
            return res.redirect('/')
        }
    });
});

app.post('/resposta', (req, res) => {

    /**
     * @description Importando parâmetros
     */
    const { corpo, pergunta } = req.body;

    /**
     * @function create Registrando uma nova informação no BD
     */
    modelRespostas.create({
        body: corpo,
        questionId: pergunta

    }).then(() => {
        console.log('dados salvos com sucesso');
        return res.redirect(`/pergunta/${pergunta}`);

    }).catch(e => console.log(`Ocorreu um erro: ${e}`));
});

app.listen(666, () => {
    console.log(`App rodadando na porta: ${666}`);
});