const criarTarefa = (id,titulo) => {
    return{
        id,
        titulo,
        completada:false
    };
};

module.exports = {criarTarefa};