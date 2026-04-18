const db = require('../config/databaseConnect');
const { Logger } = require('../config/validateEnvironment');

const UserModel = {
  async create(data) {
    const { name, email, password, phone, type, location } = data;
    const queryText = `
        INSERT INTO usuarios (name, email, password, phone, type, location)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, name, email, phone, type, location, created_at;
    `;
    try {
      const values = [name, email, password, phone, type, location];
      const { rows } = await db.query(queryText, values);
      return rows[0];
    } catch (error) {
      Logger.error(`Erro ao criar usuário: ${error.message}`);
      throw error;
    }
  },

  async findByEmail(email) {
    const queryText = `
        SELECT * FROM usuarios WHERE email = $1;
    `;
    try {
      const { rows } = await db.query(queryText, [email]);
      return rows[0];
    } catch (error) {
      Logger.error(`Erro ao buscar usuário por email: ${error.message}`);
      throw error;
    }
  },

  async findAll(page = 1, limit = 10) {
    const queryText = `
        SELECT id, name, email, phone, type, location, created_at
        FROM usuarios
        ORDER BY created_at DESC
        LIMIT $1 OFFSET $2;
    `;
    try {
      const { rows } = await db.query(queryText, [limit, (page - 1) * limit]);
      return rows;
    } catch (error) {
      Logger.error(`Erro ao buscar usuários: ${error.message}`);
      throw error;
    }
  },

  async findById(id) {
    const queryText = `
        SELECT id, name, email, phone, type, location, created_at
        FROM usuarios
        WHERE id = $1;
    `;
    try {
      const { rows } = await db.query(queryText, [id]);
      return rows[0];
    } catch (error) {
      Logger.error(`Erro ao buscar usuário por ID: ${error.message}`);
      throw error;
    }
  },

  async update(id, data) {
    const { name, email, phone, type, location } = data;
    const queryText = `
        UPDATE usuarios
        SET name = $1, email = $2, phone = $3, type = $4, location = $5
        WHERE id = $6
        RETURNING id, name, email, phone, type, location, created_at;
    `;
    try {
      const values = [name, email, phone, type, location, id];
      const { rows } = await db.query(queryText, values);
      return rows[0];
    } catch (error) {
      Logger.error(`Erro ao atualizar usuário: ${error.message}`);
      throw error;
    }
  },

  async delete(id) {
    const queryText = `
        DELETE FROM usuarios WHERE id = $1;
    `;
    try {
      await db.query(queryText, [id]);
      return { message: 'Usuário deletado com sucesso' };
    } catch (error) {
      Logger.error(`Erro ao deletar usuário: ${error.message}`);
      throw error;
    }
  },

  async count() {
    const queryText = `
        SELECT COUNT(*) FROM usuarios;
    `;
    try {
      const { rows } = await db.query(queryText);
      return parseInt(rows[0].count);
    } catch (error) {
      Logger.error(`Erro ao contar usuários: ${error.message}`);
      throw error;
    }
  },

  async search(query) {
    const queryText = `
        SELECT id, name, email, phone, type, location, created_at
        FROM usuarios
        WHERE name ILIKE $1 OR email ILIKE $1;
    `;
    try {
      const { rows } = await db.query(queryText, [`%${query}%`]);
      return rows;
    } catch (error) {
      Logger.error(`Erro ao buscar usuários: ${error.message}`);
      throw error;
    }
  },
};

module.exports = UserModel;
