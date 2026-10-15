
# Registro de Testes de Integração
Aluno: Alanis Venerruche de Carvalho 
Grupo: 2
Data: 15/10/2026

## Banco de teste
Nome do banco de teste: notificacoes_test
Por que ele é separado do banco da API (uma frase): Pois os testes de integração apagam todos os dados de cada teste, ou seja, os dados da API seriam apagados se os bancos não fossem separados.
## Testes escritos

| #   | Arquivo | O que o teste verifica | Verde ou vermelho? |

| --- | ------- | ---------------------- | ---------------- |

|1    | tests/integration/evento.integration.test.js | Grava o evento com o nome correto | Verde |

| 2   | tests/integration/participante.integration.test.js | Não grava participante com e-mail inválido | Verde |

| 3   | participante.integration.test.js | Grava o nome do participante no banco de dados | Verde |

## Resultado

Linha "Tests:" da saída do npm run test:integration:

## Defeito encontrado

Teste:
ParticipanteService.atualizar (integração) > grava o nome novo no banco

Esperado:
"Ana Maria" (O nome atualizado persistido corretamente no banco de dados).

Obtido:
"Ana" (O banco de dados manteve o nome antigo, indicando que a query de update falhou, não salvou as alterações ou não executou o .save()).

O que o usuário da API veria (a rota responde 200, mas...):
O usuário enviaria uma requisição PUT/PATCH para atualizar o nome, receberia uma resposta de sucesso (HTTP Status 200 OK), mas ao consultar o participante novamente (via GET ou listagem), veria que o nome antigo ("Ana") continua lá, pois a alteração nunca foi gravada de fato no banco de dados.