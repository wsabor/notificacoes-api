// src/app.js
const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const logger = require("./middlewares/logger");
const cors = require("cors");

// Middlewares
app.use(express.json());
app.use(logger);
app.use(cors());

// Importar rotas
const eventoRoutes = require("./routes/eventoRoutes");
const participanteRoutes = require("./routes/participanteRoutes");
const inscricaoRoutes = require("./routes/inscricaoRoutes");

// Usar rotas com prefixo
app.use("/eventos", eventoRoutes);
app.use("/participantes", participanteRoutes);
app.use("/inscricoes", inscricaoRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota raiz (informativa)
app.get("/", (req, res) => {
  res.json({
    mensagem: "API de Notificações",
    rotas: {
      eventos: "/eventos",
      participantes: "/participantes",
      inscricoes: "/inscricoes",
      documentacao: "/api-docs",
    },
  });
});

// Middleware de rota não encontrada (sempre por último!)
const notFound = require("./middlewares/notFound");
app.use(notFound);

module.exports = app;
