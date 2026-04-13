// src/controllers/ParticipanteController.js
const ParticipanteService = require("../services/ParticipanteService");

function index(req, res, next) {
  try {
    const participantes = ParticipanteService.listarTodos();
    res.json(participantes);
  } catch (erro) {
    next(erro);
  }
}

function show(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const participante = ParticipanteService.buscarPorId(id);
    res.json(participante);
  } catch (erro) {
    next(erro);
  }
}

function store(req, res, next) {
  try {
    const novoParticipante = ParticipanteService.criar(req.body);
    res.status(201).json(novoParticipante);
  } catch (erro) {
    next(erro);
  }
}

function update(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const participanteAtualizado = ParticipanteService.atualizar(id, req.body);
    res.json(participanteAtualizado);
  } catch (erro) {
    next(erro);
  }
}

function destroy(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    ParticipanteService.deletar(id);
    res.status(204).send();
  } catch (erro) {
    next(erro);
  }
}

module.exports = { index, show, store, update, destroy };
