const tarefaService = require('../services/taskService');

const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      resolve(JSON.parse(body));
    });
  });
};


const criarTarefa = async (req, res) => {
  const body = await getRequestBody(req);

  console.log(body);

  const tarefa = tarefaService.adicTarefa(body.titulo);

  res.statusCode = 201;
  res.end(JSON.stringify(tarefa));
};


const pegaTarefa = (req, res) => {
  const tarefas = tarefaService.pegaTarefa();

  res.statusCode = 200;
  res.end(JSON.stringify(tarefas));
};

const atualizTarefa = async (req, res, id) => {
  const body = await getRequestBody(req);

  const tarefa = tarefaService.atualizTarefa(id, body.titulo,body.completada);

  if (!tarefa) {
    res.statusCode = 404;
    return res.end(JSON.stringify(
      { message: 'Não encontrada' }
    ));
  }

  res.end(JSON.stringify(tarefa));
};

const delTarefa = (req, res, id) => {
  const sucesso = tarefaService.delTarefa(id);

  if (!sucesso) {
    res.statusCode = 404;
    return res.end(JSON.stringify(
      { message: 'Não encontrada' }
    ));
  }

  res.end(JSON.stringify({ message: 'Removida' }));
};

const pegaTarefaPorId = (req, res, id) => {
    const tarefa = tarefaService.pegaTarefaPorId(id);
    if (!tarefa) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ message: 'Tarefa não encontrada' }));
    }
    res.statusCode = 200;
    res.end(JSON.stringify(tarefa));
};



module.exports = {
  criarTarefa,
  pegaTarefa,
  atualizTarefa,
  delTarefa,
  pegaTarefaPorId
};