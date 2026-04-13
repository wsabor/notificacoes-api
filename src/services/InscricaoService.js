// src/services/InscricaoService.js
const InscricaoModel = require("../models/InscricaoModel");
const EventoModel = require("../models/EventoModel");
const ParticipanteModel = require("../models/ParticipanteModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");
const { isRequired, validar } = require("../helpers/validators");

function criar(dados) {
  const { eventoId, participanteId } = dados;

  const erros = validar([
    isRequired(eventoId, "eventoId"),
    isRequired(participanteId, "participanteId"),
  ]);

  if (erros) {
    throw new ValidationError(erros.join("; "));
  }

  const idEvento = parseInt(eventoId);
  const idParticipante = parseInt(participanteId);

  if (!EventoModel.buscarPorId(idEvento)) {
    throw new NotFoundError("Evento");
  }

  if (!ParticipanteModel.buscarPorId(idParticipante)) {
    throw new NotFoundError("Participante");
  }

  // O Model cuida apenas da regra de duplicata
  return InscricaoModel.criar(idEvento, idParticipante);
}

function listarTodas() {
  return InscricaoModel.listarTodas();
}

function listarPorEvento(eventoId) {
  if (!EventoModel.buscarPorId(eventoId)) {
    throw new NotFoundError("Evento");
  }

  return InscricaoModel.listarPorEvento(eventoId);
}

function cancelar(id) {
  const inscricao = InscricaoModel.cancelar(id);

  if (!inscricao) {
    throw new NotFoundError("Inscrição");
  }

  return inscricao;
}

module.exports = { criar, listarTodas, listarPorEvento, cancelar };
