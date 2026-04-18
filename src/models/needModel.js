const db = require('../config/databaseConnect');
const { Logger } = require('../config/validateEnvironment');

const NeedModel = {
  async create({ userId, category, description, urgency }) {
    const queryText = `
            INSERT INTO necessidades (user_id, category, description, urgency, status)
            VALUES ($1, $2, $3, $4, 'pending')
            RETURNING id, user_id as "userId", category, description, urgency, status, created_at as "createdAt";
        `;
    try {
      const values = [userId, category, description, urgency];
      const { rows } = await db.query(queryText, values);
      return rows[0];
    } catch (error) {
      Logger.error(`Erro ao criar necessidade: ${error.message}`);
      throw error;
    }
  },

  async findAll(page = 1, limit = 10) {
    const query = `
      SELECT
        n.id,
        n.category,
        n.description,
        n.urgency,
        n.status,
        n.created_at as "createdAt",
        n.volunteer_id as "volunteerId",
        u.id as "userId",
        u.name as "userName",
        u.location as "userLocation",
        u.phone as "userPhone"
      FROM necessidades n
      JOIN usuarios u ON n.user_id = u.id
      ORDER BY
        CASE
          WHEN n.urgency = 'critical' THEN 1
          WHEN n.urgency = 'high' THEN 2
          WHEN n.urgency = 'medium' THEN 3
          ELSE 4
        END,
        n.created_at DESC
      LIMIT $1 OFFSET $2;
    `;
    try {
      const { rows } = await db.query(query, [limit, (page - 1) * limit]);
      return rows;
    } catch (error) {
      Logger.error(`Erro ao buscar necessidades: ${error.message}`);
      throw error;
    }
  },

  async update(id, data) {
    const { status, volunteerId, category, description, urgency } = data;
    const queryText = `
      UPDATE necessidades
      SET status = COALESCE($1, status),
          volunteer_id = COALESCE($2, volunteer_id),
          category = COALESCE($3, category),
          description = COALESCE($4, description),
          urgency = COALESCE($5, urgency)
      WHERE id = $6
      RETURNING id, user_id as "userId", category, description, urgency, status, volunteer_id as "volunteerId", created_at as "createdAt";
    `;
    try {
      const values = [status, volunteerId, category, description, urgency, id];
      const { rows } = await db.query(queryText, values);
      return rows[0];
    } catch (error) {
      Logger.error(`Erro ao atualizar necessidade: ${error.message}`);
      throw error;
    }
  },

  async delete(id) {
    const queryText = `
      DELETE FROM necessidades
      WHERE id = $1;
    `;
    try {
      await db.query(queryText, [id]);
      return { message: 'Necessidade deletada com sucesso' };
    } catch (error) {
      Logger.error(`Erro ao deletar necessidade: ${error.message}`);
      throw error;
    }
  },

  async findById(id) {
    const query = `
      SELECT
        n.id,
        n.category,
        n.description,
        n.urgency,
        n.status,
        n.created_at as "createdAt",
        n.volunteer_id as "volunteerId",
        u.id as "userId",
        u.name as "userName",
        u.location as "userLocation",
        u.phone as "userPhone"
      FROM necessidades n
      JOIN usuarios u ON n.user_id = u.id
      WHERE n.id = $1;
    `;
    try {
      const { rows } = await db.query(query, [id]);
      return rows[0] || null;
    } catch (error) {
      Logger.error(`Erro ao buscar necessidade por ID: ${error.message}`);
      throw error;
    }
  },

  async count() {
    const queryText = `
        SELECT COUNT(*) FROM necessidades;
    `;
    try {
      const { rows } = await db.query(queryText);
      return parseInt(rows[0].count);
    } catch (error) {
      Logger.error(`Erro ao contar necessidades: ${error.message}`);
      throw error;
    }
  },

  async search(query) {
    const queryText = `
      SELECT
        n.id, n.category, n.description, n.urgency, n.status, n.created_at as "createdAt",
        u.name as "userName", u.location as "userLocation"
      FROM necessidades n
      JOIN usuarios u ON n.user_id = u.id
      WHERE n.category ILIKE $1 OR n.description ILIKE $1 OR u.location ILIKE $1;
    `;
    try {
      const { rows } = await db.query(queryText, [`%${query}%`]);
      return rows;
    } catch (error) {
      Logger.error(`Erro ao buscar necessidades: ${error.message}`);
      throw error;
    }
  },
};

module.exports = NeedModel;
