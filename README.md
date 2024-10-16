# API de Tarefas

Esta é uma API simples para gerenciar tarefas, permitindo a criação, edição, exclusão e filtragem de tarefas com base em seu status.

## Tecnologias Utilizadas

- Node.js
- Express
- EJS
- Body-Parser
- Method-Override

## Pré-requisitos

- Node.js (v14 ou superior)
- npm (gerenciador de pacotes do Node.js)

## Instalação

1. Clone este repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd nome-do-repositorio
   ```

3. Instale as dependências:
   ```bash
   npm init
   ```

   ```bash
   npm install express
   ```

## Execução da API

Para iniciar a API, execute o seguinte comando:

```bash
npm start
```

A API estará disponível em `http://localhost:3000`.

## Rotas Disponíveis

### 1. Listar Todas as Tarefas
- **Método**: `GET`
- **Endpoint**: `/tarefas`
- **Descrição**: Retorna todas as tarefas.

### 2. Filtrar Tarefas por Status
- **Método**: `GET`
- **Endpoint**: `/tarefas?status=true` ou `/tarefas?status=false`
- **Descrição**: Filtra as tarefas de acordo com o status:
  - `status=true` para tarefas com status "on".
  - `status=false` para tarefas com status "off".

### 3. Criar Nova Tarefa
- **Método**: `POST`
- **Endpoint**: `/tarefas`
- **Descrição**: Adiciona uma nova tarefa.
- **Corpo da Requisição**:
    ```json
    {
      "item": {
        "nome": "Nome da Tarefa",
        "status": "on" // ou "off"
      }
    }
    ```

### 4. Exibir Formulário para Adicionar Tarefa
- **Método**: `GET`
- **Endpoint**: `/tarefas/novo`
- **Descrição**: Exibe o formulário para adicionar uma nova tarefa.

### 5. Editar Tarefa Existente
- **Método**: `GET`
- **Endpoint**: `/tarefas/:id/editar`
- **Descrição**: Exibe o formulário para editar uma tarefa existente.
- **Parâmetros**:
  - `:id` - ID da tarefa a ser editada.

### 6. Atualizar Tarefa
- **Método**: `PUT`
- **Endpoint**: `/tarefas/:id`
- **Descrição**: Atualiza uma tarefa existente.
- **Corpo da Requisição**:
    ```json
    {
      "item": {
        "nome": "Nome Atualizado da Tarefa",
        "status": "on" // ou "off"
      }
    }
    ```

### 7. Excluir Tarefa
- **Método**: `DELETE`
- **Endpoint**: `/tarefas/:id`
- **Descrição**: Remove uma tarefa da lista.
- **Parâmetros**:
  - `:id` - ID da tarefa a ser excluída.

## Observações

- O status da tarefa deve ser `"on"` ou `"off"`.
- As tarefas são armazenadas em memória, portanto, serão perdidas ao reiniciar o servidor.
