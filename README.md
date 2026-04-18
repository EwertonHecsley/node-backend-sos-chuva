# SOS Chuva API 🌧️🆘

O **SOS Chuva** é uma plataforma backend robusta desenvolvida para auxiliar na coordenação de ajuda a vítimas de enchentes. A API conecta voluntários a pessoas em necessidade, gerencia registros de pessoas desaparecidas e facilita a distribuição de recursos e habilidades.

## 🚀 Tecnologias Utilizadas

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express](https://expressjs.com/)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
- **Segurança:**
  - [Argon2](https://github.com/ranisalt/node-argon2) (Hashing de senhas)
  - [JWT](https://jwt.io/) (Autenticação via tokens)
- **Validação:** [Joi](https://joi.dev/) (Schemas de validação e DTOs)
- **Padronização:** [Prettier](https://prettier.io/)

## 🏗️ Arquitetura

O projeto segue o padrão **MSC (Model, Service, Controller)**:
- **Models:** Interação direta com o banco de dados via `pg`.
- **Services:** Lógica de negócio e regras de validação complexas.
- **Controllers:** Gerenciamento de requisições e respostas HTTP.
- **DTOs:** Objetos de transferência de dados com validação automática.

## 🛠️ Instalação e Uso

### Pré-requisitos
- Node.js instalado
- Instância do PostgreSQL rodando

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd backend-sos-chuva
   ```

2. **Instalar dependências:**
   ```bash
   npm install
   ```

3. **Configurar variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto seguindo o modelo:
   ```env
   NODE_ENV=development
   PORT=3030
   DATABASE_URL=postgres://usuario:senha@host:porta/banco
   JWT_SECRET=sua_chave_secreta_aqui
   ```

4. **Rodar Migrations:**
   ```bash
   npm run migrate
   ```

5. **Iniciar o servidor:**
   ```bash
   npm run dev
   ```

## 🛣️ Endpoints da API

Todos os endpoints são prefixados com `/api/v1`.

### 🔐 Autenticação (Pública)
- `POST /users/register` - Criar nova conta.
- `POST /users/login` - Autenticar usuário e receber token JWT.

### 👤 Usuários (Protegido)
- `GET /users` - Listar usuários (com paginação).
- `GET /users/:id` - Buscar detalhes de um usuário.
- `PUT /users/:id` - Atualizar perfil.
- `DELETE /users/:id` - Remover conta.

### 🆘 Necessidades (Protegido)
- `POST /needs` - Registrar uma nova necessidade.
- `GET /needs` - Listar todas as necessidades.
- `GET /needs/search?q=...` - Buscar necessidades.
- `PUT /needs/:id` - Atualizar status ou detalhes.

### 🤝 Voluntários (Protegido)
- `POST /volunteers` - Inscrever-se como voluntário.
- `GET /volunteers` - Listar voluntários ativos.

### 🔍 Desaparecidos (Protegido)
- `POST /missing-persons` - Reportar pessoa/animal desaparecido.
- `GET /missing-persons` - Listar registros de desaparecidos.

### 📩 Pedidos de Ajuda (Protegido)
- `POST /help-requests` - Enviar oferta de ajuda para uma necessidade.

## 🔒 Segurança

A API utiliza autenticação baseada em **Bearer Tokens**. Para acessar rotas protegidas, inclua o token no header da requisição:
```http
Authorization: Bearer <seu_token_jwt>
```

## 📜 Scripts Disponíveis

- `npm run dev`: Inicia o servidor com hot-reload (Nodemon).
- `npm run migrate`: Executa as migrations do banco de dados.
- `npm run format`: Formata o código usando Prettier.
- `npm run build`: Prepara o ambiente para deploy.

---
Desenvolvido para salvar vidas e facilitar a solidariedade. ❤️
