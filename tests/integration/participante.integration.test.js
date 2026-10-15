// tests/integration/participante.integration.test.js
// Teste de INTEGRAÇÃO: o service conversa com o banco de TESTE de verdade.
const { sequelize, Participante } = require("../../src/models");
const ParticipanteService = require("../../src/services/ParticipanteService");
const limparBanco = require("../helpers/limparBanco");

// Antes de CADA teste: banco vazio
beforeEach(async () => {
  await limparBanco();
});

// Depois de TODOS os testes deste arquivo: fecha a conexão com o banco
afterAll(async () => {
  await sequelize.close();
});

describe("ParticipanteService.criar (integração)", () => {
  it("grava o participante no banco com nome e e-mail corretos", async () => {
    // Arrange
    const dados = { nome: "Ana Souza", email: "ana@senai.br" };

    // Act
    const criado = await ParticipanteService.criar(dados);

    // Assert: busca de novo NO BANCO, não confia no objeto devolvido
    const doBanco = await Participante.findByPk(criado.id);
    expect(doBanco).not.toBeNull();
    expect(doBanco.nome).toBe("Ana Souza");
    expect(doBanco.email).toBe("ana@senai.br");
  });

  it("não grava dois participantes com o mesmo e-mail", async () => {
    // Arrange: já existe uma Ana no banco
    await ParticipanteService.criar({ nome: "Ana", email: "ana@senai.br" });

    // Act + Assert: a segunda gravação com o mesmo e-mail precisa dar erro
    await expect(
      ParticipanteService.criar({ nome: "Outra Ana", email: "ana@senai.br" }),
    ).rejects.toThrow();

    // Assert no banco: continua existindo só um participante
    const total = await Participante.count();
    expect(total).toBe(1);
  });
});
