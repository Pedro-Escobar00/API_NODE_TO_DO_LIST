const tarefaController = require('../controllers/taskController');

module.exports = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/tarefas' && method === 'GET') {
    return tarefaController.pegaTarefa(req, res);
  }

  if (url === '/tarefas' && method === 'POST') {
    return tarefaController.criarTarefa(req, res);
  }

  if (url.startsWith('/tarefas/') && method === 'PUT') {
    const id = url.split('/')[2];
    return tarefaController.atualizTarefa(req, res, id);
  }

  if (url.startsWith('/tarefas/') && method === 'DELETE') {
    const id = url.split('/')[2];
    return tarefaController.delTarefa(req, res, id);
  }

  if (url.startsWith('/tarefas/') && method === 'GET') {
    const id = url.split('/')[2];
    return tarefaController.pegaTarefaPorId(req, res, id);
}

  res.statusCode = 404;
  res.end(JSON.stringify({ message: 'Tem essa rota não caba' }));
};