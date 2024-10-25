var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var methodOverride = require('method-override'); // Middleware para PUT/DELETE

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); //Permite usar Métodos PUT e DELETE
app.use(bodyParser.json()); // Permite que o Express processe JSON

// Armazenamento em memória para os Itens
let itens = [];
let padraoid = 0

// Rota principal que exibe a lista de clientes
app.get('/', function(req, res) {
    res.render('index', { itens: itens});
});

app.get('/tarefas', function(req, res) {
    const { status } = req.query;

    if (status) {
        const filteredItens = itens.filter(item => item.status === (status === 'true' ? 'on' : 'off'));
        return res.json(filteredItens);
    }

    return res.json(itens);
});

// Rota que exibe o formulário para adicionar um novo cliente
app.get('/tarefas/novo', function(req, res) {
    res.render('form');
});


// Rota que recebe os dados do novo cliente e o adiciona à lista

// Rota para adicionar um novo item
app.post('/tarefas', function(req, res) {

    console.log(req.body);

    const item = req.body; 
    console.log(item)

    // Verifica se o item foi enviado corretamente
    if (!item || !item.nome) {
        return res.status(400).send("Item não enviado corretamente.");
    }

    // Verifica se o status foi enviado e define como 'off' se estiver indefinido
    item.status = item.status === 'on' ? 'on' : 'off';

    // Verifica se o item já existe pelo nome
    const isSomeList = itens.some(el => el.nome.toLowerCase() === item.nome.toLowerCase());
    if (isSomeList) {
        return res.status(409).send("Tarefa já existe!");
    }

    // Adiciona o item com um id único
    item.id = padraoid++;
    itens.push(item);

    // res.redirect('/');
    res.status(200).send("Item enviado com sucesso")
    // res.json({ success: true });

});

// Rota que exibe o formulário para editar um cliente existente
app.get('/tarefas/:id/editar', function(req, res) {
    var id = req.params.id;
    res.render('edit', { item: itens[id], id: id });
});


// Rota que recebe os dados editados do cliente e atualiza na lista
app.put('/tarefas/:id', function(req, res) { //Usa o PUT para edição
    const id = req.params.id;

    console.log(req.body)

    let updatedItem = req.body;
    
    
    if (!updatedItem) {
        return res.status(400).send("Dados de item não enviados.");
    }

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
    // res.redirect('/');
    res.status(200).send("Item enviado com sucesso")

});

// Rota que exclui uma tarefa da lista
app.delete('/tarefas/:id', function(req, res) { //Usa o DELETE para exclusão
//     var id = req.params.id;
//     itens.splice(id, 1);
//     res.redirect('/');
// });

//outro jeito

//     const id = parseInt(req.params.id);
//     const index = tarefas.findIndex(t => t.id === id);

//     if (index !== -1) {
//         tarefas.splice(index, 1);
//         res.status(204).send();
//     } else {
//         res.status(404).json({ message: 'Tarefa não encontrada' });
//     }
// });

//outro jeito
    const id = parseInt(req.params.id, 10);

    // Verifique se o ID é válido
    if (isNaN(id) || id < 0 || id >= itens.length) {
        return res.status(404).send("Item não encontrado.");
    }

    itens.splice(id, 1);
    // res.status(200).send("Item deletado com sucesso.");
    res.redirect('/')
});


app.listen(3000, function() {
    console.log("Servidor rodando na porta 3000");
});
