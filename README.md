# 🔔 Notificações API

API REST para o módulo de notificações por e-mail de uma plataforma de gerenciamento de eventos online.

## 📋 Sobre o Projeto

Este projeto faz parte da Situação de Aprendizagem do curso de Programação Back-End do SENAI.
O módulo é responsável por enviar notificações automáticas (confirmação de inscrição, cancelamento)
para participantes de eventos, utilizando o Padrão Observer com Node.js EventEmitter e Nodemailer.

## 🚀 Como Rodar

1. Clone o repositório:
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

Em desenvolvimento, os e-mails são capturados pelo **MailPit** (servidor SMTP local).
Visualize os e-mails em `http://MAILPIT_IP:8025`.

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
