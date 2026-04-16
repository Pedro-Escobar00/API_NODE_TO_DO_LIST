const http = require('http');

const tarefaRoutes = require('./routes/taskRoute');

const server = http.createServer((req,res)=>{

    res.setHeader('Content-Type','application/json');

    tarefaRoutes(req,res);
});

const PORT = 3000;

server.listen(PORT,() => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});