// src/controllers/ParticipanteController.js
const ParticipanteModel = require("../models/ParticipanteModel");

function index(req, res) {
  const participantes = ParticipanteModel.listarTodos();
  res.json(participantes);
}

function show(req, res) {
  const id = parseInt(req.params.id);
  const participante = ParticipanteModel.buscarPorId(id);
  if (!participante) {
    return res.status(404).json({ erro: "Participante não encontrado" });
  }
  res.json(participante);
}

function store(req, res) {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ erro: "Nome e email são obrigatórios" });
  }

  const novoParticipante = ParticipanteModel.criar({ nome, email });
  res.status(201).json(novoParticipante);
}

function update(req, res) {
  const id = parseInt(req.params.id);
  const participanteAtualizado = ParticipanteModel.atualizar(id, req.body);

  if (!participanteAtualizado) {
    return res.status(404).json({ erro: "Participante não encontrado" });
  }

  res.json(participanteAtualizado);
}

function destroy(req, res) {
  const id = parseInt(req.params.id);
  const deletado = ParticipanteModel.deletar(id);

  if (!deletado) {
    return res.status(404).json({ erro: "Participante não encontrado" });
  }

  res.status(204).send();
}

module.exports = { index, show, store, update, destroy };
