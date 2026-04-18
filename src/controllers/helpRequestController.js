const HelpRequestService = require('../services/helpRequestService');

const HelpRequestController = {
  async create(req, res) {
    try {
      const result = await HelpRequestService.createRequest(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async list(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const result = await HelpRequestService.getAllRequests(page, limit);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async get(req, res) {
    try {
      const result = await HelpRequestService.getRequestById(req.params.id);
      if (!result)
        return res.status(404).json({ error: 'Pedido não encontrado' });
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateStatus(req, res) {
    try {
      const { status } = req.body;
      const result = await HelpRequestService.updateStatus(
        req.params.id,
        status,
      );
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      await HelpRequestService.deleteRequest(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getByNeedUser(req, res) {
    try {
      const result = await HelpRequestService.getByNeedUserId(
        req.params.userId,
      );
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = HelpRequestController;
