var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var methodOverride = require('method-override'); // Middleware para PUT/DELETE

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); //Permite usar Métodos PUT e DELETE

app.use(bodyParser.json()); // Para lidar com JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para lidar com formulários


// Armazenamento em memória para os Itens
let itens = [];

// Rota principal que exibe a lista de clientes
app.get('/', function(req, res) {
    res.render('index', { itens: itens});
});

app.get('/tarefas', function(req, res) {
    const { status } = req.query;


    // // Assegura que status é sempre definido
    // item.status = item.status === 'on' ? 'on' : 'off'; 


    if (status) {
        const filteredItens = itens.filter(item => item.status !== undefined && item.status === (status === 'true' ? 'on' : 'off'));
        return res.json(filteredItens);
    }

    return res.json(itens);
});

// Rota que exibe o formulário para adicionar um novo cliente
app.get('/tarefas/novo', function(req, res) {
    res.render('form');
});

let padraoid = 0
// Rota que recebe os dados do novo cliente e o adiciona à lista
app.post('/tarefas', function(req, res) {
    console.log(req.body)
    const item = req.body;
    // itens.push(item);
    // res.redirect('/');

    // Se o status for um array, pegamos o último valor ('on') ou definimos 'off'
    if (Array.isArray(item.status)) {
        item.status = item.status.includes('on') ? 'on' : 'off';
    } else {
        item.status = item.status === 'on' ? 'on' : 'off'; // Trata o status se não for um array
    }

    //teste de verificar tarefa existente

    const isSomeList = itens.some((el) => el.nome === item.nome);
    if (isSomeList) {
        // return res.json({error: "Tarefa já existe!"});
        return res.render('form', {error: "Tarefa já existe!"});
    }

    // Adiciona o item com status tratado
    item.id = padraoid;
    itens.push(item)
    padraoid += 1

    res.redirect('/');

});

// Rota que exibe o formulário para editar um cliente existente
app.get('/tarefas/:id/editar', function(req, res) {
    // var id = req.params.id;
    // res.render('edit', { item: itens[id], id: id });

    const id = parseInt(req.params.id, 10); // Converte para inteiro
    
    if (isNaN(id) || id < 0 || id >= itens.length) {
        return res.status(404).send('Tarefa não encontrada');
    }

    res.render('edit', { item: itens[id], id: id });
});


// Rota que recebe os dados editados do cliente e atualiza na lista
app.put('/tarefas/:id', function(req, res) { //Usa o PUT para edição
    const id = req.params.id;
    let updatedItem = req.body;
 
    // Tratamento do status
    updatedItem.status = updatedItem.status === 'on' ? 'on' : 'off';


    // garatindo que o id da tarefa seja mantido
    updatedItem.id = parseInt(id, 10);


    // Verifica se o nome da tarefa já existe
    const nomeExiste = itens.some((el, index) => el.nome === updatedItem.nome && index != id);
    if (nomeExiste) {
        return res.json({error: "Nome já existe em outra tarefa!"});
    }

    // Atualiza o item
    itens[id] = updatedItem;
    res.redirect('/');

});

// Rota que exclui um cliente da lista
app.delete('/tarefas/:id', function(req, res) { //Usa o DELETE para exclusão
    var id = req.params.id;
    itens.splice(id, 1);
    res.redirect('/');
});

app.listen(3000, function() {
    console.log("Servidor rodando na porta 3000");
});
