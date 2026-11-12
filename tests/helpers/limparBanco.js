// tests/helpers/limparBanco.js
// Esvazia as tabelas do banco de TESTE. Usado no beforeEach dos testes de integração e de endpoint,
// para que cada teste comece do zero e não dependa do que o teste anterior deixou.
const {
  Notificacao,
  Inscricao,
  Participante,
  Evento,
  Usuario,
} = require("../../src/models");
const cache = require("../../src/config/cache");

// Apaga dos "filhos" para os "pais", respeitando as chaves estrangeiras
async function limparBanco() {
  await Notificacao.destroy({ where: {} });
  await Inscricao.destroy({ where: {} });
  await Participante.destroy({ where: {} });
  await Evento.destroy({ where: {} });
  await Usuario.destroy({ where: {} });

  // A API guarda respostas de GET em cache por 30s. Sem limpar, um teste
  // poderia receber a resposta guardada pelo teste anterior.
  cache.flushAll();
}

module.exports = limparBanco;
