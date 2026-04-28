// src/models/ParticipanteModel.js

// Dados iniciais (seed)
let participantes = [
  { id: 1, nome: "Ana Silva", email: "ana@email.com" },
  { id: 2, nome: "Carlos Souza", email: "carlos@email.com" },
  { id: 3, nome: "Maria Santos", email: "maria@email.com" },
];

let proximoId = 4;

// 👇 Implemente as funções abaixo seguindo o padrão do EventoModel

function listarTodos() {
  // Retorne todos os participantes
  return participantes;
}

function buscarPorId(id) {
  // Use .find() para buscar pelo ID
  return participantes.find((p) => p.id === id);
}

function criar(dados) {
  const novoParticipante = {
    id: proximoId,
    nome: dados.nome,
    email: dados.email,
  };
  proximoId++;
  participantes.push(novoParticipante);
  return novoParticipante;
}

function atualizar(id, dados) {
  const index = participantes.findIndex((p) => p.id === id);
  if (index === -1) return null;

  participantes[index] = {
    ...participantes[index], // mantém os dados antigos
    ...dados, // sobrescreve com os novos
    id: id, // garante que o ID não muda
  };

  return participantes[index];
}

function deletar(id) {
  const index = participantes.findIndex((p) => p.id === id);
  if (index === -1) return false;

  participantes.splice(index, 1);
  return true;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
};
