// tests/setup.js
// O Jest executa este arquivo antes de cada arquivo de teste (ver "setupFiles" no package.json).
// Ele carrega as variáveis do BANCO DE TESTE, que ficam no .env.test — nunca no .env.
require("dotenv").config({ path: ".env.test", quiet: true });

// Segredo do JWT usado só nos testes de endpoint (não é o segredo da API de verdade).
// Se o .env.test tiver um JWT_SECRET, ele é usado no lugar deste.
process.env.JWT_SECRET = process.env.JWT_SECRET || "segredo-so-dos-testes";
