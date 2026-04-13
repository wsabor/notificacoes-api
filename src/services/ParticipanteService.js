// src/services/ParticipanteService.js
const ParticipanteModel = require("../models/ParticipanteModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");
const {
  isRequired,
  isEmail,
  minLength,
  validar,
} = require("../helpers/validators");

function listarTodos() {
  return ParticipanteModel.listarTodos();
}

function buscarPorId(id) {
  const participante = ParticipanteModel.buscarPorId(id);

  if (!participante) {
    throw new NotFoundError("Participante");
  }

  return participante;
}

function criar(dados) {
  const { nome, email } = dados;

  const erros = validar([
    isRequired(nome, "Nome"),
    minLength(nome, 2, "Nome"),
    isRequired(email, "Email"),
    isEmail(email),
  ]);

  if (erros) {
    throw new ValidationError(erros.join("; "));
  }

  return ParticipanteModel.criar({ nome, email });
}

function atualizar(id, dados) {
  const { nome, email } = dados;

  // No update, campos são opcionais — mas se enviados devem ser válidos
  const erros = validar([
    minLength(nome, 2, "Nome"),
    isEmail(email),
  ]);

  if (erros) {
    throw new ValidationError(erros.join("; "));
  }

  const participanteAtualizado = ParticipanteModel.atualizar(id, dados);

  if (!participanteAtualizado) {
    throw new NotFoundError("Participante");
  }

  return participanteAtualizado;
}

function deletar(id) {
  const deletado = ParticipanteModel.deletar(id);

  if (!deletado) {
    throw new NotFoundError("Participante");
  }

  return true;
}

module.exports = { listarTodos, buscarPorId, criar, atualizar, deletar };
