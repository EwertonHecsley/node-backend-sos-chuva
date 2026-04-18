const db = require('../config/databaseConnect');
const { Logger } = require('../config/validateEnvironment');

const MissingPersonModel = {
  async create(data) {
    const {
      reportedBy,
      name,
      age,
      type,
      description,
      lastSeenLocation,
      lastSeenDate,
      photoUrl,
    } = data;
    const queryText = `
        INSERT INTO desaparecidos (reported_by, name, age, type, description, last_seen_location, last_seen_date, photo_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id, reported_by as "reportedBy", name, age, type, description, last_seen_location as "lastSeenLocation", last_seen_date as "lastSeenDate", photo_url as "photoUrl", status, created_at as "createdAt";
    `;
    try {
      const values = [
        reportedBy,
        name,
        age,
        type,
        description,
        lastSeenLocation,
        lastSeenDate,
        photoUrl,
      ];
      const { rows } = await db.query(queryText, values);
      return rows[0];
    } catch (error) {
      Logger.error(`Erro ao reportar pessoa desaparecida: ${error.message}`);
      throw error;
    }
  },

  async findAll(page = 1, limit = 10) {
    const queryText = `
        SELECT 
          d.id, d.reported_by as "reportedBy", d.name, d.age, d.type, d.description, 
          d.last_seen_location as "lastSeenLocation", d.last_seen_date as "lastSeenDate", 
          d.photo_url as "photoUrl", d.status, d.created_at as "createdAt",
          u.phone as "reporterPhone"
        FROM desaparecidos d
        JOIN usuarios u ON d.reported_by = u.id
        ORDER BY d.created_at DESC 
        LIMIT $1 OFFSET $2;
    `;
    try {
      const { rows } = await db.query(queryText, [limit, (page - 1) * limit]);
      return rows;
    } catch (error) {
      Logger.error(`Erro ao buscar pessoas desaparecidas: ${error.message}`);
      throw error;
    }
  },

  async findById(id) {
    const queryText = `
        SELECT 
          d.id, d.reported_by as "reportedBy", d.name, d.age, d.type, d.description, 
          d.last_seen_location as "lastSeenLocation", d.last_seen_date as "lastSeenDate", 
          d.photo_url as "photoUrl", d.status, d.created_at as "createdAt",
          u.phone as "reporterPhone"
        FROM desaparecidos d
        JOIN usuarios u ON d.reported_by = u.id
        WHERE d.id = $1;
    `;
    try {
      const { rows } = await db.query(queryText, [id]);
      return rows[0];
    } catch (error) {
      Logger.error(
        `Erro ao buscar pessoa desaparecida por ID: ${error.message}`,
      );
      throw error;
    }
  },

  async update(id, data) {
    const {
      name,
      age,
      type,
      description,
      lastSeenLocation,
      lastSeenDate,
      photoUrl,
      status,
    } = data;
    const queryText = `
        UPDATE desaparecidos 
        SET name = COALESCE($1, name), 
            age = COALESCE($2, age),
            type = COALESCE($3, type),
            description = COALESCE($4, description),
            last_seen_location = COALESCE($5, last_seen_location),
            last_seen_date = COALESCE($6, last_seen_date),
            photo_url = COALESCE($7, photo_url),
            status = COALESCE($8, status)
        WHERE id = $9
        RETURNING id, reported_by as "reportedBy", name, age, type, description, last_seen_location as "lastSeenLocation", last_seen_date as "lastSeenDate", photo_url as "photoUrl", status, created_at as "createdAt";
    `;
    try {
      const values = [
        name,
        age,
        type,
        description,
        lastSeenLocation,
        lastSeenDate,
        photoUrl,
        status,
        id,
      ];
      const { rows } = await db.query(queryText, values);
      return rows[0];
    } catch (error) {
      Logger.error(`Erro ao atualizar pessoa desaparecida: ${error.message}`);
      throw error;
    }
  },

  async delete(id) {
    const queryText = `
        DELETE FROM desaparecidos WHERE id = $1;
    `;
    try {
      await db.query(queryText, [id]);
      return { message: 'Registro deletado com sucesso' };
    } catch (error) {
      Logger.error(
        `Erro ao deletar registro de desaparecimento: ${error.message}`,
      );
      throw error;
    }
  },

  async count() {
    const queryText = `
        SELECT COUNT(*) FROM desaparecidos;
    `;
    try {
      const { rows } = await db.query(queryText);
      return parseInt(rows[0].count);
    } catch (error) {
      Logger.error(`Erro ao contar pessoas desaparecidas: ${error.message}`);
      throw error;
    }
  },

  async search(query) {
    const queryText = `
        SELECT 
          d.id, d.name, d.type, d.description, d.last_seen_location as "lastSeenLocation", 
          d.status, d.created_at as "createdAt"
        FROM desaparecidos d
        WHERE d.name ILIKE $1 OR d.description ILIKE $1 OR d.last_seen_location ILIKE $1;
    `;
    try {
      const { rows } = await db.query(queryText, [`%${query}%`]);
      return rows;
    } catch (error) {
      Logger.error(`Erro ao buscar pessoas desaparecidas: ${error.message}`);
      throw error;
    }
  },
};

module.exports = MissingPersonModel;
