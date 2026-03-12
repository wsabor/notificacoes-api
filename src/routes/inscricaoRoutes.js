// src/routes/inscricaoRoutes.js
const express = require("express");
const router = express.Router();

const InscricaoController = require("../controllers/InscricaoController");

router.post("/", InscricaoController.store);
router.get("/", InscricaoController.index);
router.get("/evento/:eventoId", InscricaoController.listarPorEvento);
router.patch("/:id/cancelar", InscricaoController.cancelar);

module.exports = router;
