const db = require('../config/databaseConnect');
const { Logger } = require('../config/validateEnvironment');

const HelpRequestModel = {
  async create(data) {
    const { needUserId, volunteerId, message } = data;
    const queryText = `
        INSERT INTO pedidos_ajuda (need_user_id, volunteer_id, message)
        VALUES ($1, $2, $3)
        RETURNING id, need_user_id as "needUserId", volunteer_id as "volunteerId", message, status, created_at as "createdAt";
    `;
    try {
      const values = [needUserId, volunteerId, message];
      const { rows } = await db.query(queryText, values);
      return rows[0];
    } catch (error) {
      Logger.error(`Erro ao criar pedido de ajuda: ${error.message}`);
      throw error;
    }
  },

  async findAll(page = 1, limit = 10) {
    const queryText = `
        SELECT
          pa.id, pa.need_user_id as "needUserId", pa.volunteer_id as "volunteerId",
          pa.message, pa.status, pa.created_at as "createdAt",
          u.name as "volunteerName"
        FROM pedidos_ajuda pa
        JOIN voluntarios v ON pa.volunteer_id = v.id
        JOIN usuarios u ON v.user_id = u.id
        ORDER BY pa.created_at DESC
        LIMIT $1 OFFSET $2;
    `;
    try {
      const { rows } = await db.query(queryText, [limit, (page - 1) * limit]);
      return rows;
    } catch (error) {
      Logger.error(`Erro ao buscar pedidos de ajuda: ${error.message}`);
      throw error;
    }
  },

  async findById(id) {
    const queryText = `
        SELECT
          pa.id, pa.need_user_id as "needUserId", pa.volunteer_id as "volunteerId",
          pa.message, pa.status, pa.created_at as "createdAt",
          u.name as "volunteerName"
        FROM pedidos_ajuda pa
        JOIN voluntarios v ON pa.volunteer_id = v.id
        JOIN usuarios u ON v.user_id = u.id
        WHERE pa.id = $1;
    `;
    try {
      const { rows } = await db.query(queryText, [id]);
      return rows[0];
    } catch (error) {
      Logger.error(`Erro ao buscar pedido de ajuda por ID: ${error.message}`);
      throw error;
    }
  },

  async findByNeedUserId(needUserId) {
    const queryText = `
        SELECT
          pa.id, pa.need_user_id as "needUserId", pa.volunteer_id as "volunteerId",
          pa.message, pa.status, pa.created_at as "createdAt",
          u.name as "volunteerName"
        FROM pedidos_ajuda pa
        JOIN voluntarios v ON pa.volunteer_id = v.id
        JOIN usuarios u ON v.user_id = u.id
        WHERE pa.need_user_id = $1;
    `;
    try {
      const { rows } = await db.query(queryText, [needUserId]);
      return rows;
    } catch (error) {
      Logger.error(
        `Erro ao buscar pedidos de ajuda por Need User ID: ${error.message}`,
      );
      throw error;
    }
  },

  async update(id, status) {
    const queryText = `
        UPDATE pedidos_ajuda
        SET status = $1
        WHERE id = $2
        RETURNING id, need_user_id as "needUserId", volunteer_id as "volunteerId", message, status, created_at as "createdAt";
    `;
    try {
      const { rows } = await db.query(queryText, [status, id]);
      return rows[0];
    } catch (error) {
      Logger.error(`Erro ao atualizar pedido de ajuda: ${error.message}`);
      throw error;
    }
  },

  async delete(id) {
    const queryText = `
        DELETE FROM pedidos_ajuda WHERE id = $1;
    `;
    try {
      await db.query(queryText, [id]);
      return { message: 'Pedido de ajuda deletado com sucesso' };
    } catch (error) {
      Logger.error(`Erro ao deletar pedido de ajuda: ${error.message}`);
      throw error;
    }
  },
};

module.exports = HelpRequestModel;
