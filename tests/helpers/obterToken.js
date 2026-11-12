// tests/helpers/obterToken.js
// Cadastra um usuário de teste, faz login pela API e devolve o token JWT.
// Use nos testes de rotas protegidas: const token = await obterToken();
const request = require("supertest");
const app = require("../../src/app");

async function obterToken() {
  const usuario = {
    nome: "Organizador de Teste",
    email: "organizador@teste.com",
    senha: "123456",
  };

  await request(app).post("/auth/registrar").send(usuario);

  const resposta = await request(app)
    .post("/auth/login")
    .send({ email: usuario.email, senha: usuario.senha });

  return resposta.body.token;
}

module.exports = obterToken;
