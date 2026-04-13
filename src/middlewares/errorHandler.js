// src/middlewares/errorHandler.js

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const mensagem = err.message || "Erro interno do servidor";

  console.error(`[ERRO] ${err.name}: ${mensagem}`);

  const resposta = {
    erro: {
      tipo: err.name || "Error",
      mensagem: mensagem,
      statusCode: statusCode,
    },
  };

  // Em desenvolvimento, inclui o stack trace para facilitar o debug
  // Em produção, esconde detalhes técnicos que poderiam expor a estrutura interna
  if (process.env.NODE_ENV === "development") {
    resposta.erro.stack = err.stack;
  }

  res.status(statusCode).json(resposta);
}

module.exports = errorHandler;
