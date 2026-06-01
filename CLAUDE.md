# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Contexto do Projeto

Este é um projeto de referência do SENAI para um curso de Programação Back-End. É um projeto didático — o instrutor o constrói ao vivo para os alunos e deixa intencionalmente algumas partes incompletas para que os alunos implementem. Bugs encontrados no código podem ser intencionais (exercício para alunos) ou bugs reais no material didático que precisam de correção.

## Comandos

```bash
npm run dev          # Servidor de desenvolvimento com nodemon (reinício automático)
npm start            # Servidor em produção (node --watch)

npm run db:migrate       # Executar todas as migrations pendentes
npm run db:migrate:undo  # Desfazer a última migration
npm run db:seed          # Popular o banco com dados iniciais
npm run db:seed:undo     # Desfazer os seeds
npm run db:reset         # Reset completo: desfaz tudo → migra → seed
```

Não há test runner configurado neste projeto.

## Configuração do Ambiente

Copie `.env.example` para `.env` e preencha os valores. Variáveis necessárias:

```
PORT=3000
NODE_ENV=development
DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD   # Conexão MySQL
SMTP_HOST, SMTP_PORT                               # Servidor SMTP MailPit
```

O arquivo `src/config/database.json` (no .gitignore) é usado pelo `sequelize-cli` para migrations e seeds — deve ter as mesmas credenciais do `.env`. Ver `src/config/database.json.example`.

## Arquitetura

### Fluxo de Requisição

```
Requisição HTTP → Rota → Controller → Service → Model (Sequelize)
                                   ↓
                         appEmitter.emit(evento)
                                   ↓
                  Observer registra listener → EmailService → MailPit
```

### Decisões Arquiteturais Importantes

**Instância única do Sequelize:** `src/config/database.js` exporta a instância bruta do Sequelize. `src/models/index.js` importa todos os models, define todos os relacionamentos e re-exporta `{ sequelize, Evento, Participante, Inscricao, Notificacao }`. **Sempre importe os models de `../models` (o index), nunca dos arquivos de model individuais.** O `server.js` deve importar `const { sequelize } = require("./models")` — se importar `require("./config/database")` diretamente, o `NotificacaoModel` nunca é registrado e sua tabela não será criada.

**Padrão Observer via EventEmitter:** Um singleton `src/events/eventEmitter.js` é importado em toda a aplicação. Os observers são registrados em `src/events/notificacaoObserver.js` e `src/events/logObserver.js`. Esses arquivos são carregados uma única vez na inicialização via `require("./events/notificacaoObserver")` no `app.js`. **Nunca registre listeners `appEmitter.on(...)` dentro de arquivos de rotas** — cada `require()` daquele arquivo de rota re-registra o listener, causando duplicação de eventos.

**Camada de Service:** A lógica de negócio fica em `src/services/`. Os controllers apenas fazem parse da requisição/resposta e chamam os services. Os services lançam erros personalizados de `src/errors/AppError.js`, que chegam ao middleware centralizado `errorHandler`.

**Nomenclatura de campos Sequelize:** Os models usam nomes de atributos em camelCase com `field: "snake_case"` mapeando para as colunas do banco. Sempre use o nome do atributo JS (ex: `destinatarioEmail`) em chamadas `Model.create()`/`Model.update()` — nunca o nome da coluna do banco (`destinatario_email`).

**Inicialização do EmailService:** `EmailService.inicializar()` é chamado uma vez no `server.js` antes do servidor começar a escutar. Cria o transporter do Nodemailer conectado ao MailPit. O serviço lança erro se `enviar()` for chamado antes de `inicializar()`.

### Relacionamentos (definidos em `src/models/index.js`)

- `Evento` hasMany `Inscricao` (FK: `evento_id`, as: `"inscricoes"`)
- `Participante` hasMany `Inscricao` (FK: `participante_id`, as: `"inscricoes"`)
- `Inscricao` belongsTo `Evento` (as: `"evento"`) e `Participante` (as: `"participante"`)
- `Inscricao` hasMany `Notificacao` (FK: `inscricao_id`, as: `"notificacoes"`)

Todos os arrays `include` do Sequelize devem usar o alias `as:` definido aqui.

### Templates de E-mail

`src/templates/email/baseTemplate.js` exporta uma função que retorna o HTML com o layout padrão. `confirmacaoInscricao.js` e `cancelamentoInscricao.js` chamam essa função com seu conteúdo específico. Os templates recebem objetos de dados simples e retornam strings HTML.

### Cache

`src/config/cache.js` exporta uma instância de `node-cache` (TTL: 60s). `src/middlewares/cacheMiddleware.js` fornece cache por rota para requisições GET. Importe a instância de cache diretamente onde necessário.

### Validação

`src/helpers/validators.js` exporta funções utilitárias (`isRequired`, `isEmail`, `minLength`, `validar`). Use-as na camada de Service antes de chamar o Sequelize. `src/helpers/parseId.js` faz parse dos IDs nos parâmetros de rota e lança `ValidationError` se não for um inteiro válido.

### Tratamento de Erros

Lance `NotFoundError` ou `ValidationError` de `src/errors/AppError.js` nos services. O middleware `errorHandler` em `src/middlewares/errorHandler.js` trata esses erros junto com erros do Sequelize (`SequelizeValidationError` → 400, `SequelizeUniqueConstraintError` → 409, `SequelizeForeignKeyConstraintError` → 400). Stack traces são incluídos nas respostas quando `NODE_ENV=development`.
