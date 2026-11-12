# 🔔 Notificações API

API REST para o módulo de notificações por e-mail de uma plataforma de gerenciamento de eventos online.

## 📋 Sobre o Projeto

Este projeto faz parte da Situação de Aprendizagem do curso de Programação Back-End do SENAI.
O módulo é responsável por enviar notificações automáticas (confirmação de inscrição, cancelamento)
para participantes de eventos, utilizando o Padrão Observer com Node.js EventEmitter e Nodemailer.

## 🧪 Testes — comece aqui (alunos de TSOF)

> Para **rodar os testes**, você **não precisa** subir a API, configurar o `.env` nem o MailPit. Siga só os passos abaixo.

### Passo 1 — Fork e clone (uma vez)

1. Abra **https://github.com/wsabor/notificacoes-api** e clique em **Fork** → **Create fork**.
   Agora você tem uma cópia em `github.com/SEU-USUARIO/notificacoes-api`.
2. Clone **o seu fork** numa pasta nova (troque `SEU-USUARIO` pelo seu usuário do GitHub):
   ```bash
   git clone https://github.com/SEU-USUARIO/notificacoes-api.git tsof-notificacoes
   cd tsof-notificacoes
   ```
3. Instale as dependências (o **Jest** já vem junto):
   ```bash
   npm install
   ```

### Passo 2 — Testes unitários (não usam banco)

```bash
npm run test:unit
```

✅ A saída termina com `Tests: ... passed`. Se ainda não houver nenhum teste em `tests/unit/`, aparece `No tests found` — é normal.

### Passo 3 — Banco de teste (uma vez, só para os testes de integração)

Os testes de integração usam um banco **separado** do banco da API, porque **apagam os dados** a cada teste.

1. No MySQL Workbench, crie o banco:
   ```sql
   CREATE DATABASE notificacoes_test;
   ```
2. Crie o `database.json` a partir do modelo:
   ```bash
   cp src/config/database.json.example src/config/database.json
   ```
   Abra `src/config/database.json` e, no bloco **`"test"`**, troque `sua_senha_aqui` pela senha do seu MySQL.
3. Crie as tabelas **no banco de teste**:
   ```bash
   npx sequelize-cli db:migrate --env test
   ```
   ✅ Aparecem várias linhas terminando em `migrated`.
4. Crie o `.env.test` a partir do modelo:
   ```bash
   cp .env.test.example .env.test
   ```
   Abra o `.env.test` e troque `sua_senha_aqui` pela senha do seu MySQL.

> 💡 No Windows, os comandos `cp` funcionam no terminal do VS Code (PowerShell). Se preferir, copie e renomeie os arquivos pelo próprio VS Code. Atenção para o arquivo não virar `.env.test.txt`.

> ⚠️ O `.env.test` tem a sua senha e **não vai para o GitHub** (está no `.gitignore`). Confira com `git status`.

### Passo 4 — Testes de integração

```bash
npm run test:integration
```

✅ A saída termina com `Tests: ... passed`.

### Passo 5 — Receber atualizações do professor

Quando o professor publicar arquivos novos, **não use o botão "Sync fork" do GitHub**: se ele oferecer **"Discard commits"**, o seu trabalho é apagado. No terminal, na pasta do projeto:

1. Salve o seu trabalho:
   ```bash
   git add .
   git commit -m "trabalho pendente"
   ```
2. Traga as novidades do professor (uma linha só):
   ```bash
   git pull https://github.com/wsabor/notificacoes-api.git main --no-rebase --no-edit -X ours
   ```
3. Se o professor acrescentou ferramentas novas, instale:
   ```bash
   npm install
   ```

> O `-X ours` mantém a **sua** versão quando você e o professor mexeram no mesmo trecho de um arquivo. Os arquivos novos do professor chegam normalmente.

### Comandos de teste

```bash
npm run test:unit         # Testes unitários (não usam banco)
npm run test:integration  # Testes de integração (usam o banco de TESTE)
npm run test:endpoint     # Testes de endpoint com Supertest (usam o banco de TESTE)
npm test                  # Todos os testes, um arquivo de cada vez
npm run test:cov          # Testes unitários + relatório de cobertura
```

### Problemas comuns

| Mensagem | Solução |
|---|---|
| `jest: command not found` / `'jest' não é reconhecido` | Rode `npm install` |
| `Unknown database 'notificacoes_test'` | Crie o banco (Passo 3.1) |
| `Access denied for user ''` | Falta o `.env.test` ou ele está com outro nome (Passo 3.4) |
| `Access denied for user 'root'` | Senha errada no `.env.test` |
| `Dialect needs to be explicitly supplied` | Falta o `database.json` ou o bloco `"test"` (Passo 3.2) |
| Todos os testes falham na linha do `limparBanco`, sem mensagem | Faltam as tabelas: `npx sequelize-cli db:migrate --env test` |
| `Cannot find module 'supertest'` | Rode `npm install` (Passo 5.3) |
| `Jest did not exit one second after the test run has completed` | Faltou `await` antes de um `request(app)`. Aperte `Ctrl+C`, corrija e rode de novo |

