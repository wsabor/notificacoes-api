// src/routes/exportRoutes.js
const express = require("express");
const router = express.Router();
const { Evento, Participante, Inscricao } = require("../models");
const { create } = require("xmlbuilder2");

// GET /exportar/eventos/xml — exportar eventos em XML
router.get("/eventos/xml", async (req, res, next) => {
  try {
    const eventos = await Evento.findAll({ order: [["data", "ASC"]] });

    const xml = create({ version: "1.0", encoding: "UTF-8" }).ele("eventos");

    eventos.forEach((evento) => {
      xml
        .ele("evento")
        .ele("id")
        .txt(String(evento.id))
        .up()
        .ele("nome")
        .txt(evento.nome)
        .up()
        .ele("descricao")
        .txt(evento.descricao || "")
        .up()
        .ele("data")
        .txt(evento.data.toISOString())
        .up()
        .ele("local")
        .txt(evento.local || "")
        .up()
        .ele("capacidade")
        .txt(String(evento.capacidade || 0))
        .up()
        .up();
    });

    const xmlString = xml.end({ prettyPrint: true });

    res.set("Content-Type", "application/xml");
    res.send(xmlString);
  } catch (erro) {
    next(erro);
  }
});

// GET /exportar/eventos/json — exportar eventos em JSON (download)
router.get("/eventos/json", async (req, res, next) => {
  try {
    const eventos = await Evento.findAll({
      order: [["data", "ASC"]],
      raw: true,
    });

    res.set("Content-Type", "application/json");
    res.set("Content-Disposition", 'attachment; filename="eventos.json"');
    res.json(eventos);
  } catch (erro) {
    next(erro);
  }
});

router.get("/inscricoes/xml", async (req, res, next) => {
  try {
    const inscricoes = await Inscricao.findAll({
      include: [
        { model: Evento, attributes: ["id", "nome"] },
        { model: Participante, attributes: ["id", "nome"] },
      ],
      order: [["createdAt", "ASC"]],
    });

    const xml = create({ version: "1.0", encoding: "UTF-8" }).ele("inscricoes");

    inscricoes.forEach((inscricao) => {
      xml
        .ele("inscricao")
        .ele("id")
        .txt(String(inscricao.id))
        .up()
        .ele("evento")
        .txt(inscricao.Evento.nome)
        .up()
        .ele("participante")
        .txt(inscricao.Participante.nome)
        .up()
        .ele("dataInscricao")
        .txt(inscricao.createdAt.toISOString())
        .up()
        .up();
    });

    const xmlString = xml.end({ prettyPrint: true });

    res.set("Content-Type", "application/xml");
    res.send(xmlString);
  } catch (erro) {
    next(erro);
  }
});

module.exports = router;
