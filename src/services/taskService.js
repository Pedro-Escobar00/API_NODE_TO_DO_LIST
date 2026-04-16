const fs = require('fs');
const { criarTarefa } = require('../models/tarefaModel');

const ARQUIVO = './tarefas.json';

const carregaTarefas = () => {
    if (!fs.existsSync(ARQUIVO)) return [];
    const dados = fs.readFileSync(ARQUIVO, 'utf-8');
    return JSON.parse(dados);
};

const salvaTarefas = (tarefas) => {
    fs.writeFileSync(ARQUIVO, JSON.stringify(tarefas, null, 2));
};

let tarefas = carregaTarefas();
let idcont;

if (tarefas.length > 0) {
    idcont = tarefas[tarefas.length - 1].id + 1;
} else {
    idcont = 1;
}

const adicTarefa = (titulo) => {
    const tarefa = criarTarefa(idcont++, titulo);
    tarefas.push(tarefa);
    salvaTarefas(tarefas);
    return tarefa;
};

const pegaTarefa = () => tarefas;

const pegaTarefaPorId = (id) => {
    return tarefas.find(t => t.id == id) || null;
};

const atualizTarefa = (id, titulo, completada) => {
    const tarefa = tarefas.find(t => t.id == id);
    if (!tarefa) return null;
    tarefa.titulo = titulo;
    tarefa.completada = completada;
    salvaTarefas(tarefas); 
    return tarefa;
};

const delTarefa = (id) => {
    const index = tarefas.findIndex(t => t.id == id);
    if (index === -1) return false;
    tarefas.splice(index, 1);
    salvaTarefas(tarefas); 
    return true;
};

module.exports = {
    adicTarefa,
    pegaTarefa,
    pegaTarefaPorId,
    atualizTarefa,
    delTarefa
};