```
tests/
├── setup.js         → Carrega o .env.test antes dos testes
├── helpers/         → limparBanco (esvazia o banco de teste) e obterToken (login para rotas protegidas)
├── unit/            → Testes unitários
├── integration/     → Testes de integração
└── endpoint/        → Testes de endpoint (Supertest)
```

## 🚀 Como Rodar a API

1. Clone o repositório (alunos: use o seu fork — ver seção de testes acima):
   ```bash
   git clone https://github.com/SEU-USUARIO/notificacoes-api.git
   cd notificacoes-api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   # Edite o .env com suas credenciais de banco e IP do MailPit
   ```

4. Configure o banco de dados:
   ```bash
   # Copie e preencha as credenciais do banco para o Sequelize CLI
   cp src/config/database.json.example src/config/database.json

   # Crie as tabelas e popule com dados iniciais
   npm run db:migrate
   npm run db:seed
   ```

5. Inicie o servidor:
   ```bash
   npm run dev
   ```

6. Acesse:
   - API: http://localhost:3000
   - Documentação: http://localhost:3000/api-docs

## 📚 Rotas Disponíveis

### Eventos

| Método | Rota                    | Descrição              |
| ------ | ----------------------- | ---------------------- |
| GET    | /eventos                | Listar todos           |
| GET    | /eventos/futuros        | Listar eventos futuros |
| GET    | /eventos/:id            | Buscar por ID          |
| POST   | /eventos                | Criar novo             |
| PUT    | /eventos/:id            | Atualizar              |
| DELETE | /eventos/:id            | Deletar                |
| POST   | /eventos/:id/banner     | Upload de banner       |
| GET    | /eventos/:id/banner     | Visualizar banner      |

### Participantes

| Método | Rota               | Descrição     |
| ------ | ------------------ | ------------- |
| GET    | /participantes     | Listar todos  |
| GET    | /participantes/:id | Buscar por ID |
| POST   | /participantes     | Criar novo    |
| PUT    | /participantes/:id | Atualizar     |
| DELETE | /participantes/:id | Deletar       |

### Inscrições

| Método | Rota                         | Descrição          |
| ------ | ---------------------------- | ------------------ |
| POST   | /inscricoes                  | Criar inscrição    |
| GET    | /inscricoes                  | Listar todas       |
| GET    | /inscricoes/evento/:eventoId | Listar por evento  |
| PATCH  | /inscricoes/:id/cancelar     | Cancelar inscrição |

### Notificações

| Método | Rota                          | Descrição                        |
| ------ | ----------------------------- | -------------------------------- |
| GET    | /notificacoes                 | Listar (filtros: tipo, enviada)  |
| GET    | /notificacoes/estatisticas    | Dashboard de envios              |
| GET    | /notificacoes/:id             | Detalhes                         |
| POST   | /notificacoes/:id/reenviar    | Reenviar                         |
| POST   | /notificacoes/teste-email     | Enviar e-mail de teste           |

### Exportação

| Método | Rota                           | Descrição                  |
| ------ | ------------------------------ | -------------------------- |
| GET    | /exportar/eventos/xml          | Eventos em XML             |
| GET    | /exportar/eventos/json         | Eventos em JSON (download) |
| GET    | /exportar/relatorio/inscricoes | Relatório de inscrições    |

## 📧 Sistema de Notificações

A API envia e-mails automaticamente usando o **Padrão Observer**:

- **Confirmação de inscrição** — enviado ao criar uma inscrição
- **Cancelamento** — enviado ao cancelar uma inscrição

Em desenvolvimento, os e-mails são capturados pelo **MailPit** (servidor SMTP compartilhado da sala).
Visualize os e-mails em `http://10.187.226.125:8225`.

## 🛠️ Tecnologias

- **Node.js** + **Express.js** — servidor e rotas
- **MySQL** + **Sequelize** — banco de dados relacional e ORM
- **Nodemailer** + **MailPit** — envio e captura de e-mails em desenvolvimento
- **Swagger** (swagger-jsdoc + swagger-ui-express) — documentação interativa
- **Multer** — upload de arquivos
- **node-cache** — cache em memória
- **xmlbuilder2** — exportação XML

## 🗄️ Banco de Dados

```bash
npm run db:migrate       # Criar tabelas
npm run db:migrate:undo  # Desfazer última migration
npm run db:seed          # Popular com dados iniciais
npm run db:seed:undo     # Desfazer seeds
npm run db:reset         # Reset completo (desfaz → migra → seed)
```

## 📁 Estrutura do Projeto

```
src/
├── config/          → Banco de dados, cache e upload
├── controllers/     → Parse de requisição/resposta
├── database/
│   ├── migrations/  → Versionamento do schema do banco
│   └── seeders/     → Dados iniciais para desenvolvimento
├── errors/          → Classes de erro personalizadas
├── events/          → EventEmitter e observers (Padrão Observer)
├── helpers/         → Validadores e utilitários
├── middlewares/     → Tratamento de erros, cache, log
├── models/          → Models Sequelize e relacionamentos
├── routes/          → Mapeamento de URLs
├── services/        → Regras de negócio
├── templates/email/ → Templates HTML de e-mail
├── app.js           → Configuração do Express
└── server.js        → Inicialização do servidor
```
