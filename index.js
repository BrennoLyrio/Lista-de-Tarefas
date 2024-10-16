const express = require('express');
const app = express();

//Permite que o servidor entenda o JSON
app.use(express.json());

//Lista de Itens
let itens = []

//mostrar todos os itens
app.get('/itens', (req, res) => {
    res.json(itens)
})

//Adicionar um novo item
app.post('/itens', (req, res) => {
    const novoItem = req.body; //Pega o item que você quer adicionar
    itens.push(novoItem); //Adiciona o item à lista
    res.json(novoItem); //Mostra o item que foi adicionado
})

//Update an existing item 
app.put ('/itens/:id', (req, res) => {
    const id = parseInt(req.params.id); // Pega o ID do Item qu queremos mudar
    const itemAtualizado = req.body; //Pega as novas informações do item

    //procura o item na lista
    const index = itens.findIndex(item => item.id === id);
    if (index >= 0) {
        itens[index] = itemAtualizado; //atualiza o item
        res.json(itemAtualizado); //Mostra o item atualizado
    } else {
        res.json({message: 'Item não encontrado'}) //se não encontrar, avisa
    }
});


//Deletar um item
app.delete('/itens/:id', (req, res) => {
    const id = parseInt(req.params.id); //Pega o ID do item que queremos deletar

    //Procura o item na lista
    const index = itens.findIndex (item => item.id === id);
    if (index >= 0) {
        itens.splice(index, 1); //Remove o item da lista
        res.send(); //Resposta vazia, só diz que deu certo
    } else {
        res.json({message: 'Item não encontrado'}); //Se não encontrar, avisa
    }
});


//Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000'); //Mensagem para servidor no ar
})