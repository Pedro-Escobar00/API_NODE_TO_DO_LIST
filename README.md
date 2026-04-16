<div align="center">

# ✅ To-Do List API

**API REST de gerenciamento de tarefas construída com Node.js puro — sem frameworks, sem dependências externas.**

[![Node.js](https://img.shields.io/badge/Node.js-14%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/Licen%C3%A7a-MIT-blue?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Funcional-brightgreen?style=for-the-badge)]()

<br/>

> 🎯 Projeto desenvolvido para praticar arquitetura **MVC** e o módulo nativo `http` do Node.js,  
> implementando um CRUD completo com persistência de dados em arquivo JSON.

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Arquitetura](#-arquitetura)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Execução](#-instalação-e-execução)
- [Endpoints da API](#-endpoints-da-api)
- [Exemplos de Uso](#-exemplos-de-uso)
- [Modelo de Dados](#-modelo-de-dados)
- [Como Funciona a Persistência](#-como-funciona-a-persistência)

---

## 💡 Sobre o Projeto

Este projeto é uma **API REST** completa para gerenciar tarefas (to-do list), construída **do zero com Node.js puro**, sem utilizar nenhum framework como Express, Fastify ou Koa.

O objetivo foi entender como o Node.js funciona por baixo dos panos: tratamento de rotas manualmente, leitura do corpo das requisições via stream de dados, e persistência sem banco de dados — apenas com o módulo nativo `fs`.

### ✨ Funcionalidades

- ✅ **Criar** novas tarefas com título
- 📋 **Listar** todas as tarefas cadastradas
- 🔍 **Buscar** uma tarefa específica por ID
- ✏️ **Atualizar** título e status de conclusão de uma tarefa
- 🗑️ **Deletar** tarefas pelo ID
- 💾 **Persistência automática** — os dados são salvos em `tarefas.json` e sobrevivem a reinicializações do servidor

---

## 🏗️ Arquitetura

O projeto segue o padrão **MVC (Model-View-Controller)** com uma camada de serviço, separando bem as responsabilidades:

```
Requisição HTTP
      │
      ▼
  [ Route ]          ← Direciona para o controller correto
      │
      ▼
  [ Controller ]     ← Lê a requisição e monta a resposta
      │
      ▼
  [ Service ]        ← Lógica de negócio e persistência
      │
      ▼
  [ Model ]          ← Define a estrutura de uma tarefa
      │
      ▼
  tarefas.json       ← Armazenamento dos dados
```

| Camada | Arquivo | Responsabilidade |
|---|---|---|
| 🌐 Servidor | `app.js` | Inicializa o servidor HTTP na porta 3000 |
| 🔀 Rotas | `tarefaRoute.js` | Analisa URL e método HTTP, delega ao controller |
| 🎮 Controller | `tarefaController.js` | Recebe a requisição, chama o service, retorna resposta |
| ⚙️ Service | `tarefaService.js` | Lógica de negócio, leitura/escrita no JSON |
| 📐 Model | `tarefaModel.js` | Fábrica que cria o objeto de uma tarefa |

---

## 📁 Estrutura de Pastas

```
API_NODE_TO_DO_LIST/
│
├── src/
│   ├── app.js                  # Ponto de entrada — servidor HTTP
│   ├── routes/
│   │   └── tarefaRoute.js      # Roteamento manual das requisições
│   ├── controllers/
│   │   └── tarefaController.js # Handlers de cada endpoint
│   ├── services/
│   │   └── tarefaService.js    # Lógica de negócio e persistência
│   ├── models/
│   │   └── tarefaModel.js      # Estrutura de dados da tarefa
│   └── tarefas.json            # Banco de dados local (gerado automaticamente)
│
└── README.md
```

---

## 🔧 Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- **[Node.js](https://nodejs.org)** versão **14 ou superior**

Para verificar se já está instalado:

```bash
node -v
# Esperado: v14.0.0 ou superior
```

> ℹ️ **Nenhuma dependência externa** — o projeto usa apenas módulos nativos do Node.js (`http`, `fs`, `url`).

---

## 🚀 Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/Pedro-Escobar00/API_NODE_TO_DO_LIST.git
cd API_NODE_TO_DO_LIST
```

### 2. Execute o servidor

```bash
node src/app.js
```

### 3. Acesse a API

```
http://localhost:3000
```

Você verá no terminal:
```
Servidor rodando em http://localhost:3000
```

> 💡 O arquivo `tarefas.json` é criado automaticamente na primeira execução.

---

## 📡 Endpoints da API

Base URL: `http://localhost:3000`

| Método | Rota | Descrição | Status de Sucesso |
|--------|------|-----------|:-----------------:|
| `GET` | `/tarefas` | Lista todas as tarefas | `200 OK` |
| `GET` | `/tarefas/:id` | Busca uma tarefa por ID | `200 OK` |
| `POST` | `/tarefas` | Cria uma nova tarefa | `201 Created` |
| `PUT` | `/tarefas/:id` | Atualiza título e/ou status | `200 OK` |
| `DELETE` | `/tarefas/:id` | Remove uma tarefa | `200 OK` |

### Respostas de Erro

| Status | Descrição |
|--------|-----------|
| `404 Not Found` | Tarefa não encontrada pelo ID informado |
| `404 Not Found` | Rota inexistente |

---

## 🧪 Exemplos de Uso

### ➕ Criar uma nova tarefa

```bash
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Estudar Node.js"}'
```

**Resposta:**
```json
{
  "id": 1,
  "titulo": "Estudar Node.js",
  "completada": false
}
```

---

### 📋 Listar todas as tarefas

```bash
curl http://localhost:3000/tarefas
```

**Resposta:**
```json
[
  { "id": 1, "titulo": "Estudar Node.js", "completada": false },
  { "id": 2, "titulo": "Fazer exercícios", "completada": true }
]
```

---

### 🔍 Buscar tarefa por ID

```bash
curl http://localhost:3000/tarefas/1
```

**Resposta:**
```json
{
  "id": 1,
  "titulo": "Estudar Node.js",
  "completada": false
}
```

---

### ✏️ Atualizar uma tarefa

```bash
curl -X PUT http://localhost:3000/tarefas/1 \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Estudar Node.js avançado", "completada": true}'
```

**Resposta:**
```json
{
  "id": 1,
  "titulo": "Estudar Node.js avançado",
  "completada": true
}
```

---

### 🗑️ Deletar uma tarefa

```bash
curl -X DELETE http://localhost:3000/tarefas/1
```

**Resposta:**
```json
{
  "message": "Removida"
}
```

---

## 📐 Modelo de Dados

Cada tarefa segue a seguinte estrutura:

```json
{
  "id": 1,
  "titulo": "Nome da tarefa",
  "completada": false
}
```

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | `number` | Identificador único, autoincremental |
| `titulo` | `string` | Título/descrição da tarefa |
| `completada` | `boolean` | `false` = pendente, `true` = concluída |

---

## 💾 Como Funciona a Persistência

O projeto **não usa banco de dados**. Em vez disso, utiliza o módulo nativo `fs` do Node.js para ler e gravar dados diretamente em um arquivo `tarefas.json`.

```
Servidor inicia
      │
      ▼
Lê tarefas.json  ──► carrega em memória (array)
      │
      ▼
Requisição chega  ──► operação no array em memória
      │
      ▼
Salva tarefas.json  ──► dados persistidos no disco
```

- **Ao iniciar**, o servidor carrega o arquivo JSON para a memória
- **A cada modificação** (criar, atualizar, deletar), o arquivo é reescrito
- **Ao reiniciar**, os dados são recuperados do arquivo automaticamente
- O **ID autoincremental** continua de onde parou, evitando duplicações

---

<div align="center">

Feito com ☕ e Node.js puro por **[Pedro Escobar](https://github.com/Pedro-Escobar00)**

</div>