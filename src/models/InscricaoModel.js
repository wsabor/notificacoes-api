// src/models/InscricaoModel.js
const { ValidationError } = require("../errors/AppError");

let inscricoes = [];
let proximoId = 1;

// Criar uma nova inscrição — assume que evento e participante já foram validados pelo Service
function criar(eventoId, participanteId) {
  // Regra de dados: duplicata fica no Model
  const jaInscrito = inscricoes.find(
    (i) => i.eventoId === eventoId && i.participanteId === participanteId,
  );

  if (jaInscrito) {
    throw new ValidationError("Participante já inscrito neste evento");
  }

  const novaInscricao = {
    id: proximoId,
    eventoId,
    participanteId,
    dataInscricao: new Date().toISOString(),
    status: "confirmada",
  };

  proximoId++;
  inscricoes.push(novaInscricao);
  return novaInscricao;
}

function listarPorEvento(eventoId) {
  return inscricoes.filter((i) => i.eventoId === eventoId);
}

function listarTodas() {
  return inscricoes;
}

function cancelar(id) {
  const index = inscricoes.findIndex((i) => i.id === id);
  if (index === -1) return null;
  inscricoes[index].status = "cancelada";
  return inscricoes[index];
}

module.exports = {
  criar,
  listarPorEvento,
  listarTodas,
  cancelar,
};
