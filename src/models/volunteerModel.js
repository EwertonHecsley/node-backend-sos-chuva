const db = require('../config/databaseConnect');
const { Logger } = require('../config/validateEnvironment');

const VolunteerModel = {
  async create(data) {
    const { userId, skills, availability } = data;
    const queryText = `
        INSERT INTO voluntarios (user_id, skills, availability)
        VALUES ($1, $2, $3)
        RETURNING id, user_id as "userId", skills, availability, status, helped_count as "helpedCount";
    `;
    try {
      const values = [userId, skills, availability];
      const { rows } = await db.query(queryText, values);
      return rows[0];
    } catch (error) {
      Logger.error(`Erro ao criar voluntário: ${error.message}`);
      throw error;
    }
  },

  async findByUserId(userId) {
    const queryText = `
        SELECT 
          v.id, v.user_id as "userId", v.skills, v.availability, v.status, v.helped_count as "helpedCount",
          u.name, u.location, u.phone
        FROM voluntarios v
        JOIN usuarios u ON v.user_id = u.id
        WHERE v.user_id = $1;
    `;
    try {
      const { rows } = await db.query(queryText, [userId]);
      return rows[0];
    } catch (error) {
      Logger.error(`Erro ao buscar voluntário por User ID: ${error.message}`);
      throw error;
    }
  },

  async findAll(page = 1, limit = 10) {
    const queryText = `
        SELECT 
          v.id, v.user_id as "userId", v.skills, v.availability, v.status, v.helped_count as "helpedCount",
          u.name, u.location, u.phone
        FROM voluntarios v
        JOIN usuarios u ON v.user_id = u.id
        ORDER BY v.helped_count DESC, u.name ASC 
        LIMIT $1 OFFSET $2;
    `;
    try {
      const { rows } = await db.query(queryText, [limit, (page - 1) * limit]);
      return rows;
    } catch (error) {
      Logger.error(`Erro ao buscar voluntários: ${error.message}`);
      throw error;
    }
  },

  async findById(id) {
    const queryText = `
        SELECT 
          v.id, v.user_id as "userId", v.skills, v.availability, v.status, v.helped_count as "helpedCount",
          u.name, u.location, u.phone
        FROM voluntarios v
        JOIN usuarios u ON v.user_id = u.id
        WHERE v.id = $1;
    `;
    try {
      const { rows } = await db.query(queryText, [id]);
      return rows[0];
    } catch (error) {
      Logger.error(`Erro ao buscar voluntário por ID: ${error.message}`);
      throw error;
    }
  },

  async update(id, data) {
    const { skills, availability, status, helpedCount } = data;
    const queryText = `
        UPDATE voluntarios 
        SET skills = COALESCE($1, skills), 
            availability = COALESCE($2, availability),
            status = COALESCE($3, status),
            helped_count = COALESCE($4, helped_count)
        WHERE id = $5
        RETURNING id, user_id as "userId", skills, availability, status, helped_count as "helpedCount";
    `;
    try {
      const values = [skills, availability, status, helpedCount, id];
      const { rows } = await db.query(queryText, values);
      return rows[0];
    } catch (error) {
      Logger.error(`Erro ao atualizar voluntário: ${error.message}`);
      throw error;
    }
  },

  async delete(id) {
    const queryText = `
        DELETE FROM voluntarios WHERE id = $1;
    `;
    try {
      await db.query(queryText, [id]);
      return { message: 'Voluntário deletado com sucesso' };
    } catch (error) {
      Logger.error(`Erro ao deletar voluntário: ${error.message}`);
      throw error;
    }
  },

  async count() {
    const queryText = `
        SELECT COUNT(*) FROM voluntarios;
    `;
    try {
      const { rows } = await db.query(queryText);
      return parseInt(rows[0].count);
    } catch (error) {
      Logger.error(`Erro ao contar voluntários: ${error.message}`);
      throw error;
    }
  },

  async search(query) {
    const queryText = `
        SELECT 
          v.id, v.user_id as "userId", v.skills, v.availability, v.status, v.helped_count as "helpedCount",
          u.name, u.location, u.phone
        FROM voluntarios v
        JOIN usuarios u ON v.user_id = u.id
        WHERE u.name ILIKE $1 OR u.location ILIKE $1 OR $2 = ANY(v.skills);
    `;
    try {
      const { rows } = await db.query(queryText, [`%${query}%`, query]);
      return rows;
    } catch (error) {
      Logger.error(`Erro ao buscar voluntários: ${error.message}`);
      throw error;
    }
  },
};

module.exports = VolunteerModel;
