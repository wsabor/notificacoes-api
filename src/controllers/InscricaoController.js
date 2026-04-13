// src/controllers/InscricaoController.js
const InscricaoService = require("../services/InscricaoService");

function store(req, res, next) {
  try {
    const novaInscricao = InscricaoService.criar(req.body);
    res.status(201).json(novaInscricao);
  } catch (erro) {
    next(erro);
  }
}

function index(req, res, next) {
  try {
    const inscricoes = InscricaoService.listarTodas();
    res.json(inscricoes);
  } catch (erro) {
    next(erro);
  }
}

function listarPorEvento(req, res, next) {
  try {
    const eventoId = parseInt(req.params.eventoId);
    const inscricoes = InscricaoService.listarPorEvento(eventoId);
    res.json(inscricoes);
  } catch (erro) {
    next(erro);
  }
}

function cancelar(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const inscricao = InscricaoService.cancelar(id);
    res.json(inscricao);
  } catch (erro) {
    next(erro);
  }
}

module.exports = { store, index, listarPorEvento, cancelar };
