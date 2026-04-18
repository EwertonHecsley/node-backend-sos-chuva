const MissingPersonService = require('../services/missingPersonService');

const MissingPersonController = {
  async create(req, res) {
    try {
      const result = await MissingPersonService.reportMissing(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async list(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const result = await MissingPersonService.getAll(page, limit);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async get(req, res) {
    try {
      const result = await MissingPersonService.getById(req.params.id);
      if (!result)
        return res.status(404).json({ error: 'Registro não encontrado' });
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const result = await MissingPersonService.update(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      await MissingPersonService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async search(req, res) {
    try {
      const { q } = req.query;
      const result = await MissingPersonService.search(q);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = MissingPersonController;
