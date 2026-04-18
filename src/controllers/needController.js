const NeedService = require('../services/needService');

const NeedController = {
  async create(req, res) {
    try {
      const need = await NeedService.createNeed(req.body);
      res.status(201).json(need);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async list(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const result = await NeedService.getAllNeeds(page, limit);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async get(req, res) {
    try {
      const need = await NeedService.getNeedById(req.params.id);
      if (!need)
        return res.status(404).json({ error: 'Necessidade não encontrada' });
      res.json(need);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const need = await NeedService.updateNeed(req.params.id, req.body);
      res.json(need);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      await NeedService.deleteNeed(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async search(req, res) {
    try {
      const { q } = req.query;
      const result = await NeedService.searchNeeds(q);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = NeedController;
