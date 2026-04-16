# 📝 To-Do List API — Node.js

API REST de gerenciamento de tarefas construída com Node.js puro, sem frameworks externos.

---

## 💡 Como o problema foi resolvido

O projeto foi construído seguindo uma arquitetura em camadas (MVC), separando as responsabilidades em:

- **Model** (`tarefaModel.js`) — define a estrutura de uma tarefa
- **Service** (`tarefaService.js`) — contém a lógica de negócio e persistência em arquivo JSON
- **Controller** (`tarefaController.js`) — recebe as requisições e retorna as respostas
- **Route** (`tarefaRoute.js`) — direciona as requisições para o controller correto
- **App** (`app.js`) — inicializa o servidor HTTP

A persistência de dados foi implementada com o módulo nativo `fs` do Node.js, salvando as tarefas em um arquivo `tarefas.json`. Isso garante que os dados não sejam perdidos ao reiniciar o servidor.

---

## ⚙️ Como configurar o ambiente

Você precisa ter instalado:

- [Node.js](https://nodejs.org) versão 14 ou superior

Para verificar se já tem o Node instalado:
```bash
node -v
```

---

## 📦 Como instalar as dependências

Este projeto não possui dependências externas, usa apenas módulos nativos do Node.js.

Basta clonar o repositório:
```bash
git clone https://github.com/Rapuvermelho/toDoListBrandao.git
cd toDoListBrandao
```

---

## ▶️ Como executar o aplicativo

```bash
node src/app.js
```

O servidor vai iniciar em `http://localhost:3000`

---

## 🔀 Endpoints disponíveis

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/tarefas` | Lista todas as tarefas |
| GET | `/tarefas/:id` | Busca uma tarefa por ID |
| POST | `/tarefas` | Cria uma nova tarefa |
| PUT | `/tarefas/:id` | Atualiza uma tarefa |
| DELETE | `/tarefas/:id` | Remove uma tarefa |

---

## 🧪 Exemplos de uso com curl

**Criar tarefa:**
```bash
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Estudar Node.js"}'
```

**Listar tarefas:**
```bash
curl http://localhost:3000/tarefas
```

**Buscar por ID:**
```bash
curl http://localhost:3000/tarefas/1
```

**Atualizar tarefa:**
```bash
curl -X PUT http://localhost:3000/tarefas/1 \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Estudar Node.js", "completada": true}'
```

**Deletar tarefa:**
```bash
curl -X DELETE http://localhost:3000/tarefas/1
```